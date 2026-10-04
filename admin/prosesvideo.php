<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $judul = $_POST['judul_video'] ?? '';
    $url = $_POST['url_video'] ?? '';

    if (!empty($judul) && !empty($url)) {
        // Logika simpan data ke database/file
        
        header('Location: index.php?status=success');
        exit;
    }
}

header('Location: index.php?status=error');
exit;