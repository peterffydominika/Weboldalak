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