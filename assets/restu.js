// ========================================================================= 
// JS halaman all film
// ========================================================================= 
function terapkanFilterKatalog() {
// Mengambil nilai pilihan dari dropdown
const genreDipilih = document.getElementById("filter-genre").value;
const tahunDipilih = document.getElementById("filter-tahun").value;

// Mengambil semua elemen kartu film
const semuaKartu = document.querySelectorAll(".kartu-film");
let jumlahCocok = 0;

// Melakukan perulangan untuk memeriksa tiap kartu
semuaKartu.forEach(kartu => {
    const genreKartu = kartu.getAttribute("data-genre");
    const tahunKartu = kartu.getAttribute("data-tahun");
    
    // Logika pencocokan (jika kosong "" berarti "Semua" dipilih)
    let cocokGenre = (genreDipilih === "" || genreDipilih === genreKartu);
    let cocokTahun = (tahunDipilih === "" || tahunDipilih === tahunKartu);

    // Tampilkan jika sesuai dengan filter, sembunyikan jika tidak
    if (cocokGenre && cocokTahun) {
        kartu.style.display = ""; // Kembali ke style awal (tampil)
        jumlahCocok++;
    } else {
        kartu.style.display = "none"; // Sembunyikan
    }
});

// Mengupdate teks informasi pencarian di bawah kotak filter
const infoTeks = document.getElementById("teks-info-katalog");
if (jumlahCocok === 0) {
    infoTeks.innerText = "Tidak ada film yang cocok dengan filter yang diterapkan.";
} else {
    infoTeks.innerText = `Menampilkan ${jumlahCocok} film dari hasil filter`;
}
}



// ========================================================================= 
// JS halaman genre-action
// ========================================================================= 
function terapkanUrutan() {
// Ambil kriteria urutan yang dipilih
const urutan = document.getElementById("urutkan-data").value;
const kontainer = document.getElementById("kontainer-film");

// Ambil semua elemen kartu film dan ubah jadi array agar bisa di-sort
const kartuKartu = Array.from(kontainer.getElementsByClassName("kartu-film"));

// Logika pengurutan
kartuKartu.sort((a, b) => {
    if (urutan === "terbaru") {
        // Urutkan dari tanggal terbaru ke terlama
        return new Date(b.dataset.tanggal) - new Date(a.dataset.tanggal);
    } else if (urutan === "populer") {
        // Urutkan dari angka kepopuleran tertinggi ke terendah
        return parseInt(b.dataset.populer) - parseInt(a.dataset.populer);
    } else if (urutan === "rating") {
        // Urutkan dari angka rating tertinggi ke terendah
        return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    }
    return 0;
});

// Masukkan kembali elemen-elemen ke kontainer dengan urutan yang baru
kartuKartu.forEach(kartu => kontainer.appendChild(kartu));

// Mengubah teks info untuk memberi tahu user bahwa data telah diurutkan
const selectElement = document.getElementById("urutkan-data");
const teksPilihan = selectElement.options[selectElement.selectedIndex].text;
document.getElementById("info-hasil").innerText = "Menampilkan 5 film laga (Diurutkan: " + teksPilihan + ")";
}


