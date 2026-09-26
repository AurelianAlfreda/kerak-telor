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

$('.rating-button').on('click', function () {

    rating = Number($(this).val());
    $('#selectedRating').val(rating);

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            $('#star' + i).addClass('selected');
        } else {
            $('#star' + i).removeClass('selected');
        }
        $('#star' + i).attr('aria-pressed', i === rating);
    }

    $('#storyForm').removeClass('d-none');
});