<?php
include "./db.php";
if ($_SESSION['fnev'] != ""){
    $id = $_POST['id'];
    $szoveg = $_POST['szoveg'];
    if ($kapcsolat -> query("update uzenet set uzenet='$szoveg' where id=$id")){
        echo "ok";
    } else {
        echo "Hiba a mentés során...";
    }
} else {
    echo "Nem jelentkezett be...";
}