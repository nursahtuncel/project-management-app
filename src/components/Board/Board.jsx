import { useState } from "react";
import { useBoard } from "../../hooks/useBoard";
import { useUsers } from "../../hooks/useUsers";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getNextTicketId } from "../../firebase/projectService";
import TopBar from "../TopBar/TopBar";
import Column from "../Column/Column";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import PRLinkModal from "../PRLinkModal/PRLinkModal";
import CardModal from "../CardModal/CardModal";
import DoneModal from "../DoneModal/DoneModal";
import "./Board.css";

export default function Board({ user, projectId, projectName, onBack, onLogout }) {
  const { data, loading, saveColumns, saveMeta, saveMembers } = useBoard(projectId);
  const allUsers = useUsers();

  const [dragging,      setDragging]      = useState(null);
  const [search,        setSearch]        = useState("");
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [prTarget,      setPrTarget]      = useState(null);
  const [cardModal,     setCardModal]     = useState(null);
  const [doneModal,     setDoneModal]     = useState(null);

  if (loading) return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      minHeight:"100vh", fontSize:"18px", color:"#6b46c1", fontFamily:"sans-serif"
    }}>
      ⏳ Yükleniyor...
    </div>
  );

  const { columns, columnOrder, meta } = data;

  // Firestore'daki tüm kullanıcıları members olarak kullan
  const members = allUsers;

  const totalCards = Object.values(columns).reduce((s, c) => s + c.cards.length, 0);
  const doneCards  = columns.done.cards.length;
  const completion = totalCards ? Math.round((doneCards / totalCards) * 100) : 0;

  /* ── Columns güncelle ── */
  const applyColumns = (updater) => {
    const next = updater(JSON.parse(JSON.stringify(columns)));
    saveColumns(next);
    return next;
  };

  /* ── Drag & Drop ── */
  const handleDragStart = (e, cardId, sourceColId) => {
    setDragging({ cardId, sourceColId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => setDragging(null);

  const handleDrop = (targetColId) => {
    if (!dragging) return;
    const { cardId, sourceColId } = dragging;
    if (sourceColId === targetColId) { setDragging(null); return; }

    if (targetColId === "review") {
      const card = columns[sourceColId].cards.find(c => c.id === cardId);
      setPrTarget({ cardId, sourceColId, targetColId, card });
      setDragging(null);
      return;
    }

    moveCard(cardId, sourceColId, targetColId);
  };

  const moveCard = (cardId, sourceColId, targetColId, extraFields = {}) => {
    const next = applyColumns(cols => {
      const card = cols[sourceColId].cards.find(c => c.id === cardId);
      Object.assign(card, extraFields);
      cols[sourceColId].cards = cols[sourceColId].cards.filter(c => c.id !== cardId);
      cols[targetColId].cards.push(card);
      return cols;
    });

    if (targetColId === "done") {
      const total = Object.values(next).reduce((s, c) => s + c.cards.length, 0);
      const done  = next.done.cards.length;
      const pct   = total ? Math.round((done / total) * 100) : 0;
      const card  = next.done.cards.find(c => c.id === cardId);
      setTimeout(() => setDoneModal({ card, completion: pct }), 150);
    }

    setDragging(null);
  };

  /* ── PR Modal ── */
  const handlePRConfirm = (prLink) => {
    const { cardId, sourceColId, targetColId } = prTarget;
    moveCard(cardId, sourceColId, targetColId, { prLink });
    setPrTarget(null);
  };

  /* ── Kart Ekle ── */
  const handleAddCard = async (colId, cardData) => {
    const id = await getNextTicketId(projectId, projectName);
    applyColumns(cols => {
      cols[colId].cards.unshift({
        id,
        type:      "Story",
        resources: false,
        prLink:    "",
        liveLink:  "",
        figmaLink: "",
        ...cardData,
      });
      return cols;
    });
  };

  /* ── Kart Sil ── */
  const handleDeleteClick = (colId, cardId) => setConfirmTarget({ colId, cardId });

  const confirmDelete = () => {
    const { colId, cardId } = confirmTarget;
    applyColumns(cols => {
      cols[colId].cards = cols[colId].cards.filter(c => c.id !== cardId);
      return cols;
    });
    setConfirmTarget(null);
  };

  /* ── Kart Güncelle ── */
  const handleCardSave = (updatedCard) => {
    applyColumns(cols => {
      for (const col of Object.values(cols)) {
        const idx = col.cards.findIndex(c => c.id === updatedCard.id);
        if (idx !== -1) { col.cards[idx] = updatedCard; break; }
      }
      return cols;
    });
    setCardModal(null);
  };

  /* ── Meta ── */
  const handleMetaChange = (key, value) => {
    saveMeta({ ...meta, [key]: value });
  };

  /* ── Members (board'a özel ek üyeler için) ── */
  const handleAddMember = (member) => {
    const current = data.members || [];
    saveMembers([...current, member]);
  };

  const handleRemoveMember = (id) => {
    const current = data.members || [];
    saveMembers(current.filter(m => m.id !== id));
  };

  /* ── Arama ── */
  const filterCards = (cards) => {
    if (!search) return cards;
    const q = search.toLowerCase();
    return cards.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  };

  return (
    <div className="board-wrapper">
      <TopBar
        meta={meta}
        members={members}
        user={user}
        projectName={projectName}
        completion={completion}
        search={search}
        onSearchChange={setSearch}
        onMetaChange={handleMetaChange}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onBack={onBack}
        onLogout={onLogout}
      />

      <div className="board">
        {columnOrder.map(colId => {
          const col      = columns[colId];
          const filtered = { ...col, cards: filterCards(col.cards) };
          return (
            <Column
              key={colId}
              column={filtered}
              members={members}
              isTodo={colId === "todo"}
              draggingId={dragging?.cardId}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              onAddCard={handleAddCard}
              onDeleteClick={handleDeleteClick}
              onCardClick={(card, column) => setCardModal({ card, column })}
            />
          );
        })}
      </div>

      {confirmTarget && (
        <ConfirmModal
          message="Bu ticket kalıcı olarak silinecek. Devam etmek istiyor musun?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmTarget(null)}
        />
      )}

      {prTarget && (
        <PRLinkModal
          cardTitle={prTarget.card.title}
          onConfirm={handlePRConfirm}
          onCancel={() => setPrTarget(null)}
        />
      )}

      {cardModal && (
        <CardModal
          card={cardModal.card}
          members={members}
          colColor={cardModal.column.color}
          onSave={handleCardSave}
          onClose={() => setCardModal(null)}
        />
      )}

      {doneModal && (
        <DoneModal
          card={doneModal.card}
          completion={doneModal.completion}
          onClose={() => setDoneModal(null)}
        />
      )}
    </div>
  );
}