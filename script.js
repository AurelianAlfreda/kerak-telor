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