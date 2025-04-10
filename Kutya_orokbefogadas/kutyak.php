<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "orokbefogadas";

// Kapcsolódás az adatbázishoz
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

// Adatok fogadása
$nev = $_POST['nev'];
$eletkor = $_POST['eletkor'];
$meret = $_POST['meret'];
$kep_url = $_POST['kep_url'];
$Menhelyre_kerules_ideje = $_POST['Menhelyre_kerules_ideje'];

$sql = "INSERT INTO kutyak (nev, eletkor, meret, kep_url, Menhelyre_kerules_ideje) VALUES ('".$nev."','".$eletkor."','".$meret."','".$kep_url."','".$Menhelyre_kerules_ideje."')";

if ($conn->query($sql) === TRUE) {
    echo "Sikeres felvitel!";
} else {
    echo "Hiba történt: " . $conn->error;
}

$conn->close();
?>