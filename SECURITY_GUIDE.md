# 🔒 HƯỚNG DẪN BẢO MẬT FIREBASE API KEYS

## ✅ ĐÃ HOÀN THÀNH:

1. ✅ **Di chuyển API keys sang .env.local**
2. ✅ **Cập nhật firebase.ts để đọc từ environment variables**
3. ✅ **Thêm .env.local vào .gitignore**
4. ✅ **Tạo .env.example template**
5. ✅ **Xóa API keys khỏi Git history**
6. ✅ **Force push để cập nhật remote repository**

---

## 🔐 KHUYẾN NGHỊ ROTATE API KEYS (TÙY CHỌN):

### **Khi nào cần rotate:**
- ❌ **KHÔNG CẦN** nếu API key chưa bị lộ lâu (< 24h)
- ⚠️ **NÊN LÀM** nếu repository public và đã có nhiều người clone
- ✅ **BẮT BUỘC** nếu phát hiện truy cập bất thường trong Firebase Console

### **Cách rotate Firebase API keys:**

#### **Option 1: Restrict API Key (Khuyến nghị) - KHÔNG cần tạo lại**
1. Vào [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Chọn project **genlingo-7fd42**
3. Tìm API key: `AIzaSyC3mNSV7Wp9geeuvoprZmwmsgQoCptHoAU`
4. Click vào → **Application restrictions**
   - Chọn **HTTP referrers (web sites)**
   - Thêm: `https://english-thpt-app.vercel.app/*`
   - Thêm: `http://localhost:3000/*` (cho dev)
5. **API restrictions** → Chọn:
   - Firebase Authentication API
   - Cloud Firestore API
   - Firebase Analytics API
6. Save

#### **Option 2: Tạo API Key mới (Nếu thực sự cần)**
1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Project Settings → General
3. Scroll xuống **Your apps** → Web app
4. Click **Regenerate config**
5. Copy API key mới vào `.env.local`

---

## 📋 SETUP CHO MÁY MỚI / TEAMMATE:

```powershell
# 1. Clone repository
git clone https://github.com/gwang08/GenLingo.git
cd GenLingo

# 2. Copy .env.example thành .env.local
cp .env.example .env.local

# 3. Liên hệ admin để lấy Firebase credentials
# Điền vào .env.local

# 4. Install dependencies
npm install

# 5. Run development server
npm run dev
```

---

## 🛡️ FIRESTORE RULES CẦN CẬP NHẬT:

Firebase API key đã được bảo vệ ở code level, nhưng vẫn cần setup Firestore Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - chỉ đọc/ghi dữ liệu của chính mình
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admins collection - chỉ admin đọc được
    match /admins/{adminId} {
      allow read: if request.auth != null;
      allow write: if false; // Không ai được ghi, chỉ admin thủ công
    }
  }
}
```

### **Cách áp dụng:**
1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Firestore Database → Rules
3. Copy rules trên vào
4. Click **Publish**

---

## 🚀 DEPLOY LÊN VERCEL:

Vercel cần environment variables, thêm trong Settings:

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project **english-thpt-app**
3. Settings → Environment Variables
4. Thêm từng biến từ `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - ... (tất cả 7 biến)
5. Redeploy app

---

## 📞 LIÊN HỆ:

Nếu cần Firebase credentials, inbox:
- Email: leminhquang.2992@gmail.com
- GitHub: @gwang08

---

## ⚠️ LƯU Ý QUAN TRỌNG:

- ❌ **KHÔNG BAO GIỜ** commit file `.env.local`
- ✅ **LUÔN LUÔN** kiểm tra `.gitignore` có `.env*`
- 🔍 **ĐỊNH KỲ** check GitHub secret scanning alerts
- 📊 **THEO DÕI** Firebase Usage trong Console

---

**Ngày cập nhật:** 20/11/2025
**Người thực hiện:** GitHub Copilot + gwang08
