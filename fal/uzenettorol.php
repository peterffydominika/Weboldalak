<?php
    include "./db.php";
    //csak bejelentkeztem
    $kiir = "ok";
    if ($_SESSION['jog'] > 0){
        // ha admin vagyok, akkor csak csak logikai törlés (torolt paraméter = 1)
        // ha én, akkor ha van válasz, akkor csak logikai, egyébként fizikai törlés
        $uzid = $_POST['id'];
        $fnev = $_POST['fnev'];
        if ($fnev == $_SESSION['fnev']){
            if (($kapcsolat -> query("SELECT id FROM uzenet WHERE valasz=$uzid") -> num_rows) > 0){
                //mivel van válasz, ezért csak logikai törlés
                if (!($kapcsolat -> query("UPDATE uzenet SET torolt=1 WHERE id=$uzid"))) $kiir = "Nem sikerült..";
            } else {
                //mivel nincs válasz, ezért fizikai törlés
                if (!($kapcsolat -> query("DELETE FROM uzenet WHERE id=$uzid"))) $kiir = "Nem sikerült..";
            }
        } else {
            if ($_SESSION['jog'] == 2){
                //mivel nem én írtam, de admin vagyok, ezért logikai törlés
                if (!($kapcsolat -> query("UPDATE uzenet SET torolt=1 WHERE id=$uzid"))) $kiir = "Nem sikerült..";
            }
        }
    } else {
        $kiir = "<h2>Nem jelentkezett be!</h2>";
    }
    echo $kiir;
?>