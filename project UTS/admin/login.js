const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const formLogin = document.getElementById('form-login');
const pesanError = document.getElementById('login-error');

if (sessionStorage.getItem('kt_admin') === 'ya') {
    location.href = 'index.html';
}

formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem('kt_admin', 'ya');
        location.href = 'index.html';
        return;
    }

    pesanError.textContent = 'Username atau password salah.';
    pesanError.classList.remove('d-none');
});
