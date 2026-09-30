const KUNCI_TEMPAT = 'kt_tempat';
const KUNCI_ULASAN = 'kt_ulasan';

// Data awal rekomendasi tempat (dipakai saat localStorage masih kosong)
const TEMPAT_AWAL = [
    { id: 1, area: "Jakarta Pusat", nama: "Kerak Telor Bang Doel", alamat: "Jl. Pintu Air Raya No. 68, Ps. Baru, Sawah Besar, Jakarta Pusat", hargaMin: 25000, hargaMax: 50000 },
    { id: 2, area: "Jakarta Pusat", nama: "Kerak Telor Depan Ragusa", alamat: "Jl. Veteran I (Depan Es Krim Ragusa), Gambir, Jakarta Pusat", hargaMin: 25000, hargaMax: 35000 },
    { id: 3, area: "Jakarta Utara", nama: "Kerak Telor Bang Roy Ancol", alamat: "Pantai Lagoon, Jl. Lodan Timur, Ancol, Pademangan, Jakarta Utara", hargaMin: 25000, hargaMax: 35000 },
    { id: 4, area: "Jakarta Utara", nama: "Kerak Telor Bang Ade (Koja)", alamat: "Jl. Labu No. 9, Lagoa, Koja, Jakarta Utara", hargaMin: 20000, hargaMax: 30000 },
    { id: 5, area: "Jakarta Selatan", nama: "Kerak Telor Bang Dhory", alamat: "Jl. Letjen M.T. Haryono Kav. 30, Tebet Timur, Tebet, Jakarta Selatan", hargaMin: 20000, hargaMax: 30000 },
    { id: 6, area: "Jakarta Selatan", nama: "Kerak Telor Khas Betawi Al Aziz", alamat: "Jl. Tebet Barat Dalam Raya (Depan SMK 32), Tebet, Jakarta Selatan", hargaMin: 20000, hargaMax: 30000 },
    { id: 7, area: "Jakarta Barat", nama: "Kerak Telor Tunas Betawi", alamat: "Jl. H. Nasir No. 28C, Srengseng, Kembangan, Jakarta Barat", hargaMin: 25000, hargaMax: 50000 },
    { id: 8, area: "Jakarta Timur", nama: "Kerak Telor Bang Ade (Ujung Menteng)", alamat: "Jl. Satria I No. 261, Ujung Menteng, Cakung, Jakarta Timur", hargaMin: 20000, hargaMax: 30000 },
    { id: 9, area: "Jakarta Timur", nama: "Kerak Telor Bang Roy (Pulo Gebang)", alamat: "Jl. Swadaya Pos, Pulo Gebang, Cakung, Jakarta Timur", hargaMin: 20000, hargaMax: 30000 },
    { id: 10, area: "Jakarta Timur", nama: "Kerak Telor Mpok Ayu", alamat: "Jl. Prumpung Barat, Rawa Bunga, Jatinegara, Jakarta Timur", hargaMin: 20000, hargaMax: 30000 }
];

// Membaca data dari localStorage. Kalau belum ada, pakai data awal.
function bacaData(kunci, dataAwal) {
    try {
        const teks = localStorage.getItem(kunci);

        if (teks === null) {
            simpanData(kunci, dataAwal);
            return JSON.parse(JSON.stringify(dataAwal));
        }

        return JSON.parse(teks);
    } catch (error) {
        return JSON.parse(JSON.stringify(dataAwal));
    }
}

// Menyimpan array/objek ke localStorage dalam bentuk teks JSON
function simpanData(kunci, data) {
    localStorage.setItem(kunci, JSON.stringify(data));
}

// Membuat id baru = id terbesar + 1
function buatIdBaru(daftar) {
    let terbesar = 0;

    daftar.forEach(function (item) {
        if (item.id > terbesar) {
            terbesar = item.id;
        }
    });

    return terbesar + 1;
}
