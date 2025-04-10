function kozepre(mit){
    var x = window.innerWidth;
    var y = window.innerHeight;
    var ablakx = document.getElementById(mit).offsetWidth;
    var ablaky = document.getElementById(mit).offsetHeight;
    document.getElementById(mit).style.left = ((x - ablakx) / 2) + "px";
    document.getElementById(mit).style.top = ((y - ablaky) / 2) + "px";
}

function init(){
    kozepre('bejelentkezes');
    kozepre('regisztracio');
}

function bejel(){
    var emailminta = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (document.getElementById('bejeljelszo').value == ""){
        alert("Hiányzik a jelszó!");
    } else {
        if (document.getElementById('bejelfnev').value != "" && emailminta.test(document.getElementById('bejelfnev').value.toLowerCase())){
            var adatok = new FormData();
            adatok.append('fnev',document.getElementById('bejelfnev').value);
            adatok.append('pwd',document.getElementById('bejeljelszo').value);
            var request = new XMLHttpRequest();
            request.open("POST","./bejelentkezes.php", true);
            request.onreadystatechange = function(){
                if (request.readyState == 4 && request.status == 200){
                    valasz = request.responseText;
                    if (valasz == "ok"){
                        location.reload(true);
                    } else {
                        alert(valasz);
                    }
                }
            }
            request.send(adatok);
        } else {
            alert("Hibás e-mail cím!");
        }
    }
}

function kilepes(){
    if(confirm("Biztosan ki akar hjelentkezni?") == true){
        var request = new XMLHttpRequest();
        request.open("GET","./kijelentkezes.php", true);
        request.onreadystatechange = function(){
            valasz = request.responseText;
            location.reload(true);
        }
        request.send();
    }
}

function regiszt(){
    document.getElementById('bejelfnev').value = "";
    document.getElementById('bejeljelszo').value = "";
    document.getElementById('bejelentkezes').style.display = "none";
    document.getElementById('regisztracio').style.display = "block";
    kozepre('regisztracio');
}

function megsereg(){
    //regnev regfnev regjelszo1 regjelszo2
    document.getElementById('regnev').value = "";
    document.getElementById('regfnev').value = "";
    document.getElementById('regjelszo1').value = "";
    document.getElementById('regjelszo2').value = "";
    document.getElementById('regisztracio').style.display = "none";
    document.getElementById('bejelentkezes').style.display = "block";
    kozepre('bejelentkezes');
}

function regisztracio(){
    var emailminta = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nagybetu = /^(.*[A-Z].*)$/;
    var kisbetu = /^(.*[a-z].*)$/;
    var szam = /^(.*[0-9].*)$/;
    var speckar = /^(.*[%+!].*)$/;
    if (document.getElementById('regfnev').value != "" && emailminta.test(document.getElementById('regfnev').value.toLowerCase())){
        if (document.getElementById('regnev').value == "") {
            alert("Üres a név mező!");
        } else {
            if (document.getElementById('regjelszo1').value == document.getElementById('regjelszo2').value){
                var jelszo = document.getElementById('regjelszo1').value;
                if (nagybetu.test(jelszo) && kisbetu.test(jelszo) && szam.test(jelszo) && speckar.test(jelszo)){
                    /*
                    ide jön a regisztráció
                    1. az email cím már létezik
                    2. sikerült-e a művelet
                    */
                   var adatok = new FormData();
                   adatok.append('fnev',document.getElementById('regfnev').value);
                   adatok.append('nev',document.getElementById('regnev').value);
                   adatok.append('pwd',document.getElementById('regjelszo1').value);
                   var request = new XMLHttpRequest();
                   request.open("POST","./regisztracio.php", true);
                   request.onreadystatechange = function(){
                    if (request.readyState == 4 && request.status == 200){
                        valasz = request.responseText;
                        if (valasz == "ok") location.reload(true);
                        if (valasz == "nememail") alert("Ez az e-mail cím már létezik");
                        if (valasz == "dbhiba") alert("Nem sikerült rögzíteni");
                    }
                   }
                   request.send(adatok);
                } else {
                    alert("A jelszó valamit nem tartalmaz...");
                }
            } else {
                alert("A 2 jelszó nem egyezik meg!");
            }
        }
    } else {
        alert("Az e-mail cím nem megfelelő!");
    }
}

function megseuzenet(){
    document.getElementById('ujuzenet').style.display = "none";
}

function ujuzenet(valasz){
    document.getElementById('valaszid').value = valasz;
    document.getElementById('ujuzenet').style.display = "block";
    kozepre('ujuzenet');
}

function szerkeszt(uzid){
    document.getElementById('szerkid').value = uzid;
    document.getElementById('szerkszoveg').value = document.getElementById('uz'+uzid).innerHTML;
    document.getElementById('uzenetszerk').style.display = "block";
    kozepre('uzenetszerk');
}

function szerkment(){
    var adatok = new FormData();
    adatok.append('id',document.getElementById('szerkid').value);
    adatok.append('szoveg', document.getElementById('szerkszoveg').value);
    var request = new XMLHttpRequest();
    request.open("POST","./szerkment.php", true);
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            valasz = request.responseText;
            if (valasz == "ok"){
                location.reload(true);
            } else {
                document.getElementById('hiba').innerHTML = valasz;
            }
        }
    }
    request.send(adatok);
}

function torol(uzid,fnev){
    alert(uzid+" - "+fnev);
    var adatok = new FormData();
    adatok.append("id", uzid);
    adatok.append('fnev', fnev);
    var request = new XMLHttpRequest();
    request.open("POST","./uzenettorol.php", true);
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            valasz = request.responseText;
            if (valasz == "ok"){
                location.reload(true);
            } else {
                document.getElementById('hiba').innerHTML = valasz;
            }
        }
    }
    request.send(adatok);
}

function kepnezo(uzid){
    var request = new XMLHttpRequest();
    request.open("GET","./kepnezo.php?id="+uzid, true);
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            document.getElementById('akep').setAttribute('src', request.responseText);
            document.getElementById('idejonakepem').style.display = "block";
            document.getElementById('idejonakepem').style.width = document.getElementById('akep').clientWidth+"px";
            document.getElementById('idejonakepem').style.height = document.getElementById('akep').clientHeight+"px";
            kozepre('idejonakepem');
        }
    }
    request.send();
}

function valaszok(mit){
    if (document.getElementById(mit).style.display == "block"){
        document.getElementById(mit).style.display = "none";
        document.getElementById('gomb'+mit.substring(6)).value="Válaszokat mutat";
    } else{
        document.getElementById(mit).style.display = "block";
        document.getElementById('gomb'+mit.substring(6)).value="Válaszokat elrejt";
    }   
}

function bezar(mit){
    document.getElementById(mit).style.display = "none";
}