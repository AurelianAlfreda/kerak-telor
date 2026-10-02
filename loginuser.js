const USER_USERNAME = 'asd';
const USER_PASSWORD = '123';

const formLogin = document.getElementById('form-login-user');
const pesanError = document.getElementById('login-error');

if (sessionStorage.getItem('kt_user') === 'ya') {
    location.replace('index.html');
}

formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === USER_USERNAME && password === USER_PASSWORD) {
        sessionStorage.setItem('kt_user', 'ya');
        location.replace('index.html');
        return;
    }

    pesanError.textContent = 'Username atau password salah.';
    pesanError.classList.remove('d-none');
});