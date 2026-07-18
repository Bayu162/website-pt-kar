# Website PT Ketiara Aliran Rezeki — Panduan Singkat

Website statis (HTML/CSS/JS), tanpa database, tanpa login/panel admin.

> 📘 **Panduan lengkap dan lebih detail (dengan penjelasan tiap langkah, contoh
> kode, catatan penting, troubleshooting, dan tabel referensi cepat) tersedia
> di file `PANDUAN-PENGEDITAN.docx` pada folder ini.** README ini hanya
> ringkasan cepat. Setiap file kode juga sudah diberi komentar penjelasan
> langsung di bagian yang relevan (cari komentar `<!-- ... -->` di HTML atau
> `//` di JavaScript).

## Struktur Folder
```
/
├── index.html              (Beranda)
├── 404.html
├── robots.txt
├── sitemap.xml
├── PANDUAN-PENGEDITAN.docx (panduan lengkap, baca ini dahulu)
├── pages/
│   ├── tentang.html
│   ├── ekosistem.html
│   ├── capaian.html
│   ├── mitra.html
│   ├── legalitas.html
│   ├── karier.html
│   ├── kontak.html
│   ├── kebijakan-privasi.html
│   └── berita/
│       ├── index.html
│       └── (artikel-berita).html
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── navbar.js   (menu navigasi, tampil di semua halaman)
    │   ├── footer.js   (footer + tombol WA melayang, tampil di semua halaman)
    │   └── script.js   (slideshow, filter, statistik, form WA, dll.)
    ├── icons/         (logo, favicon, dan logo brand — nama file huruf kecil & tanpa spasi)
    └── images/         (letakkan foto asli perusahaan di sini)
        └── berita/     (thumbnail/foto artikel berita)
```

> **Penting soal penamaan file gambar:** semua nama file di `assets/icons/` sengaja dibuat huruf kecil
> dan tanpa spasi (mis. `logo-pt-kar.png`, `puskanas.webp`). Kebanyakan hosting menggunakan server Linux
> yang *case-sensitive* — jika nama file di kode tidak identik dengan nama file asli (termasuk huruf besar/kecil),
> gambar tidak akan muncul saat website sudah online walau tampil normal di komputer lokal. Ikuti pola ini
> setiap menambahkan gambar baru.

## Cara Edit Konten Dasar
Ringkasan singkat — **lihat `PANDUAN-PENGEDITAN.docx` untuk penjelasan lengkap tiap poin:**
1. **Ganti teks**: buka file `.html` terkait, edit teks di antara tag (mis. `<h1>...</h1>`), simpan.
2. **Ganti foto**: taruh file gambar di `assets/images/` atau `assets/icons/`, lalu ganti `src="..."` pada tag `<img>` yang bersangkutan (bukan lewat CSS — kelas `.hero-visual` yang disebut di draf sebelumnya sudah tidak dipakai; galeri foto hero sekarang berupa slideshow `<img>` langsung di HTML).
3. **Tambah brand baru**: salin satu blok `.card.brand-item` di `pages/ekosistem.html`, ubah isi dan `data-category`.
4. **Ubah statistik**: edit angka pada atribut `data-count` di `.achieve-num` (index.html & capaian.html, harus diubah di **kedua** file). Data grafik Chart.js di `capaian.html` ditulis terpisah di dalam tag `<script>` di bagian bawah file yang sama. Pastikan sudah disetujui pembimbing dan mencantumkan periode.
5. **Tambah artikel berita**: salin salah satu file di `pages/berita/`, ubah judul/isi, lalu tambahkan kartu baru di `pages/berita/index.html`, dan tambahkan baris baru di `sitemap.xml`.
6. **Hapus artikel**: hapus file `.html`-nya, kartu terkait di `pages/berita/index.html`, dan baris terkait di `sitemap.xml`.
7. **Ganti nomor WhatsApp**: situs ini memakai **lebih dari satu nomor WA** untuk keperluan berbeda — nomor utama (`6285269840834`, dipakai di `assets/js/footer.js`, `pages/kontak.html`, `pages/karier.html`, `pages/mitra.html`) dan nomor form kontak cepat (`6282369597978`, dipakai khusus di `assets/js/script.js`). Ganti sesuai perannya masing-masing; lihat bab "Cara Mengganti Nomor WhatsApp" di panduan lengkap untuk rincian tiap lokasi.
8. **Ganti email**: `info@ketiara.id` (email umum, di footer/kontak/mitra/kebijakan-privasi) dan `hrdketiaraaliranrezeki@gmail.com` (email khusus HR, hanya di `pages/karier.html`) adalah dua email BERBEDA — ganti sesuai perannya masing-masing.
9. **Tambah dokumen legalitas**: salin blok `.doc-card` di `pages/legalitas.html`, ubah nama dokumen dan link.
10. **Update ke hosting**: unggah seluruh folder ini ke hosting/domain via FTP atau panel hosting (folder ini bisa langsung dipindahkan tanpa instalasi tambahan).
11. **Backup**: salin seluruh folder proyek secara berkala, beri nama `Backup-Website-PT-KAR-YYYY-MM-DD`.
12. **Restore backup**: ganti seluruh isi folder hosting dengan isi folder backup.

