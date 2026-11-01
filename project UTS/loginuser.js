const KUNCI_USER = 'kt_user';

const formLogin = document.getElementById('form-login-user');
const pesanError = document.getElementById('login-error');

formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dataUser = localStorage.getItem(KUNCI_USER);
    let daftarUser = [];

     if (dataUser !== null) {
        daftarUser = JSON.parse(dataUser);
    }

    // Cari username dan password yang sesuai
    const userDitemukan = daftarUser.find(function (user) {
        return user.username === username &&
               user.password === password;
    });

    if (userDitemukan) {

        // Tandai bahwa user sudah login
        sessionStorage.setItem('kt_user_login', 'ya');

        // Simpan data user yang sedang login
        sessionStorage.setItem(
            'kt_user_aktif',
            JSON.stringify(userDitemukan)
        );

        location.replace('index.html');
        return;
    }

    pesanError.textContent = 'Username atau password salah.';
    pesanError.classList.remove('d-none');
});