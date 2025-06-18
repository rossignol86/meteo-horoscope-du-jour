<?php
// proxy-horoscope.php

// Vérifie que le paramètre 'sign' est présent
if (!isset($_GET['sign'])) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Signe manquant']);
    exit;
}

$signe = $_GET['sign'];
$url = "https://aztro.sameerkumar.website/?sign=" . urlencode($signe) . "&day=today";

// Initialise cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true); // méthode POST obligatoire pour cette API

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Envoie la réponse JSON au client
header('Content-Type: application/json');
http_response_code($http_code);
echo $response;
?>
