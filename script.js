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

let rating = 0;

const ratingButtons = document.querySelectorAll('.rating-button');
const storyForm = document.getElementById('storyForm');
const memoryName = document.getElementById('memoryName');
const memoryStory = document.getElementById('memoryStory');
const memoryStatus = document.getElementById('memoryStatus');
const memoryList = document.getElementById('memoryList');
const emptyMemory = document.getElementById('emptyMemory');

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

    const review = document.createElement('div');
    review.classList.add('memory-note');

    const namaReview = document.createElement('h4');
    namaReview.textContent = nama;

    const ratingReview = document.createElement('p');
    ratingReview.classList.add('story-rating');

    ratingReview.textContent =
        '★'.repeat(rating) +
        '☆'.repeat(5 - rating);

    const ulasanReview = document.createElement('p');
    ulasanReview.classList.add('story-text');
    ulasanReview.textContent = ulasan;

    review.appendChild(namaReview);
    review.appendChild(ratingReview);
    review.appendChild(ulasanReview);

    if (emptyMemory) {
        emptyMemory.remove();
    }

    memoryList.prepend(review);

    memoryName.value = '';
    memoryStory.value = '';

    rating = 0;

    ratingButtons.forEach(function (button) {
        button.classList.remove('selected');
    });

    storyForm.classList.add('d-none');

    memoryStatus.textContent = 'Ulasan berhasil ditampilkan.';

});