<?php
include "./db.php";
if ($_SESSION['fnev'] != ""){
    $id = $_GET['id'];
    $kep = $kapcsolat -> query("SELECT kep FROM uzenet WHERE id=$id") -> fetch_assoc();
    echo "data:image;base64, ".base64_encode($kep['kep']);
}