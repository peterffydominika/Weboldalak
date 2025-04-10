<?php
    //session
    if (session_status() == PHP_SESSION_NONE) session_start();
    if(!isset($_SESSION['fnev'])) $_SESSION['fnev'] = "";
    if(!isset($_SESSION['nev'])) $_SESSION['nev'] = "";
    if(!isset($_SESSION['jog'])) $_SESSION['jog'] = 0;
    //adatbázis
    $kapcsolat = new mysqli("localhost","root","","fal");
?>