function proba(){
    var adatok = FormData();
    adatok.append('vnev',adat);

    var hivas = new XMLHttpRequest();
    hivas.open("POST","a script",true);
    hivas.onreadystatechange = function(){
        if (hivas.readyState == 4 && hivas.status == 200){
            var valasz = hivas.responseText;
        }
    }
    hivas.send(adatok);
}