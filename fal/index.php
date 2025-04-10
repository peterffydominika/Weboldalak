<?php
    include "./db.php";
    $hibauzenet = "";
    if (isset($_POST['ment'])){
        $tulajdonos = $_SESSION['fnev'];
        $szoveg = $_POST['szoveg'];
        $valaszid = $_POST['valaszid'];
        $keptart="";
        if(is_uploaded_file($_FILES['kep']['tmp_name'])){
            $kep = $_FILES['kep']['tmp_name'];
            //image/gif image/png image/jpeg
            $keptipus = mime_content_type($kep);
            if ($keptipus == "image/gif" || $keptipus == "image/png" || $keptipus == "image/jpeg"){
                $keptart = addslashes(file_get_contents($kep));
            } else {
                $hibauzenet = "<h2>A csatolt file nem lett mentve, mivel nem megfelelő formátumú (jpg, png, gif)!</h2>";
            }
        }
        $kapcsolat -> query("INSERT INTO uzenet(id, valasz, felhid, uzenet, kep, torolt) VALUES (0,$valaszid,'$tulajdonos','$szoveg','$keptart',false)");
    }
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Üzenőfal</title>
    <link rel="stylesheet" href="./css/cs.css">
    <script src="./js/js.js"></script>
</head>
<body onload="init()" onresize="init()">
    <?php
    if ($_SESSION['fnev'] == ""){
        //még nem jelentkeztünk be
    ?>
    <div id="bejelentkezes" class="latszik ablakkozepre">
        <table>
            <tr><th colspan="2">Bejelentkezés</th></tr>
            <tr>
                <td>Felhasználói név (e-mail cím):</td>
                <td><input type="text" size="50" maxlength="50" placeholder="valaki@valahol.hu" title="az e-mail cím kellene" id="bejelfnev"></td>
            </tr>
            <tr>
                <td>Jelszó:</td>
                <td><input type="password" size="50" maxlength="50"  title="jelszó, legalább 1 nagybetű!" id="bejeljelszo"></td>
            </tr>
            <tr>
                <td colspan="2" class="cellajobbra">
                    <input type="button" value="Bejelentkezés" onclick="bejel()"><input type="button" value="Regisztráció" onclick="regiszt()">
                </td>
            </tr>
        </table>
    </div>
    <div id="regisztracio" class="nemlatszik ablakkozepre">
    <table>
        <tr><th colspan="2">Regisztráció</th></tr>
        <tr>
            <td>Felhasználói név (e-mail cím):</td>
            <td>
                <input type="text" size="50" maxlength="50" id="regfnev" placeholder="valaki@valahol.hu" title="az e-mail cím kellene">
            </td>
        </tr>
        <tr>
            <td>Név:</td>
            <td>
                <input type="text" size="50" maxlength="40" id="regnev" title="A felhasználó neve kell...">
            </td>
        </tr>
        <tr>
            <td>Jelszó (kétszer):</td>
            <td>
                <input type="password" size="50" maxlength="50"  title="jelszó, legalább 1 nagybetű, szám és spec. karakter!" id="regjelszo1"><br>
                <input type="password" size="50" maxlength="50"  title="jelszó, legalább 1 nagybetű, szám és spec. karakter!" id="regjelszo2">
            </td>
        </tr>
        <tr>
            <td colspan="2" class="cellajobbra">
                <input type="button" value="Regisztráció" onclick="regisztracio()"><input type="button" value="Mégse" onclick="megsereg()">
            </td>
        </tr>
    </table>    
    </div>
    <?php
    } else {
        //már bejelentkeztünk
    ?>
    <div id="ujuzenet" class="nemlatszik ablakkozepre">
        <form action="" method="POST" enctype="multipart/form-data">
            <textarea rows="5" cols="60" maxlength="300" name="szoveg" id="szoveg" placeholder="ide jön az üzenet szövege" required></textarea><br>
            Kép: <input type="file" name="kep"><br>
            <input type="hidden" name="valaszid" id="valaszid">
            <input type="submit" value="Üzenet mentése" name="ment">
            <input type="button" value="Bezár mentés nélkül" onclick="megseuzenet()">
        </form>
    </div>
    <div id="uzenetszerk">
        <textarea rows="5" cols="60" maxlength="300" id="szerkszoveg" placeholder="ide jön az üzenet szövege" required></textarea><br>
        <input type="hidden" id="szerkid">
        <input type="button" value="Mentés" onclick="szerkment()"><input type="button" value="Mégse" onclick="bezar('uzenetszerk')">
    </div>
    <div id="idejonakepem" onclick="bezar('idejonakepem')"><img id="akep" src=""></div>
    <div id="menu">
        <ul>
            <li class="balra" onclick="ujuzenet(0)">Új üzenet</li>
            <li class="balra" onclick="alert('szűrés');">Szűrés az üzenetekben</li>
            <?php
                if($_SESSION['jog'] == 2){
            ?>
            <li class="balra" onclick="alert('admin');">Admin oldal </li>
            <?php
                }
            ?>
            <li class="jobbra" onclick="kilepes()">Bejelentkezett, mint <?php echo $_SESSION['nev']; ?>, kilépés</li>
        </ul>
    </div>
    <div id="hiba"><?php echo $hibauzenet; ?></div>
    <div id="tartalom">
        <?php
            $sqlmondat="SELECT * FROM uzenet WHERE valasz=0 ORDER BY ido DESC";
            $uzenetek = $kapcsolat -> query($sqlmondat);
            if ($uzenetek -> num_rows == 0){
                echo "<h2>Nincs rögzített üzenet!!!</h2>";
            } else {
                /*
                Megjelenik: 
                Fejléc: 
                    feladó, idő, ha én vagyok a feladó, akkor szerkeszt, töröl
                    ha én vagyok az admin, akkor töröl
                Üzenet tartalma:
                    szöveg, gomb a kép megjelenítésére, ha van.
                Gomb, amellyel válaszolni tudunk
                
                Ha van válasz, akkor listázza ki, mint az üzeneteket, de válaszgomb nélkül
                */
                while ($egyuzenet = $uzenetek -> fetch_assoc()){
                    // $egyuzenet['id'] $egyuzenet['felhid'] $egyuzenet['uzenet'] $egyuzenet['kep'] $egyuzenet['torolt']$egyuzenet['ido']
                    $kiir = "<div id=\"".$egyuzenet['id']."\" class=\"uzenetek\"><span class=\"cimsor\">Feladó: ".$egyuzenet['felhid']." Feladás ideje: ".$egyuzenet['ido']." - ";
                    if ($egyuzenet['felhid'] == $_SESSION['fnev']){
                        //csak akkor szerkeszt, ha nem törölt
                        if ($egyuzenet['torolt'] == 0){
                            $kiir .= "<input type=\"button\" value=\"Szerkeszt\" onclick=\"szerkeszt(".$egyuzenet['id'].")\"><input type=\"button\" value=\"Törlés\" onclick=\"torol(".$egyuzenet['id'].",'".$_SESSION['fnev']."')\"></span>";
                        }
                    } else {
                        if (($_SESSION['jog'] == 2) && ($egyuzenet['torolt'] == 0)){
                            $kiir .= "<input type=\"button\" value=\"Törlés\" onclick=\"torol(".$egyuzenet['id'].",'".$_SESSION['fnev'].",')\"></span>";
                        }
                    }
                    if ($egyuzenet['torolt'] == 0){
                        //csak akkor, ha nem törölt
                        $kiir .= "<div id=\"uz".$egyuzenet['id']."\">".$egyuzenet['uzenet']."</div>";
                        if ($egyuzenet['kep'] != ""){
                            $kiir .="<input type=\"button\" value=\"Kép megtekintése\" onclick=\"kepnezo(".$egyuzenet['id'].")\">";
                        }
                        //csak akkor, ha nem törölt
                        $kiir .= "<input type=\"button\" value=\"Válasz az üzenetre\" onclick=\"ujuzenet(".$egyuzenet['id'].")\">";
                    } else {
                        $kiir .= "<div>Törölt üzenet</div>";
                    }
                    //echo $kiir."</div>";
                    $valaszuzenetek = $kapcsolat -> query("SELECT * FROM uzenet WHERE valasz=".$egyuzenet['id']." ORDER BY ido ASC");
                    if ($valaszuzenetek -> num_rows == 0){
                        echo $kiir."</div>";
                        echo "<div class=\"cimsor\">Erre az üzenetre még nincs válasz.</div>";
                    } else {
                        $kiir .= "<input type=\"button\" id=\"gomb".$egyuzenet['id']."\" value=\"Válaszokat mutat\" onclick=\"valaszok('valasz".$egyuzenet['id']."')\">";
                        echo $kiir."</div>";
                        $kiir = "<div id=\"valasz".$egyuzenet['id']."\" class=\"valaszok\">";
                        while ($valaszuzenet = $valaszuzenetek -> fetch_assoc()){
                            //ide jönnek a válaszok
                            /*
                            Megjelenik: 
                            Fejléc: 
                                feladó, idő, ha én vagyok a feladó, akkor szerkeszt, töröl
                                ha én vagyok az admin, akkor töröl
                            Üzenet tartalma:
                                szöveg, gomb a kép megjelenítésére, ha van.
                            */
                            $kiir .= "<div id=\"".$valaszuzenet['id']."\" class=\"uzenetek\"><span class=\"cimsor\">Feladó: ".$valaszuzenet['felhid']." Feladás ideje: ".$valaszuzenet['ido']." - ";
                            if ($valaszuzenet['felhid'] == $_SESSION['fnev']){
                                //csak akkor szerkeszt, ha nem törölt
                                if ($valaszuzenet['torolt'] == 0){
                                    $kiir .= "<input type=\"button\" value=\"Szerkeszt\" onclick=\"szerkeszt(".$valaszuzenet['id'].")\"><input type=\"button\" value=\"Törlés\" onclick=\"torol(".$valaszuzenet['id'].",'".$_SESSION['fnev']."')\"></span>";
                                }
                            } else {
                                if (($_SESSION['jog'] == 2) && ($valaszuzenet['torolt'] == 0)){
                                    $kiir .= "<input type=\"button\" value=\"Törlés\" onclick=\"torol(".$valaszuzenet['id'].",'".$_SESSION['fnev'].",')\"></span>";
                                }
                            }
                            if ($valaszuzenet['torolt'] == 0){
                                //csak akkor, ha nem törölt
                                $kiir .= "<div id=\"uz".$valaszuzenet['id']."\">".$valaszuzenet['uzenet']."</div>";
                                if ($valaszuzenet['kep'] != ""){
                                    $kiir .="<input type=\"button\" value=\"Kép megtekintése\" onclick=\"kepnezo(".$valaszuzenet['id'].")\">";
                                }
                            } else {
                                $kiir .= "<div>Törölt üzenet</div>";
                            }
                            $kiir .="</div>";
                        }
                        echo $kiir."</div>";
                    }
                }
            }
        ?>
    </div>
    <?php
    }
    ?>
</body>
</html>