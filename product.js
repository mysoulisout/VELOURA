document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("product-title");
    const modalDescription = document.getElementById("product-description");
    const modalPrice = document.getElementById("product-price");
    const closeModal = document.querySelector(".close-btn");

    const products = [
        { name: "Ryna Kurung", description: "Soft pastel tones", price: 150, category: "baju kurung", image: "bajukurung.jpg" },
        { name: "Abaya Ruby", description: "Luxurious black with golden embroidery", price: 189, category: "abaya", image: "abaya.jpg" },
        { name: "Tudung Clara", description: "Lightweight, breathable fabric", price: 30, category: "hijabs", image: "hijab.jpg" },
        { name: "Sportswear Set", description: "Activewear for modest women", price: 120, category: "sportswear", image: "sportswear.jpg" },
        { name: "Dress Aira", description: "Perfect for special occasions", price: 200, category: "dress", image: "dress.jpg" },
        { name: "Inners", description: "Comfortable undershirts", price: 25, category: "inners", image: "inners.jpg" }
    ];

    function renderProducts(filteredProducts) {
        productList.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>RM ${product.price.toFixed(2)}</p>
            </div>
        `).join("");

        document.querySelectorAll(".product-card").forEach(card => {
            card.addEventListener("click", () => {
                const product = products.find(p => p.name === card.querySelector("h3").textContent);
                openModal(product);
            });
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            const filtered = category === "all" ? products : products.filter(p => p.category === category);
            renderProducts(filtered);
        });
    });

    function openModal(product) {
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = product.price.toFixed(2);
        modal.classList.remove("hidden");
    }

    // Close Modal
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Initial Render
    renderProducts(products);
});