// ========================================================================= 
// JS halaman rekomendasi sesuai mood
// ========================================================================= 
function pilihMood(namaMood) {
    // Mengubah Judul
    document.getElementById('judul-hasil').innerText = "Rekomendasi: " + namaMood;
    
    // Menentukan deskripsi berdasarkan mood yang dipilih
    let deskripsi = "";
    if(namaMood === "Santai") {
        deskripsi = "Waktunya rileks! Berikut adalah film-film ringan yang cocok menemanimu bersantai.";
    } else if(namaMood === "Tegang") {
        deskripsi = "Siapkan jantungmu untuk deretan film penuh misteri dan kejutan ini.";
    } else if(namaMood === "Lucu") {
        deskripsi = "Kumpulan film komedi yang dijamin bikin kamu tertawa lepas hari ini.";
    } else if(namaMood === "Sedih") {
        deskripsi = "Siapkan tisu, deretan film ini siap menguras emosimu dalam-dalam.";
    } else if(namaMood === "Semangat") {
        deskripsi = "Butuh motivasi ekstra? Film-film ini akan kembali membakar semangatmu!";
    } else if(namaMood === "Romantis") {
        deskripsi = "Kisah cinta manis dan menyentuh hati yang siap membuatmu terbawa suasana.";
    }
    document.getElementById('deskripsi-hasil').innerText = deskripsi;

    // Menyembunyikan area pilihan dan memunculkan area hasil
    document.getElementById('area-pilihan').style.display = 'none';
    document.getElementById('area-hasil').style.display = 'block';
    
    // Scroll otomatis ke bagian paling atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi saat tombol "Kembali" diklik (Kembali ke Interface Pilihan)
function kembaliKeMood() {
    // Memunculkan kembali area pilihan dan menyembunyikan area hasil
    document.getElementById('area-pilihan').style.display = 'block';
    document.getElementById('area-hasil').style.display = 'none';
    
    // Scroll otomatis ke bagian paling atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ========================================================================= 
// JS halaman filter lanjutan
// ========================================================================= 
// Fungsi Utama Filter
function terapkanFilterLanjutan() {
// 1. Ambil nilai tahun rilis dari radio button yang sedang aktif
let tahunDipilih = document.querySelector('input[name="tahun"]:checked').value;

// 2. Ambil nilai rating usia dari radio button yang sedang aktif
let ratingDipilih = document.querySelector('input[name="rating"]:checked').value;

// 3. Ambil nilai genre dari checkbox (bisa lebih dari satu)
let checkboxGenre = document.querySelectorAll('input[name="genre"]:checked');
let genreDipilih = [];

// Masukkan value checkbox yang tercentang ke dalam array genreDipilih
for(let i = 0; i < checkboxGenre.length; i++) {
    genreDipilih.push(checkboxGenre[i].value);
}

// 4. Proses Filter Kartu Film
let semuaKartu = document.querySelectorAll(".kartu-film");
let jumlahCocok = 0;

semuaKartu.forEach(function(kartu) {
    // Ambil data atribut dari masing-masing kartu
    let genreKartu = kartu.getAttribute("data-genre");
    let tahunKartu = parseInt(kartu.getAttribute("data-tahun"));
    let ratingKartu = kartu.getAttribute("data-rating");

    // Cek syarat 1: Apakah Genre Cocok?
    let cocokGenre = false;
    if (genreDipilih.length === 0) {
        cocokGenre = true; // Jika tidak ada kotak genre yang dicentang, anggap semua cocok
    } else {
        if (genreDipilih.includes(genreKartu)) {
            cocokGenre = true;
        }
    }

    // Cek syarat 2: Apakah Tahun Cocok? 
    let cocokTahun = false;
    if (tahunDipilih === "semua") {
        cocokTahun = true;
    } else if (tahunDipilih === "atas_2020" && tahunKartu >= 2020) {
        cocokTahun = true;
    } else if (tahunDipilih === "bawah_2020" && tahunKartu < 2020) {
        cocokTahun = true;
    }

    // Cek syarat 3: Apakah Rating Cocok?
    let cocokRating = false;
    if (ratingDipilih === "semua" || ratingDipilih === ratingKartu) {
        cocokRating = true;
    }

    // Keputusan: Jika memenuhi KETIGA syarat di atas, tampilkan. Jika tidak, sembunyikan.
    if (cocokGenre && cocokTahun && cocokRating) {
        kartu.style.display = ""; // Gunakan display bawaan CSS
        jumlahCocok++;
    } else {
        kartu.style.display = "none"; // Sembunyikan film
    }
});

    // 5. Update teks jumlah
    document.getElementById('judul-hasil').innerText = "Hasil Filter";
    document.getElementById('teks-jumlah').innerText = "Menampilkan " + jumlahCocok + " film";
}

// Fungsi Reset Filter
function resetFilterLanjutan() {
    // Karena tombol punya tipe "reset", form HTML akan otomatis mengosongkan diri.
    // Kita hanya perlu sedikit jeda waktu sebelum memaksa fungsi filter berjalan lagi.
    setTimeout(function() {
        document.getElementById('judul-hasil').innerText = "Hasil Pencarian";
        terapkanFilterLanjutan();
    }, 10); // Jeda 10 milidetik
}

// ========================================================================= 
// JS Halaman Detail Film 
// ========================================================================= 

function toggleWatchlistDetail() {
    const btn = document.getElementById("btn-watchlist-detail");
    if (!btn) return;
    if (btn.innerText === "＋") {
        btn.innerText = "✓"; btn.style.backgroundColor = "var(--text-main)"; btn.style.color = "var(--bg-main)";
    } else {
        btn.innerText = "＋"; btn.style.backgroundColor = "transparent"; btn.style.color = "var(--text-main)";
    }
}

function toggleLikeDetail() {
    const btn = document.getElementById("btn-like-detail");
    if (!btn) return;
    btn.innerText = (btn.innerText === "♡") ? "♥" : "♡";
    btn.style.color = (btn.innerText === "♥") ? "var(--primary)" : "var(--text-main)";
}

function bukaTrailer() { 
    const m = document.getElementById("modal-trailer"); 
    if (m) m.style.display = "flex"; 
}
function tutupTrailer() { 
    const m = document.getElementById("modal-trailer"); 
    if (m) m.style.display = "none"; 
}


/* ========================================================================= */
/* JS Nonton Film
/* ========================================================================= */

// Fungsi Tombol Watchlist di Halaman Nonton
function toggleWatchlistNonton() {
    const btn = document.getElementById("btn-nonton-watchlist");
    if (!btn) return;

    if (btn.innerText === "＋") {
        btn.innerText = "✓";
        btn.style.backgroundColor = "var(--text-main)";
        btn.style.color = "var(--bg-main)";
    } else {
        btn.innerText = "＋";
        btn.style.backgroundColor = "var(--bg-section)";
        btn.style.color = "var(--text-main)";
    }
}

// Fungsi Tombol Like di Halaman Nonton
function toggleLikeNonton() {
    const btn = document.getElementById("btn-nonton-like");
    if (!btn) return;

    if (btn.innerText === "♡") {
        btn.innerText = "♥";
        btn.style.color = "var(--primary)";
        btn.style.borderColor = "var(--primary)";
    } else {
        btn.innerText = "♡";
        btn.style.color = "var(--text-main)";
        btn.style.borderColor = "var(--border)";
    }
}

/* ========================================================================= */
/* JS cast & Crew                                                            */
/* ========================================================================= */
function bukaTabCast(idTab, elemenTombol) {
    // Sembunyikan semua konten tab
    const semuaKonten = document.querySelectorAll('.konten-tab');
    semuaKonten.forEach(konten => {
        konten.classList.remove('aktif');
    });

    // Hapus class 'aktif' dari semua tombol tab
    const semuaTombol = document.querySelectorAll('.btn-tab');
    semuaTombol.forEach(tombol => {
        tombol.classList.remove('aktif');
    });

    // Tampilkan tab yang diklik dan beri garis bawah (aktif) pada tombolnya
    document.getElementById('tab-' + idTab).classList.add('aktif');
    elemenTombol.classList.add('aktif');
}

/* ========================================================================= */
/* JS PROFIL AKTOR                                                           */
/* ========================================================================= */

function bukaTabFilmografi(idTab, elemenTombol) {
    // [PENGAMAN] Pastikan ada tab yang bisa diakses
    const tabTarget = document.getElementById('tab-' + idTab);
    if (!tabTarget) return;

    // Sembunyikan semua konten tab filmografi
    const semuaKonten = document.querySelectorAll('.konten-tab-filmografi');
    semuaKonten.forEach(konten => {
        konten.classList.remove('aktif');
    });

    // Hapus class 'aktif' dari semua tombol tab
    const semuaTombol = document.querySelectorAll('.btn-tab-film');
    semuaTombol.forEach(tombol => {
        tombol.classList.remove('aktif');
    });

    // Tampilkan tab yang diklik dan beri garis bawah (aktif) pada tombolnya
    tabTarget.classList.add('aktif');
    elemenTombol.classList.add('aktif');
}