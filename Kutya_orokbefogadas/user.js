document.addEventListener("DOMContentLoaded", () => {
            // Megjelenítés: Bejelentkezett felhasználó
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.firstname) {
                document.getElementById("user-info").textContent = `Bejelentkezve: ${user.sirname}`;
            }
        
            // Regisztrációs űrlap kezelése
            const form = document.querySelector("form");
            if (form) {
                form.addEventListener("submit", function(e) {
                    e.preventDefault(); // Ne küldje be a PHP oldalnak
        
                    const firstname = document.getElementById("firstname").value;
                    const sirname = document.getElementById("sirname").value;
                    const email = document.getElementById("email").value;
                    const phone = document.getElementById("phone").value;
                    const address = document.getElementById("address").value;
                    const password1 = document.getElementById("password1").value;
                    const resetpassword = document.getElementById("resetpassword").value;
        
                    if (password1 !== resetpassword) {
                        alert("A jelszavak nem egyeznek!");
                        return;
                    }
        
                    const userData = {
                        firstname,
                        sirname,
                        email,
                        phone,
                        address,
                        password: password1
                    };
        
                    localStorage.setItem("user", JSON.stringify(userData));
        
                    alert("Sikeres regisztráció!");
                    window.location.href = "main.html"; // Átirányítás főoldalra
                });
            }
        });