<?php
    include "./db.php";
    $fnev = $_POST['fnev'];
    $pwd = sha1($_POST['pwd']);
    $eredmeny = $kapcsolat -> query("SELECT * FROM felhasznalo WHERE fnev='$fnev' AND jelszo='$pwd' AND jog>0");
    if ($eredmeny -> num_rows == 1){
        $adatok = $eredmeny -> fetch_assoc();
        if ($adatok['jog'] > 0){
            $_SESSION['fnev'] = $adatok['fnev'];
            $_SESSION['nev'] = $adatok['nev'];
            $_SESSION['jog'] = $adatok['jog'];
            echo "ok";
        } else {
            echo "Felfüggesztve";
        }
    } else {
        echo "Hibás adatok";
    }
