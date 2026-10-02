// Cek login 
function cekLoginUser() {
    if (sessionStorage.getItem('kt_user') !== 'ya') {
        location.replace('loginuser.html');
    }
}

cekLoginUser();

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', function () {
    mainNav.classList.toggle('open');

    const isOpen = mainNav.classList.contains('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
});

const navLinks = mainNav.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        mainNav.classList.remove('open');
    });
});

function toggleHistoryImage() {
    const card = document.getElementById('interactiveCard');
    const btnHide = document.getElementById('btnHideImg');

    if (card && btnHide) {
        card.classList.toggle('is-revealed');

        if (card.classList.contains('is-revealed')) {
            btnHide.classList.add('show');
        } else {
            btnHide.classList.remove('show');
        }
    }
}

// ====== Data dari localStorage (lihat data.js) ======

let rating = 0;

const ratingButtons = document.querySelectorAll('.rating-button');
const storyForm = document.getElementById('storyForm');
const memoryName = document.getElementById('memoryName');
const memoryStory = document.getElementById('memoryStory');
const memoryStatus = document.getElementById('memoryStatus');
const memoryList = document.getElementById('memoryList');
const emptyMemory = document.getElementById('emptyMemory');
const recommendationGrid = document.getElementById('recommendationGrid');

/* ---------- Rekomendasi Tempat ---------- */
function formatRupiah(angka) {
    return 'IDR ' + Number(angka).toLocaleString('id-ID');
}

function buatBarisInfo(label, isi) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = label;
    p.appendChild(strong);
    p.append(' ' + isi);
    return p;
}

function buatKartuTempat(tempat) {
    const card = document.createElement('div');
    card.classList.add('recommendation-card');

    const dataTempatAwal = TEMPAT_AWAL.find(function (item) {
        return item.id === tempat.id;
    });

    const gambar = document.createElement('img');
    gambar.src = dataTempatAwal.gambar;
    gambar.alt = tempat.nama;
    gambar.classList.add('recommendation-image');

    const area = document.createElement('span');
    area.classList.add('recommendation-area');
    area.textContent = tempat.area;

    const nama = document.createElement('h3');
    nama.textContent = tempat.nama;

    card.appendChild(gambar);
    card.appendChild(area);
    card.appendChild(nama);
    card.appendChild(buatBarisInfo('Alamat:', tempat.alamat));
    card.appendChild(buatBarisInfo(
        'Range Harga:',
        formatRupiah(tempat.hargaMin) + ' - ' + formatRupiah(tempat.hargaMax)
    ));

    const tombolMaps = document.createElement('a');
    tombolMaps.href = dataTempatAwal.maps;
    tombolMaps.target = '_blank';
    tombolMaps.classList.add('maps-btn');
    tombolMaps.textContent = '📍 Google Maps';

    card.appendChild(tombolMaps);

    return card;
}

function muatTempat() {
    const daftarTempat = bacaData(KUNCI_TEMPAT, TEMPAT_AWAL);

    daftarTempat.forEach(function (tempat) {
        recommendationGrid.appendChild(buatKartuTempat(tempat));
    });
}

/* ---------- Wall of Memories ---------- */
function buatKartuUlasan(nama, nilaiRating, ulasan) {
    const review = document.createElement('div');
    review.classList.add('memory-note');

    const namaReview = document.createElement('h4');
    namaReview.textContent = nama;

    const ratingReview = document.createElement('p');
    ratingReview.classList.add('story-rating');
    ratingReview.textContent = '★'.repeat(nilaiRating) + '☆'.repeat(5 - nilaiRating);

    const ulasanReview = document.createElement('p');
    ulasanReview.classList.add('story-text');
    ulasanReview.textContent = ulasan;

    review.appendChild(namaReview);
    review.appendChild(ratingReview);
    review.appendChild(ulasanReview);

    return review;
}

function muatUlasan() {
    const daftarUlasan = bacaData(KUNCI_ULASAN, []);

    if (daftarUlasan.length === 0) {
        return;
    }

    emptyMemory.remove();

    daftarUlasan.forEach(function (u) {
        memoryList.appendChild(buatKartuUlasan(u.nama, u.rating, u.ulasan));
    });
}

ratingButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        rating = Number(button.value);

        ratingButtons.forEach(function (star) {

            if (Number(star.value) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }

        });

        storyForm.classList.remove('d-none');
        memoryStatus.textContent = '';

    });

});


storyForm.addEventListener('submit', function (event) {

    event.preventDefault();

    let nama = memoryName.value.trim();
    const ulasan = memoryStory.value.trim();

    if (nama === '') {
        nama = 'Anonim';
    }

    if (ulasan === '') {
        memoryStatus.textContent = 'Ulasan harus diisi.';
        return;
    }

    // Simpan ke localStorage (ulasan terbaru di urutan paling atas)
    const daftarUlasan = bacaData(KUNCI_ULASAN, []);

    daftarUlasan.unshift({
        id: buatIdBaru(daftarUlasan),
        nama: nama,
        rating: rating,
        ulasan: ulasan,
        tanggal: new Date().toISOString()
    });

    simpanData(KUNCI_ULASAN, daftarUlasan);

    if (emptyMemory) {
        emptyMemory.remove();
    }

    memoryList.prepend(buatKartuUlasan(nama, rating, ulasan));

    memoryName.value = '';
    memoryStory.value = '';

    rating = 0;

    ratingButtons.forEach(function (button) {
        button.classList.remove('selected');
    });

    storyForm.classList.add('d-none');

    memoryStatus.textContent = 'Ulasan berhasil ditampilkan.';

});

muatTempat();
muatUlasan();

// Logout user
const tombolLogoutUser = document.getElementById('btn-logout-user');

if (tombolLogoutUser) {
    tombolLogoutUser.addEventListener('click', function (event) {
        event.preventDefault();

        sessionStorage.removeItem('kt_user');
        location.replace('loginuser.html');
    });
}