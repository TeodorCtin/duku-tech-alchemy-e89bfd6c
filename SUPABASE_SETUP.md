# Supabase Backend Setup

## 1. Configurarea Environment Variables

Actualizează fișierul `.env.local` cu credențialele tale Supabase:

```env
VITE_SUPABASE_URL=https://dfkkvjltkwytsbtuudiq.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Pentru a găsi aceste credențiale:
1. Du-te pe [Supabase Dashboard](https://app.supabase.com)
2. Selectează proiectul tău (dfkkvjltkwytsbtuudiq)
3. Du-te la Settings → API
4. Copiază `URL` și `anon/public` key

## 2. Configurarea Database

Rulează scriptul SQL din `database/setup.sql` în Supabase SQL Editor:

1. Du-te pe Supabase Dashboard
2. Navighează la SQL Editor
3. Creează o nouă query
4. Copiază și rulează conținutul din `database/setup.sql`

Acest script va:
- Crea tabelul `projects`
- Configura Row Level Security (RLS)
- Crea bucket-ul de storage pentru imagini
- Insera datele de test

## 3. Configurarea Storage (opțional)

Pentru upload-ul de imagini:
1. Du-te la Storage în Supabase Dashboard
2. Verifică că bucket-ul `project-images` a fost creat
3. Configurările de securitate sunt deja setate prin SQL script

## 4. Testarea Setup-ului

După configurare:
1. Rulează `npm run dev`
2. Du-te la `/admin` și loghează-te
3. Navighează la tab-ul Projects
4. Încearcă să adaugi/editezi/ștergi proiecte

## 5. Features Disponibile

### Frontend (componenta Projects)
- ✅ Afișare proiecte din Supabase
- ✅ Fallback la date locale dacă Supabase nu e disponibil
- ✅ Loading states și error handling
- ✅ Suport pentru imagini, GitHub links, demo links

### Admin Panel (ProjectsAdmin)
- ✅ Listare toate proiectele
- ✅ Adăugare proiecte noi
- ✅ Editare proiecte existente
- ✅ Ștergere proiecte
- ✅ Toggle pentru featured projects
- ✅ Upload imagini (prin URL)
- ✅ Gestionare tehnologii (comma-separated)

### API Features
- ✅ CRUD operations pentru proiecte
- ✅ Upload/delete imagini în Supabase Storage
- ✅ Filtrare după featured projects
- ✅ Real-time updates prin React Query
- ✅ Error handling și toast notifications

## 6. Structura Database

### Tabelul `projects`
```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR(255) NOT NULL)
- description (TEXT NOT NULL)
- image (VARCHAR(500))
- tech (TEXT[] - array of strings)
- github (VARCHAR(500))
- demo (VARCHAR(500))
- featured (BOOLEAN DEFAULT FALSE)
- created_at (TIMESTAMP WITH TIME ZONE)
- updated_at (TIMESTAMP WITH TIME ZONE)
```

### Storage Bucket
- Nume: `project-images`
- Path: `projects/[filename]`
- Public access: ✅

## 7. Troubleshooting

### Eroare de conexiune
- Verifică URL-ul și cheia din `.env.local`
- Asigură-te că proiectul Supabase e activ

### Eroare de permisiuni
- Verifică că RLS policies sunt configurate corect
- Rulează din nou scriptul SQL dacă e necesar

### Imagini nu se încarcă
- Verifică că bucket-ul `project-images` există
- Verifică că policy-urile de storage sunt active