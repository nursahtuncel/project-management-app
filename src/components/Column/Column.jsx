import { useState } from "react";
import Card from "../Card/Card";
import AddCardForm from "../AddCardForm/AddCardForm";
import "./Column.css";

export default function Column({ column, members, isTodo, draggingId, onDragStart, onDragEnd, onDrop, onAddCard, onDeleteClick, onCardClick }) {
  const [isAdding, setIsAdding]     = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = ()  => setIsDragOver(false);
  const handleDrop      = (e) => { e.preventDefault(); setIsDragOver(false); onDrop(column.id); };

  const handleAdd = (cardData) => {
    onAddCard(column.id, cardData);
    setIsAdding(false);
  };

  return (
    <div className="column">
      <div className="column-header" style={{ background: column.color }}>
        <span>{column.title}</span>
        <span className="column-count">{column.cards.length}</span>
      </div>

      <div
        className={`column-body ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Sadece Todo'da Add Ticket butonu */}
        {isTodo && !isAdding && (
          <button className="add-ticket-btn" onClick={() => setIsAdding(true)}>
            <span>+</span> Add new Ticket
          </button>
        )}

        {isTodo && isAdding && (
          <AddCardForm
            members={members}
            onAdd={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        )}

        <div className="card-list">
          {column.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              members={members}
              colColor={column.color}
              isDragging={draggingId === card.id}
              onDragStart={(e) => onDragStart(e, card.id, column.id)}
              onDragEnd={onDragEnd}
              onDeleteClick={() => onDeleteClick(column.id, card.id)}
              onClick={() => onCardClick(card, column)}
            />
          ))}

          {column.cards.length === 0 && (
            <div className="column-empty">Kart yok</div>
          )}
        </div>
      </div>
    </div>
  );
}