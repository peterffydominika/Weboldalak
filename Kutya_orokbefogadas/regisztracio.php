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
$firstname = $_POST['firstname'];
$sirname = $_POST['sirname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$password1 = $_POST['password1'];
$resetpassword = $_POST['resetpassword'];

// SQL lekérdezés az adatok beszúrására
//$sql = "INSERT INTO orokbefogadasok ('name', email, phone, dog) VALUES ($name, $email, $phone, $dog)";
$sql = "INSERT INTO regisztraciok (firstname, sirname, email, phone, address, password1, resetpassword) VALUES ('".$firstname."', '".$sirname."','".$email."','".$phone."','".$address."',SHA2('".$password1."',256),SHA2('".$resetpassword."',256))";

if ($conn->query($sql) === TRUE) {
    echo "Sikeres regisztráció!";
} else {
    echo "Hiba történt: " . $conn->error;
}

$conn->close();
?>
<a href="regisztracio.html">Vissza</a>