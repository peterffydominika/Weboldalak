window.onload = function () {
    betoltKutyak();
};

function betoltKutyak() {
    const dogs = JSON.parse(localStorage.getItem("dogs")) || [];
    dogs.forEach(kutya => ujKartyaHozzaadasa(kutya));
}

function addDog(event) {
    event.preventDefault();

    const nev = document.getElementById("dogName").value;
    const eletkor = document.getElementById("dogAge").value;
    const meret = document.getElementById("dogSize").value;
    const kepUrl = document.getElementById("dogImage").value;

    const ujKutya = { nev, eletkor, meret, kepUrl };

    // Mentés localStorage-ba
    const dogs = JSON.parse(localStorage.getItem("dogs")) || [];
    dogs.push(ujKutya);
    localStorage.setItem("dogs", JSON.stringify(dogs));

    // Kártya hozzáadása a DOM-hoz
    ujKartyaHozzaadasa(ujKutya);

    // Form ürítése
    document.getElementById("addDogForm").reset();
    elrejt();
}

function ujKartyaHozzaadasa(kutya) {
    const kartya = document.createElement("div");
    kartya.className = "card w3-card-4";
    kartya.setAttribute("data-age", kutya.eletkor);
    kartya.setAttribute("data-size", kutya.meret.toLowerCase());

    kartya.innerHTML = `
        <img src="${kutya.kepUrl}" alt="${kutya.nev}">
        <h3>${kutya.nev}</h3>
        <p><span>Életkor:</span> ${kutya.eletkor} év</p>
        <p><span>Méret:</span> ${kutya.meret}</p>
        <a href="orokbefogadas.html" class="w3-margin-bottom">
            <button class="btn">Örökbefogadom!</button>
        </a>
        <button onclick="kartyaModositasa(this)">Szerkesztés</button>
        <button onclick="kartyaTorlese(this)">Törlés</button>
    `;

    document.getElementById("cardsContainer").appendChild(kartya);
}

function kartyaTorlese(gomb) {
    const kartya = gomb.closest(".card");
    const nev = kartya.querySelector("h3").innerText;
    if (confirm(`Biztosan törölni szeretnéd ${nev} kártyáját?`)) {
        // Törlés localStorage-ból
        let dogs = JSON.parse(localStorage.getItem("dogs")) || [];
        dogs = dogs.filter(k => k.nev !== nev);
        localStorage.setItem("dogs", JSON.stringify(dogs));

        // Törlés a DOM-ból
        kartya.remove();
    }
    
}

function kartyaModositasa(button) {
    const card = button.closest('.card');
    const name = card.querySelector('h3');
    const age = card.querySelectorAll('p')[0];
    const size = card.querySelectorAll('p')[1];

    const newName = prompt("Új név:", name.textContent);
    const newAge = prompt("Új életkor (év):", age.textContent.match(/\d+/)[0]);
    const newSize = prompt("Új méret (Kicsi, Közepes, Nagy):", size.textContent.split(':')[1].trim());

    if (newName && newAge && newSize) {
        name.textContent = newName;
        age.innerHTML = `<span>Életkor:</span> ${newAge} év`;
        size.innerHTML = `<span>Méret:</span> ${newSize}`;
        card.setAttribute('data-age', newAge);
        card.setAttribute('data-size', newSize.toLowerCase());
    }
}

function megjelenit() {
    document.getElementById("addDogForm").style.display = "block";
    document.getElementById("elrejto").style.display = "inline";
    document.getElementById("megjelenito").style.display = "none";
}

function elrejt() {
    document.getElementById("addDogForm").style.display = "none";
    document.getElementById("megjelenito").style.display = "inline";
    document.getElementById("elrejto").style.display = "none";
}

function filterDogs() {
    const szuro = document.getElementById("searchInput").value.toLowerCase();
    const kartyak = document.querySelectorAll(".card");

    kartyak.forEach(kartya => {
        const kor = kartya.getAttribute("data-age");
        const meret = kartya.getAttribute("data-size");
        const lathato = kor.includes(szuro) || meret.includes(szuro);
        kartya.style.display = lathato ? "block" : "none";
    });
}