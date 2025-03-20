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
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$dog = $_POST['dog'];

// SQL lekérdezés az adatok beszúrására
//$sql = "INSERT INTO orokbefogadasok ('name', email, phone, dog) VALUES ($name, $email, $phone, $dog)";
$sql = "INSERT INTO orokbefogadasok (name, email, phone, dog) VALUES ('".$name."','".$email."','".$phone."','".$dog."')";

if ($conn->query($sql) === TRUE) {
    echo "Sikeres örökbefogadás!";
} else {
    echo "Hiba történt: " . $conn->error;
}

$conn->close();
?>