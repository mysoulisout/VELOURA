document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cartModal = document.querySelector("#cart-modal");
    const cartItems = document.querySelector("#cart-items");
    const cartIcon = document.querySelector("#cart-icon");
    const cartCount = document.querySelector("#cart-count");
    const closeCart = document.querySelector("#close-cart");
    const checkoutBtn = document.querySelector("#checkout-btn");

    const products = [
        { name: "Ryna Kurung", description: "Soft pastel tones", price: 150, category: "baju kurung", image: "bajukurung.jpeg" },
        { name: "Abaya Ruby", description: "Luxurious black with golden embroidery", price: 189, category: "abaya", image: "abaya.jpg" },
        { name: "Tudung Clara", description: "Lightweight, breathable fabric", price: 30, category: "hijabs", image: "hijab.jpg" },
        { name: "Sportswear Set", description: "Activewear for modest women", price: 120, category: "sportswear", image: "sportswear.jpg" },
        { name: "Dress Aira", description: "Perfect for special occasions", price: 200, category: "dress", image: "dress.jpg" },
        { name: "Inners", description: "Comfortable undershirts", price: 25, category: "inners", image: "inners.jpg" }
    ];

    const cart = [];

    function renderProducts(filteredProducts) {
        productList.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>RM ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
            </div>
        `).join("");
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function renderCart() {
        cartItems.innerHTML = cart.map(item => `
            <div>
                <p>${item.name} - RM ${item.price.toFixed(2)}</p>
            </div>
        `).join("");
    }

    productList.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const productName = e.target.dataset.name;
            const product = products.find(p => p.name === productName);

            cart.push(product);
            updateCartCount();
            alert("Added to cart!");
        }
    });

    cartIcon.addEventListener("click", () => {
        renderCart();
        cartModal.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    checkoutBtn.addEventListener("click", () => {
        window.location.href = "checkout.html"; // Redirect to the checkout page
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            const filtered = category === "all" ? products : products.filter(p => p.category === category);
            renderProducts(filtered);
        });
    });

    renderProducts(products);
});
