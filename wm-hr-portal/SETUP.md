# WM Center HR Portal — Panduan Setup

Struktur folder ini **flat (semua file sejajar, tidak ada subfolder)** — cocok untuk cara upload "Add files via upload" di GitHub web:

```
index.html
ta.html
referral.html
coaching.html
portal-auth.js
portal-nav.js
Code.gs
SETUP.md
```

✅ **Script URL dan Google Client ID sudah diisi otomatis** di semua file (Code.gs, ta.html, referral.html, coaching.html). Aeesy tidak perlu isi manual lagi kecuali nanti ganti Client ID / re-deploy backend.

## 1. Pasang backend (Code.gs)
1. Buka Google Sheet yang sudah dipakai → **Extensions → Apps Script**.
2. Pastikan isi `Code.gs` di situ SAMA PERSIS dengan file `Code.gs` di paket ini (kalau beda, timpa semuanya).
3. Save.

## 2. Jalankan setup sheet (kalau belum / kalau bikin Sheet baru)
Pilih fungsi `setupAllSheets` dari dropdown → **Run** → izinkan akses.
Ini membuat semua tab: `Requests, PIC_List, Offers, Branches, Referrals, HR Analytics, Pengajuan, Admin_Allowlist`.

## 3. Deploy ulang Web App (WAJIB kalau Code.gs baru saja diubah)
**Deploy → Manage deployments → pilih deployment yang ada → klik ✏️ (edit) → Version: New version → Deploy.**

⚠️ Kalau bikin **New deployment** (bukan edit yang lama), URL `.../exec` akan **berubah** — kalau itu terjadi, URL baru itu perlu ditempel ulang ke `PORTAL_SCRIPT_URL` di `ta.html`, `referral.html`, `coaching.html`.

## 4. Cek OAuth Client ID masih valid
Di [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials), buka Client ID yang dipakai, pastikan di **Authorized JavaScript origins** sudah ada domain GitHub Pages yang benar, contoh:
`https://tawmcenter.github.io`
(tanpa `/HRPortal` atau path lain di belakangnya — origin cuma domain-nya doang)

## 5. Upload ke GitHub — PENTING soal struktur folder
Karena semua file di paket ini **flat/sejajar**, upload semuanya langsung ke **root repo** (bukan ke dalam folder apa pun). Kalau pakai "Add files via upload" di GitHub web, drag semua file sekaligus ke halaman utama repo, jangan taruh di dalam folder baru.

## 6. GitHub Pages
**Settings → Pages** → Source: branch `main`, folder `/ (root)` → Save.
URL portal: `https://<username>.github.io/<nama-repo>/`

---

### Kalau ada halaman 404 (Manpower/Referral/Coaching gak kebuka)
Artinya file `ta.html` / `referral.html` / `coaching.html` gak ada di root repo yang sama dengan `index.html` — cek lagi di tab **Code** repo GitHub, semua file (index.html, ta.html, referral.html, coaching.html, portal-auth.js, portal-nav.js) harus keliatan sejajar di listing yang sama, bukan di dalam folder.

### Catatan soal Employee Referral
Dashboard Employee Referral **terbuka untuk umum** (tidak perlu login) — supaya siapa pun yang mereferensikan kandidat bisa memantau status kandidatnya sendiri. Kolom CV dan Notes internal tetap disembunyikan dari tampilan publik (hanya kelihatan langsung di Google Sheet).

### Yang tetap khusus login HR (allowlist Google)
- Talent Acquisition → tab **Admin** (kelola pipeline, offers, PIC, cabang)
- Coaching & SP → tab **Dashboard HR**

Tambah/kurangi admin HR: buka tab **Admin_Allowlist** di Google Sheet, edit langsung — tanpa perlu deploy ulang.

