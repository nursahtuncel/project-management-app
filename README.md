# ⊞ KanbanBoard

Ekip tabanlı, gerçek zamanlı proje yönetim uygulaması.

🔗 **Canlı Demo:** [project-management-app-vert-five.vercel.app](https://project-management-app-vert-five.vercel.app/)

---

## 🎯 Proje Amacı

Yazılım ekiplerinin görevlerini Kanban yöntemiyle takip etmesini sağlamak. Birden fazla kullanıcı aynı board üzerinde gerçek zamanlı çalışabilir, ticket'lara kişi atayabilir, Figma tasarım ve GitHub PR linklerini ekleyebilir.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | 18 | Arayüz |
| Vite | 8 | Build aracı |
| Firebase Firestore | 11 | Gerçek zamanlı veritabanı |
| Firebase Auth | 11 | Google ile giriş |
| Vercel | — | Deployment |

---

## 📦 Bağımlılıklar

```json
"dependencies": {
  "firebase": "^11.x",
  "react": "^18.x",
  "react-dom": "^18.x"
},
"devDependencies": {
  "@vitejs/plugin-react": "^6.x",
  "vite": "^8.x"
}
```

---

## ⚙️ Kurulum

```bash
# Repoyu klonla
git clone https://github.com/kullanici-adi/kanban-app.git
cd kanban-app

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
cp .env.example .env
# Firebase değerlerini .env'e gir

# Geliştirme sunucusunu başlat
npm run dev
```

`.env` içeriği:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## ✨ Özellikler

- Google ile giriş
- Gerçek zamanlı senkronizasyon
- Çoklu proje desteği
- Sürükle & bırak ticket yönetimi
- Figma, canlı site ve GitHub PR linkleri
- Code Review'a taşırken PR linki zorunluluğu
- Kişi atama sistemi
- Proje arşivleme
- PWA — masaüstüne yüklenebilir
