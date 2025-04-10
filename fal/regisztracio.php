<?php
    //ok nememail dbhiba
    include "./db.php";
    $fnev = $_POST['fnev'];
    $nev = $_POST['nev'];
    $pwd = sha1($_POST['pwd']);
    // 1. létezik-e az email cím
    if ($kapcsolat -> query("select * from felhasznalo where fnev='$fnev'") -> num_rows == 1){
        echo "nememail";
    } else {
        if ($kapcsolat -> query("INSERT INTO felhasznalo(fnev, nev, jelszo) VALUES ('$fnev','$nev','$pwd')")){
            $_SESSION['fnev'] = $fnev;
            $_SESSION['nev'] = $nev;
            $_SESSION['jog'] = 1;
            echo "ok";
        } else {
            echo "dbhiba";
        }
    }
?>