## Catatan Penting
- Semua data statistik, brand, dan legalitas pada file ini adalah **contoh** dan wajib diganti dengan data resmi yang telah disetujui pembimbing sebelum publikasi.
- Foto placeholder (galeri slideshow) wajib diganti dengan dokumentasi asli perusahaan.
- Jangan menyimpan password atau data rahasia di dalam file kode ini.
- Panduan lengkap dengan langkah lebih rinci ada di `PANDUAN-PENGEDITAN.docx`. Sesuai Brief bagian 28, panduan tersebut sebaiknya **dilengkapi tangkapan layar** sebelum diserahkan ke pengguna akhir yang lebih awam — silakan tambahkan screenshot pada setiap langkah bila diperlukan.

## Riwayat Perbaikan
Revisi ini memperbaiki beberapa hal dari draf sebelumnya agar sesuai Brief:
- Path gambar brand yang tidak konsisten huruf besar/kecil (berpotensi gambar hilang saat online).
- Nomor WhatsApp yang berbeda-beda di halaman Berita.
- Link "Kontak" di footer yang salah arah di 11 halaman.
- Email pribadi yang tidak sengaja tertinggal di footer, diganti ke email resmi.
- File `robots.txt` yang sebelumnya masih terkompresi (`.gz`) sehingga tidak terbaca browser/crawler.
- Halaman 404 dengan kode HTML rusak dan path logo salah.
- Favicon yang salah tipe file.
- Open Graph meta tag yang sebelumnya hanya ada di Beranda, kini ada di semua halaman.
- Alt text gambar yang kosong.
- Section "Jangkauan" pada halaman Capaian yang belum ada (sesuai sitemap di Brief).
- Halaman "Kebijakan Privasi" yang sebelumnya belum dibuat (link di footer masih `#`).
- Folder `assets/images/` yang belum ada padahal sudah dirujuk di panduan ini.
- Sitemap.xml yang belum memuat seluruh halaman berita dan kebijakan privasi.
- **(Revisi ini)** Menambahkan komentar penjelasan langsung di dalam kode (HTML & JS) di setiap titik yang perlu diedit (teks, foto, brand, statistik, artikel, WhatsApp, email, dokumen legalitas, menu navigasi/footer).
- **(Revisi ini)** Meluruskan instruksi "ganti foto" yang sebelumnya merujuk kelas CSS `.hero-visual` yang sudah tidak dipakai lagi di kode saat ini.
- **(Revisi ini)** Menjelaskan secara eksplisit bahwa situs memakai lebih dari satu nomor WhatsApp dan lebih dari satu email untuk peran berbeda, agar tidak tertukar saat diganti.
- **(Revisi ini)** Menambahkan `PANDUAN-PENGEDITAN.docx`, dokumen panduan lengkap yang mencakup seluruh poin di atas plus checklist sebelum publikasi, troubleshooting, dan tabel referensi cepat lokasi kode.

