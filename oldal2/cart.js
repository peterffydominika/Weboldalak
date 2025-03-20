// A kosár adatokat tároljuk a localStorage-ban
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Kosár tartalom betöltése
function loadCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    // Kosár tartalmának listázása
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} - ${item.price}</span>
            <button class="remove" data-index="${index}">Eltávolítás</button>
        `;
        cartItemsList.appendChild(li);
        totalPrice += parseFloat(item.price.replace(' Ft', ''));
    });

    // Összesített ár frissítése
    totalAmount.textContent = `${totalPrice} Ft`;

    // Eltávolítás gombok kezelése
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1); // Termék eltávolítása
            localStorage.setItem('cart', JSON.stringify(cart)); // Frissített kosár mentése
            loadCart(); // Kosár újratöltése
        });
    });
}

// Pénztár gomb kezelése
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('A kosár üres!');
    } else {
        alert('Köszönjük a vásárlást!');
        localStorage.removeItem('cart'); // Kosár ürítése
        loadCart(); // Kosár frissítése
    }
});

// Kosár betöltése az oldal betöltődésekor
window.onload = loadCart;
