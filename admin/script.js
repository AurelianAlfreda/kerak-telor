$(document).ready(function () {

    // Cek login (simulasi). Kalau belum login, kembali ke halaman login.
    if (sessionStorage.getItem('kt_admin') !== 'ya') {
        location.href = 'login.html';
        return;
    }

    let hapusTarget = null;

    // Teks ulasan berasal dari pengunjung, jadi di-escape agar tidak jadi celah XSS
    function esc(teks) {
        return $('<div>').text(teks ?? '').html();
    }

    const rupiah = (angka) => 'Rp ' + Number(angka).toLocaleString('id-ID');
    const bintang = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
    const tanggal = (iso) => new Date(iso).toLocaleString('id-ID');

    function notif(pesan, tipe = 'success') {
        $('#notif')
            .removeClass('alert-success alert-danger')
            .addClass('alert-' + tipe)
            .text(pesan)
            .stop(true, true)
            .fadeIn(200)
            .delay(3000)
            .fadeOut(400);
    }

    // Filter tabel di sisi client
    function pasangPencarian(inputSel, tbodySel) {
        $(inputSel).on('input', function () {
            const kata = $(this).val().toLowerCase();
            $(`${tbodySel} tr`).each(function () {
                $(this).toggle($(this).text().toLowerCase().includes(kata));
            });
        });
    }

    // Akses data
    const ambilTempat = () => bacaData(KUNCI_TEMPAT, TEMPAT_AWAL);
    const ambilUlasan = () => bacaData(KUNCI_ULASAN, []);

    $('#sidebar-toggle').on('click', function () {
        $('.sidebar').addClass('show');
        $('#sidebar-overlay').fadeIn(300);
    });

    $('#sidebar-overlay, #admin-nav a').on('click', function () {
        if ($(window).width() <= 768) {
            $('.sidebar').removeClass('show');
            $('#sidebar-overlay').fadeOut(300);
        }
    });

    $('#admin-nav a').on('click', function (e) {
        e.preventDefault();
        $('#admin-nav a').removeClass('active');
        $(this).addClass('active');

        $('.tab-section').hide();
        $('#' + $(this).data('target')).fadeIn(300);

        // Muat ulang data tab yang dibuka supaya selalu terbaru
        const target = $(this).data('target');
        if (target === 'tab-statistik') muatStatistik();
        if (target === 'tab-ulasan') muatUlasan();
        if (target === 'tab-tempat') muatTempat();
    });

    function muatStatistik() {
        const ulasan = ambilUlasan();
        const total = ulasan.length;

        // Rata-rata rating
        let jumlahRating = 0;
        ulasan.forEach(u => jumlahRating += u.rating);
        const rata = total ? (jumlahRating / total).toFixed(1) : 0;

        $('#angka-ulasan').text(total);
        $('#angka-rating').text(rata);
        $('#angka-tempat').text(ambilTempat().length);

        // Distribusi rating 5 -> 1
        let html = '';
        for (let r = 5; r >= 1; r--) {
            const jml = ulasan.filter(u => u.rating === r).length;
            const persen = total ? (jml / total) * 100 : 0;
            html += `
                <div class="d-flex align-items-center mb-2">
                    <span style="width:60px">${r} <span class="text-warning">★</span></span>
                    <div class="bar-rating">
                        <div class="bar-fill" style="width:${persen}%"></div>
                    </div>
                    <span class="ms-2" style="width:30px">${jml}</span>
                </div>`;
        }
        $('#distribusi-rating').html(html);

        // 5 ulasan terbaru (data sudah tersimpan terbaru di atas)
        const terbaru = ulasan.slice(0, 5).map(u => `
            <li class="list-group-item px-0">
                <div class="d-flex justify-content-between">
                    <strong>${esc(u.nama)}</strong>
                    <span class="text-warning">${bintang(u.rating)}</span>
                </div>
                <small class="text-muted">${esc(u.ulasan)}</small>
            </li>`).join('');
        $('#ulasan-terbaru').html(terbaru || '<li class="list-group-item text-muted px-0">Belum ada ulasan.</li>');
    }

    function muatUlasan() {
        const rows = ambilUlasan().map(u => `
            <tr>
                <td>${u.id}</td>
                <td>${esc(u.nama)}</td>
                <td class="text-warning">${bintang(u.rating)}</td>
                <td class="cell-ulasan">${esc(u.ulasan)}</td>
                <td>${esc(tanggal(u.tanggal))}</td>
                <td>
                    <button class="btn btn-sm btn-danger btn-hapus" data-jenis="ulasan" data-id="${u.id}">Hapus</button>
                </td>
            </tr>`).join('');
        $('#tabel-ulasan tbody').html(rows || '<tr><td colspan="6" class="text-center text-muted">Belum ada ulasan.</td></tr>');
    }

    function muatTempat() {
        const rows = ambilTempat().map(t => `
            <tr>
                <td>${t.id}</td>
                <td><span class="badge text-bg-secondary">${esc(t.area)}</span></td>
                <td>${esc(t.nama)}</td>
                <td>${esc(t.alamat)}</td>
                <td>${rupiah(t.hargaMin)} - ${rupiah(t.hargaMax)}</td>
                <td class="text-nowrap">
                    <button class="btn btn-sm btn-warning btn-edit-tempat" data-id="${t.id}">Edit</button>
                    <button class="btn btn-sm btn-danger btn-hapus" data-jenis="tempat" data-id="${t.id}">Hapus</button>
                </td>
            </tr>`).join('');
        $('#tabel-tempat tbody').html(rows || '<tr><td colspan="6" class="text-center text-muted">Belum ada tempat.</td></tr>');
    }

    function resetFormTempat() {
        $('#form-tempat')[0].reset();
        $('#edit_id_tempat').val('');
        $('#judul-form-tempat').text('Tambah Tempat Baru');
        $('#btn-tempat-submit').text('Simpan');
        $('#btn-tempat-cancel').hide();
    }

    $('#form-tempat').on('submit', function (e) {
        e.preventDefault();

        const id = Number($('#edit_id_tempat').val());
        const hargaMin = Number($('#harga_min').val());
        const hargaMax = Number($('#harga_max').val());

        if (hargaMax < hargaMin) {
            notif('Harga maksimal harus lebih besar dari harga minimal.', 'danger');
            return;
        }

        const daftar = ambilTempat();
        const dataForm = {
            area: $('#area').val(),
            nama: $('#nama').val().trim(),
            alamat: $('#alamat').val().trim(),
            hargaMin: hargaMin,
            hargaMax: hargaMax
        };

        if (id) {
            // Mode edit: cari data lalu timpa isinya
            const tempat = daftar.find(t => t.id === id);
            Object.assign(tempat, dataForm);
            notif('Data tempat berhasil diperbarui!');
        } else {
            // Mode tambah: buat id baru
            daftar.push({ id: buatIdBaru(daftar), ...dataForm });
            notif('Tempat berhasil ditambahkan!');
        }

        simpanData(KUNCI_TEMPAT, daftar);
        resetFormTempat();
        muatTempat();
    });

    $(document).on('click', '.btn-edit-tempat', function () {
        const t = ambilTempat().find(x => x.id === Number($(this).data('id')));

        $('#edit_id_tempat').val(t.id);
        $('#area').val(t.area);
        $('#nama').val(t.nama);
        $('#alamat').val(t.alamat);
        $('#harga_min').val(t.hargaMin);
        $('#harga_max').val(t.hargaMax);

        $('#judul-form-tempat').text('Edit Tempat');
        $('#btn-tempat-submit').text('Update Tempat');
        $('#btn-tempat-cancel').show();
        $('main').animate({ scrollTop: 0 }, 300);
    });

    $('#btn-tempat-cancel').on('click', resetFormTempat);

    $('#btn-reset-tempat').on('click', function () {
        if (confirm('Kembalikan daftar tempat ke data awal? Perubahan yang sudah dibuat akan hilang.')) {
            simpanData(KUNCI_TEMPAT, TEMPAT_AWAL);
            resetFormTempat();
            muatTempat();
            notif('Data tempat dikembalikan ke data awal.');
        }
    });

    $(document).on('click', '.btn-hapus', function () {
        hapusTarget = { jenis: $(this).data('jenis'), id: Number($(this).data('id')) };
        new bootstrap.Modal('#modalKonfirmasiHapus').show();
    });

    $('#btn-modal-hapus').on('click', function () {
        if (!hapusTarget) return;

        const kunci = hapusTarget.jenis === 'ulasan' ? KUNCI_ULASAN : KUNCI_TEMPAT;
        const dataAwal = hapusTarget.jenis === 'ulasan' ? [] : TEMPAT_AWAL;

        // Buang item yang id-nya cocok, simpan sisanya
        const sisa = bacaData(kunci, dataAwal).filter(item => item.id !== hapusTarget.id);
        simpanData(kunci, sisa);

        bootstrap.Modal.getInstance('#modalKonfirmasiHapus').hide();
        notif(hapusTarget.jenis === 'ulasan' ? 'Ulasan berhasil dihapus!' : 'Tempat berhasil dihapus!');

        if (hapusTarget.jenis === 'ulasan') {
            muatUlasan();
        } else {
            muatTempat();
        }
    });

    $('#btn-logout').on('click', function (e) {
        e.preventDefault();
        sessionStorage.removeItem('kt_admin');
        location.href = 'login.html';
    });

    pasangPencarian('#search-ulasan', '#tabel-ulasan tbody');
    pasangPencarian('#search-tempat', '#tabel-tempat tbody');
    resetFormTempat();
    muatStatistik();
});
