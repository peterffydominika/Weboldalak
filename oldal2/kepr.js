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




// Regisztráció
function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (!username || !password) {
        alert('Kérlek tölts ki minden mezőt!');
        return;
    }

    if (localStorage.getItem(username)) {
        alert('Ez a felhasználónév már létezik!');
        return;
    }

    localStorage.setItem(username, JSON.stringify({ password }));
    alert('Sikeres regisztráció!');
}

// Bejelentkezés
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = JSON.parse(localStorage.getItem(username));

    if (!user || user.password !== password) {
        alert('Hibás felhasználónév vagy jelszó!');
        return;
    }

    sessionStorage.setItem('loggedInUser', username);
    showWelcome();
}

// Kijelentkezés
function logout() {
    sessionStorage.removeItem('loggedInUser');
    document.getElementById('auth-forms').style.display = 'flex';
    document.getElementById('welcome-message').style.display = 'none';
}

// Felhasználó megjelenítése
function showWelcome() {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
        document.getElementById('auth-forms').style.display = 'none';
        document.getElementById('welcome-message').style.display = 'block';
        document.getElementById('logged-user').innerText = user;
    }
}

// Automatikus betöltésnél ellenőrzés
document.addEventListener('DOMContentLoaded', showWelcome);




}
 
