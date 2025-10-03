# Admin Authentication System

## 🔐 Credențiale Admin

**Email:** `duku@joben.eu`  
**Password:** `Bigboss2025`

## 🚀 Funcționalități

### 1. **Sistem de Login Securizat**
- Login cu email și parolă
- Token-uri de sesiune cu expirare (24 ore)
- Validare automată a sesiunii
- Protecție împotriva accesului neautorizat

### 2. **Panoul de Administrare**
- Dashboard complet pentru gestionarea conținutului
- Gestionare proiecte (CRUD operations)
- Interface user-friendly
- Logout securizat

### 3. **Protecția Rutelor**
- Rute protejate pentru zona admin
- Redirect automat la login dacă nu ești autentificat
- Validare continuă a sesiunii

## 📱 Cum să folosești sistemul

### **Pentru a accesa panoul admin:**

1. **Navighează la login:**
   ```
   http://localhost:5173/admin/login
   ```

2. **Introdu credențialele:**
   - Email: `duku@joben.eu`
   - Password: `Bigboss2025`

3. **Accesează panoul admin:**
   - După login vei fi redirecționat automat la `/admin`
   - Vei avea acces la toate funcționalitățile de administrare

### **Pentru gestionarea proiectelor:**

1. **Du-te la tab-ul "Projects"** în panoul admin
2. **Adaugă proiecte noi:**
   - Click pe "Add Project"
   - Completează formularul
   - Salvează proiectul

3. **Editează proiecte existente:**
   - Click pe "Edit" pe proiectul dorit
   - Modifică informațiile
   - Salvează modificările

4. **Șterge proiecte:**
   - Click pe "Delete" 
   - Confirmă ștergerea

## 🔧 Funcționalități Tehnice

### **AuthService**
```typescript
// Login
AuthService.login(email, password) // returns boolean

// Logout
AuthService.logout()

// Check authentication
AuthService.isAuthenticated() // returns boolean

// Validate session
AuthService.validateSession() // returns boolean
```

### **useAuth Hook**
```typescript
const { isAuthenticated, isLoading, login, logout } = useAuth();
```

### **Protected Routes**
- Toate rutele `/admin/*` sunt protejate
- Verificare automată la fiecare încărcare de pagină
- Redirect la login dacă sesiunea a expirat

## 🛡️ Securitate

### **Token Management**
- Token-uri generate automat la login
- Expirare după 24 ore
- Curățare automată la logout

### **Session Validation**
- Verificare periodică a validității sesiunii
- Logout automat la expirarea token-ului
- Protecție împotriva manipulării localStorage

### **Route Protection**
- Verificare la nivel de aplicație
- Redirect securizat
- Protecție completă a zonei admin

## 📋 Troubleshooting

### **Nu pot să mă logheze**
- Verifică că ai introdus credențialele corecte
- Asigură-te că JavaScript este activat
- Încearcă să refreshezi pagina

### **Am fost delogat automat**
- Normal după 24 ore de inactivitate
- Reloghează-te cu credențialele

### **Erori la salvarea proiectelor**
- Verifică conexiunea la Supabase
- Asigură-te că baza de date este configurată corect
- Check console-ul pentru erori

## 🔄 Workflow Recomandat

1. **Login dimineața** cu credențialele tale
2. **Gestionează proiectele** din tab-ul Projects
3. **Logout la final** pentru securitate (opțional, se face automat)

Sistemul este securizat și optimizat pentru utilizarea ta exclusivă! 🎉