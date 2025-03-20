// Kosárba helyezés
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Termékek hozzáadása a kosárhoz
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productItem = e.target.closest('.product-item');
        const productName = productItem.querySelector('h2').textContent;
        const productPrice = productItem.querySelector('p').textContent;

        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart)); // Kosár mentése a localStorage-ba
    });
});

// Kosár frissítése
function updateCart() {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);
    });
}

// Pénztár gomb
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('A kosár üres!');
    } else {
        alert('Köszönjük a vásárlást!');
        cart = [];
        updateCart();
    }
});

function searchComics() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        let text = product.innerText.toLowerCase();
        if (text.includes(input)){
            product.style.display= "";
        }
        else{
            product.style.display = "none";
        }
    });
}
 