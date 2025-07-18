# 🛠️ JobHunter

Xây dựng với React (frontend) và JSON Server (giả lập REST API backend).

## 🚀 Công nghệ sử dụng

- React 
- TailwindCSS 
- JSON Server (giả lập REST API)
- Axios

## ⚙️ Cài đặt & chạy dự án

### 1. Clone dự án

```bash
git clone https://github.com/mit-suu/JobHunter.git
cd JobHunter
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy JSON Server (port 3001)

```bash
npx json-server --watch db.json --port 3001
```

> 📁 File `db.json` chứa dữ liệu người dùng và API giả lập.

### 4. Chạy React App (port 5173 mặc định với Vite)

```bash
npm run dev
```

Truy cập:
- Frontend: http://localhost:5173
- Backend (API): http://localhost:3001/users

## 🧪 Một số API mẫu

```bash
# GET danh sách user
curl http://localhost:3001/users

# POST tạo user mới
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"username": "Tran Tuan Hiep", "email": "trantuanhiep@gmail.com", "isPremium": true}'
```

## 📮 Liên hệ

- 📧 Email: trantuanhiep28122003@gmail.com
- 🌐 Website: https://trantuanhiep.site
