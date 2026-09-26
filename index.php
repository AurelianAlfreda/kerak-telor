<?php
include "includes/config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST["name"]);
    $rating = (int) $_POST["rating"];
    $story = trim($_POST["story"]);

    if ($rating >= 1 && $rating <= 5 && $story != "") {

        $name = mysqli_real_escape_string($conn, $name);
        $story = mysqli_real_escape_string($conn, $story);

        $query = "INSERT INTO reviews (name, rating, story)
                  VALUES ('$name', '$rating', '$story')";

        mysqli_query($conn, $query);

        header("Location: index.php#memories");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warisan Kuliner Betawi</title>

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="site-header">
        <div class="container header-inner">
            <!-- Logo & Brand -->
            <div class="brand">
                <div class="brand-icon">🍴</div>
                <div>
                    <span class="brand-title">Kerak Telor</span>
                    <span class="brand-subtitle">Legenda Betawi</span>
                </div>
            </div>

            <!-- Navigasi Desktop -->
            <nav class="main-nav" id="mainNav">
                <a href="#pengenalan" class="nav-link">Pengenalan</a>
                <a href="#sejarah" class="nav-link">Sejarah</a>
                <a href="#pembuatan" class="nav-link">Cara Pembuatan</a>
                <a href="#rekomendasi" class="nav-link">Rekomendasi Tempat</a>
                <a href="#memories" class="nav-link">Wall of Memories</a>
            </nav>

            <!-- Tombol menu untuk tampilan mobile -->
            <button id="mobileMenuBtn" class="mobile-menu-btn" aria-label="Buka menu navigasi" aria-expanded="false">
                <span class="hamburger"></span>
            </button>
        </div>
    </header>

    <section class="hero">
        <div class="container hero-content">
            <h1 class="hero-title">Kelezatan Otentik <em>Kerak Telor</em> Betawi</h1>
            <p class="hero-desc">
                Menyusuri jejak aroma arang, gurihnya kelapa sangrai, dan kehangatan tradisi
                kuliner tempo doeloe yang tetap abadi di jantung Jakarta.
            </p>
            <div class="hero-buttons">
                <a href="#pengenalan" class="btn btn-primary">Jelajahi Kelezatan &darr;</a>
            </div>
        </div>
    </section>

    <main>
        <section id="pengenalan" class="section">
            <div class="container">
                <div class="section-heading">
                    <h2>Apa itu Kerak Telor?</h2>
                </div>

                <div class="two-col">
                    <!-- Kartu Gambar -->
                    <figure class="img-card">
                        <img src="images/kerak-telor-utama.jpeg" alt="Kerak Telor Betawi" width="800" height="500">
                        <figcaption>
                            "Perpaduan sempurna ketan putih, telur bebek, ebi gurih, dan serundeng kelapa khas."
                        </figcaption>
                    </figure>

                    <!-- Deskripsi -->
                    <div class="text-block">
                        <h3>Mahakarya Kuliner Tradisional Asli Jakarta</h3>
                        <p>
                            <strong>Kerak Telor</strong> adalah makanan asli daerah Jakarta (Betawi), yang terbuat
                            dari bahan-bahan utama beras ketan putih, telur ayam atau bebek, ebi (udang kering
                            yang diasinkan dan disangrai kering), ditambah bawang merah goreng, lalu diberi bumbu
                            halus khusus.
                        </p>

                        <div class="feature-grid">
                            <div class="feature-card">
                                <div class="feature-icon">🌾</div>
                                <div>
                                    <h4>Beras Ketan Berkualitas</h4>
                                    <p>Dimasak pulen di atas wajan khusus tanpa minyak.</p>
                                </div>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🔥</div>
                                <div>
                                    <h4>Serundeng &amp; Ebi</h4>
                                    <p>Memberikan aroma harum khas yang menggugah selera.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        <section id="sejarah" class="section section-alt">
            <div class="container">
                <div class="section-heading">
                    <span class="section-label">Nostalgia &amp; Asal Usul</span>
                    <h2>Sejarah &amp; Perjalanan Kerak Telor</h2>
                </div>

                <div class="history-grid">

                    <div class="history-text-col">
                        
                        <div class="timeline-card">
                            <span class="timeline-year">Era 1920-an</span>
                            <h3>Awal Mulai Ciptaan Tanpa Sengaja</h3>
                            <p>
                                Kerak telor lahir dari kreativitas masyarakat Betawi di kawasan Menteng, Batavia pada tahun 1920-an. Awalnya, warga lokal berupaya memanfaatkan berlimpahnya pohon kelapa dengan meracik adonan ketan dan bumbu tradisional yang dimasak di atas wajan tanpa minyak.
                            </p>
                        </div>

                        <div class="timeline-card">
                            <span class="timeline-year">Era 1970-an</span>
                            <h3>Menjadi Hidangan Mewah &amp; Ikonik</h3>
                            <p>
                                Pada masa kepemimpinan Gubernur Ali Sadikin, keberadaan Kerak Telor mulai diangkat dan dipromosikan sebagai identitas budaya Betawi. Kerak Telor saat itu menjadi santapan berkelas yang kerap dihidangkan dalam acara-acara formal Pemprov DKI Jakarta dan pesta rakyat.
                            </p>
                        </div>

                        <div class="timeline-card">
                            <span class="timeline-year">Masa Kini</span>
                            <h3>Warisan Budaya yang Tetap Abadi</h3>
                            <p>
                                Makanan ini tidak hanya sekadar kuliner lezat, melainkan lambang kehangatan dan keragaman budaya Batavia. Hingga saat ini, Kerak Telor menjadi kuliner wajib yang paling dicari setiap perayaan Hari Ulang Tahun Jakarta maupun event tahunan Pekan Raya Jakarta (PRJ).
                            </p>
                        </div>

                    </div>

                    <div class="history-gallery-col">
                        <div class="history-photo-card">
                            <img src="images/kerak-telor-abang.jpeg" alt="Sejarah Kerak Telor Era 1920">
                            <div class="photo-caption">
                                 "Awal kreasi masyarakat Betawi Menteng memanfaatkan ketan & kelapa."
                            </div>
                        </div>

                        <div class="history-photo-card">
                            <img src="images/masak-kerak-telor-bang.jpeg" alt="Sejarah Kerak Telor Era 1970">
                            <div class="photo-caption">
                                "Menjadi sajian ikonik di ajang Pekan Raya Jakarta & acara resmi Pemprov DKI."
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

            <section id="memories" class="section section-alt">
            <div class="container">
                <div class="section-heading">
                    <span class="section-label">
                        Kenangan tentang Kerak Telor
                    </span>
                    <h2>Wall of Memories</h2>
                    <p class="section-desc">
                        Ceritakan pengalamanmu makan Kerak Telor.
                    </p>
                </div>

                <div class="row">
                    <div class="col-12 col-lg-4 mb-4">
                        <div class="card p-3">
                            <h3>Bagikan pengalamanmu</h3>

                            <div class="rating-area mt-2">
                                <p class="rating-question">Bagaimana rasanya?</p>

                                <div class="rating-stars">
                                    <button id="star1" class="rating-button" value="1" aria-label="1 bintang" aria-pressed="false">★</button>
                                    <button id="star2" class="rating-button" value="2" aria-label="2 bintang" aria-pressed="false">★</button>
                                    <button id="star3" class="rating-button" value="3" aria-label="3 bintang" aria-pressed="false">★</button>
                                    <button id="star4" class="rating-button" value="4" aria-label="4 bintang" aria-pressed="false">★</button>
                                    <button id="star5" class="rating-button" value="5" aria-label="5 bintang" aria-pressed="false">★</button>
                                </div>
                            </div>

                            <form id="storyForm" class="d-none mt-2" method="POST">

                            <input type="hidden" id="selectedRating" name="rating">

                            <label class="form-label w-100">
                                Nama (opsional)

                                <input id="memoryName"
                                    name="name"
                                    type="text"
                                    class="form-control">
                            </label>

                            <label class="form-label w-100 mt-2">
                                2. Pengalamanmu

                                <textarea id="memoryStory"
                                        name="story"
                                        class="form-control"
                                        required></textarea>
                            </label>

                            <button type="submit" class="btn btn-primary w-100 mt-2">
                                Kirim cerita
                            </button>

                        </form>

                            <p id="memoryStatus" class="mt-2"></p>
                        </div>
                    </div>

                    <div class="col-12 col-lg-8">
                        <h3 class="mb-4">Cerita pengunjung</h3>
                        <div id="memoryList" class="row">
                        <?php
                        $reviews = mysqli_query(
                            $conn,
                            "SELECT * FROM reviews ORDER BY created_at DESC"
                        );

                        while ($review = mysqli_fetch_assoc($reviews)) {
                        ?>

                            <div class="col-12 mb-3">
                                <div class="card p-3">

                                    <h5>
                                        <?php
                                        if ($review["name"] == "") {
                                            echo "Anonim";
                                        } else {
                                            echo htmlspecialchars($review["name"]);
                                        }
                                        ?>
                                    </h5>

                                    <div>
                                        <?php
                                        echo str_repeat("★", $review["rating"]);
                                        echo str_repeat("☆", 5 - $review["rating"]);
                                        ?>
                                    </div>

                                    <p>
                                        <?php echo htmlspecialchars($review["story"]); ?>
                                    </p>

                                </div>
                            </div>

                        <?php
                        }
                        ?>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
