function filterDogs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const age = card.getAttribute('data-age').toLowerCase();
        const size = card.getAttribute('data-size').toLowerCase();
        if (age.includes(searchInput) || size.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}
document.addEventListener("click", function(event) {
    let menu = document.getElementById("menu");
    let button = document.getElementById("menu-btn");
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("show");
    }
});

function showDogImage(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const imgSrc = selectedOption.getAttribute("data-img");
    const imgElement = document.getElementById("dog-image");

    if (imgSrc) {
        imgElement.src = imgSrc;
        imgElement.style.display = "inline-block";
    }
}

function hideDogImage() {
    const imgElement = document.getElementById("dog-image");
    imgElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    let username = sessionStorage.getItem("username");
    if (username) {
        document.getElementById("user-info").innerHTML = "Bejelentkezve: " + username;
    } else {
        document.getElementById("user-info").innerHTML = '<a href="bejelentkezes.html">Bejelentkezés</a>';
    }
});

function addDog(event) {
    event.preventDefault();

    const name = document.getElementById('dogName').value;
    const age = document.getElementById('dogAge').value;
    const size = document.getElementById('dogSize').value;
    const imageUrl = document.getElementById('dogImage').value;

    const container = document.getElementById('cardsContainer');

    const card = document.createElement('div');
    card.className = 'card w3-card-4';
    card.setAttribute('data-age', age);
    card.setAttribute('data-size', size.toLowerCase());

    card.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h3>${name}</h3>
        <p><span>Életkor:</span> ${age} év</p>
        <p><span>Méret:</span> ${size}</p>
        <a href="orokbefogadas.html"><button class="btn">Örökbefogadom!</button></a>
    `;

    container.appendChild(card);

    // űrlap ürítése
    document.getElementById('addDogForm').reset();
}

function megjelenit(){
    const szoveg = document.getElementById("addDogForm");
    const megjelenito = document.getElementById("megjelenito");
    const elrejto = document.getElementById("elrejto");
    if (megjelenito.onclick) {
        szoveg.style.display = 'block';
        megjelenito.style.display = 'none';
        elrejto.style.display = 'inline';
    }
}

function elrejt(){
    const szoveg = document.getElementById("addDogForm");
    const megjelenito = document.getElementById("megjelenito");
    const elrejto = document.getElementById("elrejto");
    if (elrejto.onclick) {
        szoveg.style.display = 'none';
        megjelenito.style.display = 'inline';
        elrejto.style.display = 'none';
    }
}
