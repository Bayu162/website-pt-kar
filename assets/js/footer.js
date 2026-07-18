// ============================================================================
// FOOTER.JS — footer yang tampil otomatis di SEMUA halaman.
// Karena footer sama di setiap halaman, isinya ditulis SEKALI di sini
// (bukan diulang manual di tiap file .html) supaya kalau ada perubahan
// (alamat, kontak, menu), cukup edit SATU file ini saja.
// Info kontak (telepon/WA & email) yang dipakai di sini HARUS SAMA dengan
// yang tertulis di pages/kontak.html. Lihat PANDUAN-PENGEDITAN.docx bagian
// "Cara Mengganti Nomor WhatsApp" dan "Cara Mengganti Email".
// ============================================================================
(function () {
  var scriptEl = document.currentScript;
  var srcAttr = scriptEl.getAttribute('src') || '';
  var marker = 'assets/js/footer.js';
  var markerIdx = srcAttr.indexOf(marker);
  var base = markerIdx >= 0 ? srcAttr.slice(0, markerIdx) : '';

  var html =
    '<footer>' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="footer-brand"><span><img src="' + base + 'assets/icons/logo-pt-kar.png" alt="logo" class="logo-img"></span> PT KAR</div>' +
            '<p class="footer-desc">PT Ketiara Aliran Rezeki mengembangkan ekosistem teknologi pendidikan untuk generasi Indonesia.</p>' +
            '<div class="social-row">' +
              '<a href="https://www.instagram.com/lifeatkar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
            '</div>' +
          '</div>' +
          // Menu "Menu Cepat" & "Perusahaan": untuk menambah/menghapus/
          // mengganti urutan link footer, tambah/hapus baris '<li><a href=...>'
          // di dua blok <ul> di bawah ini. Pastikan href memakai variabel
          // "base" (jangan tulis path manual) supaya link tetap benar baik
          // diakses dari Beranda maupun dari dalam folder pages/.
          '<div>' +
            '<h5>Menu Cepat</h5>' +
            '<ul>' +
              '<li><a href="' + base + 'pages/tentang.html">Tentang Kami</a></li>' +
              '<li><a href="' + base + 'pages/ekosistem.html">Ekosistem</a></li>' +
              '<li><a href="' + base + 'pages/capaian.html">Capaian</a></li>' +
              '<li><a href="' + base + 'pages/berita/index.html">Berita</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h5>Perusahaan</h5>' +
            '<ul>' +
              '<li><a href="' + base + 'pages/mitra.html">Mitra & Kerja Sama</a></li>' +
              '<li><a href="' + base + 'pages/legalitas.html">Legalitas</a></li>' +
              '<li><a href="' + base + 'pages/karier.html">Karier</a></li>' +
            '</ul>' +
          '</div>' +
          // KONTAK DI FOOTER (tampil di semua halaman):
          // - Baris 1: alamat kantor.
          // - Baris 2: nomor telepon/WhatsApp UTAMA — harus sama dengan yang
          //   tertulis di pages/kontak.html, dan angkanya (tanpa format +62/
          //   spasi/strip) harus sama dengan nomor di tombol WA melayang
          //   pada baris "wa-float" di bawah file ini serta di pages/karier.html.
          // - Baris 3: email umum perusahaan — harus sama dengan yang
          //   tertulis di pages/kontak.html, pages/mitra.html, dan
          //   pages/kebijakan-privasi.html.
          '<div>' +
            '<h5>Kontak</h5>' +
            '<ul>' +
              '<li>Jl. Taman Setia Budi Indah Blok A No. 49C, Medan</li>' +
              '<li>+62 852-6984-0834</li>' +
              '<li>info@ketiara.id</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>&copy; 2026 PT Ketiara Aliran Rezeki. Seluruh hak cipta dilindungi.</span>' +
          '<a href="' + base + 'pages/kontak.html">Kontak</a>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    // TOMBOL WHATSAPP MELAYANG (muncul pojok bawah di semua halaman).
    // Nomor "6285269840834" ini adalah NOMOR WHATSAPP UTAMA PERUSAHAAN.
    // Format penulisan: 62 (kode negara Indonesia) + nomor HP TANPA angka 0
    // di depan, TANPA tanda +, spasi, atau strip.
    // Contoh: nomor 0852-6984-0834 ditulis sebagai 6285269840834.
    // Nomor ini HARUS SAMA dengan nomor di pages/karier.html (tombol
    // "Lamar via WhatsApp") dan dengan nomor yang tertulis sebagai teks di
    // pages/kontak.html & footer di atas. Nomor ini BUKAN nomor yang dipakai
    // form kontak cepat (itu ada di assets/js/script.js, cari "waForm").
    '<a href="https://wa.me/6285269840834" class="wa-float" target="_blank" aria-label="Chat WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>' +
    '<button class="back-top" aria-label="Kembali ke atas">↑</button>';

  document.write(html);
})();
