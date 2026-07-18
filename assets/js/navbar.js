// ============================================================================
// NAVBAR.JS — menu navigasi (header) yang tampil otomatis di SEMUA halaman.
// Sama seperti footer.js: isinya ditulis SEKALI di sini supaya perubahan
// menu tidak perlu diulang manual di setiap file .html.
//
// CARA MENAMBAH/MENGHAPUS MENU DI NAVIGASI:
// Tambah atau hapus baris '<li><a href="...">Nama Menu</a></li>' di dalam
// variabel "html" di bawah. Gunakan variabel "base" pada href (jangan tulis
// path manual) supaya menu tetap berfungsi baik dibuka dari Beranda maupun
// dari halaman di dalam folder pages/.
//
// CARA MENANDAI MENU YANG SEDANG AKTIF:
// Setiap halaman memanggil navbar.js dengan atribut data-active, contoh:
// <script src="assets/js/navbar.js" data-active="index"></script>
// Nilai data-active harus cocok dengan nama di dalam cls('...') pada baris
// menu terkait, supaya menu tersebut otomatis diberi highlight aktif.
// ============================================================================
(function () {
  var scriptEl = document.currentScript;
  var srcAttr = scriptEl.getAttribute('src') || '';
  var marker = 'assets/js/navbar.js';
  var markerIdx = srcAttr.indexOf(marker);
  var base = markerIdx >= 0 ? srcAttr.slice(0, markerIdx) : '';
  var active = scriptEl.getAttribute('data-active') || '';

  function cls(key) {
    return key === active ? ' class="active"' : '';
  }

  var html =
    '<header class="header">' +
      '<div class="container nav">' +
        '<a href="' + base + 'index.html" class="brand"><img src="' + base + 'assets/icons/logo-pt-kar.png" alt="logo" class="logo-img">PT KAR</a>' +
        '<ul class="nav-menu" id="navMenu">' +
          '<li><a href="' + base + 'index.html"' + cls('index') + '>Beranda</a></li>' +
          '<li><a href="' + base + 'pages/tentang.html"' + cls('tentang') + '>Tentang Kami</a></li>' +
          '<li><a href="' + base + 'pages/ekosistem.html"' + cls('ekosistem') + '>Ekosistem</a></li>' +
          '<li><a href="' + base + 'pages/capaian.html"' + cls('capaian') + '>Capaian</a></li>' +
          '<li><a href="' + base + 'pages/mitra.html"' + cls('mitra') + '>Mitra</a></li>' +
          '<li><a href="' + base + 'pages/legalitas.html"' + cls('legalitas') + '>Legalitas</a></li>' +
          '<li><a href="' + base + 'pages/berita/index.html"' + cls('berita') + '>Berita</a></li>' +
          '<li><a href="' + base + 'pages/karier.html"' + cls('karier') + '>Karier</a></li>' +
          '<li><a href="' + base + 'pages/kontak.html"' + cls('kontak') + '>Kontak</a></li>' +
          '<li class="nav-cta"><a href="' + base + 'pages/mitra.html" class="btn btn-primary">Jalin Kerja Sama</a></li>' +
        '</ul>' +
        '<div class="nav-actions">' +
          '<a href="' + base + 'pages/mitra.html" class="btn btn-primary">Jalin Kerja Sama</a>' +
          '<button class="hamburger" id="hamburgerBtn" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="navMenu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
      '<div class="nav-overlay" id="navOverlay"></div>' +
    '</header>';

  document.write(html);
})();
