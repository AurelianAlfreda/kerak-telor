const KUNCI_USER = 'kt_user';

// Membaca data user
function bacaUser() {
    const data = localStorage.getItem(KUNCI_USER);

    if (data === null) {
        return [];
    }

    return JSON.parse(data);
}

// Menyimpan data user
function simpanUser(data) {
    localStorage.setItem(KUNCI_USER, JSON.stringify(data));
}

// Form register
const formRegister = document.getElementById('form-register-user');

formRegister.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const registerError = document.getElementById('register-error');
    const registerSuccess = document.getElementById('register-success');

    // Hilangkan pesan sebelumnya
    registerError.classList.add('d-none');
    registerSuccess.classList.add('d-none');

    // Validasi username
    if (username === '') {
        registerError.textContent = 'Username tidak boleh kosong.';
        registerError.classList.remove('d-none');
        return;
    }

    // Validasi password
    if (password.length < 3) {
        registerError.textContent = 'Password minimal 3 karakter.';
        registerError.classList.remove('d-none');
        return;
    }

    const daftarUser = bacaUser();

    // Cek username sudah digunakan atau belum
    const usernameSudahAda = daftarUser.some(function (user) {
        return user.username.toLowerCase() === username.toLowerCase();
    });

    if (usernameSudahAda) {
        registerError.textContent = 'Username sudah digunakan.';
        registerError.classList.remove('d-none');
        return;
    }

    // Data user baru
    const userBaru = {
        id: buatIdBaru(daftarUser),
        username: username,
        password: password
    };

    // Tambahkan user baru
    daftarUser.push(userBaru);

    // Simpan ke localStorage
    simpanUser(daftarUser);

    registerSuccess.textContent = 'Akun berhasil dibuat! Silakan login.';
    registerSuccess.classList.remove('d-none');

    formRegister.reset();

    // Pindah ke login
    setTimeout(function () {
        window.location.href = 'loginuser.html';
    }, 1000);
});

// Membuat ID baru
function buatIdBaru(daftar) {
    let terbesar = 0;

    daftar.forEach(function (item) {
        if (item.id > terbesar) {
            terbesar = item.id;
        }
    });

    return terbesar + 1;
}