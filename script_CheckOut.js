document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".progress-indicator .step");
    const formSection = document.querySelector(".form-section");
    const orderItem = document.getElementById("order-item");
    const shippingSummary = document.getElementById("shipping-summary");
    let shippingDetails = null;

    const sections = {
        Account: `
            <h2>Account Details</h2>
            <form id="account-form">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" placeholder="Email@example.com" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
                <button type="button" id="proceed-to-shipping">Proceed to Shipping</button>
            </form>
        `,
        Shipping: `
            <h2>Shipping Details</h2>
            <form id="shipping-form">
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" placeholder="Enter your address" required>
                <label for="city">City:</label>
                <input type="text" id="city" name="city" placeholder="Enter your city" required>
                <label for="postcode">Postcode:</label>
                <input type="text" id="postcode" name="postcode" placeholder="Enter your postcode" required>
                <button type="button" id="proceed-to-payment">Proceed to Payment</button>
            </form>
        `,
        Payment: `
            <h2>Payment Details</h2>
            <form id="payment-form">
                <label for="card-name">Name on Card:</label>
                <input type="text" id="card-name" name="card-name" placeholder="Cardholder Name" required>
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9101 1121" required>
                <label for="expiry-date">Expiry Date:</label>
                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" required>
                <label for="cvc">CVC:</label>
                <input type="text" id="cvc" name="cvc" placeholder="123" required>
                <button type="submit" id="complete-payment">Complete Payment</button>
            </form>
        `
    };

    function activateStep(stepName) {
        steps.forEach(step => {
            step.classList.remove("active");
            if (step.textContent === stepName) {
                step.classList.add("active");
            }
        });
        formSection.innerHTML = sections[stepName];
        attachEventListeners(stepName);
    }

    function attachEventListeners(stepName) {
        if (stepName === "Account") {
            document.getElementById("proceed-to-shipping").addEventListener("click", () => {
                activateStep("Shipping");
            });
        } else if (stepName === "Shipping") {
            document.getElementById("proceed-to-payment").addEventListener("click", () => {
                const address = document.getElementById("address").value;
                const city = document.getElementById("city").value;
                const postcode = document.getElementById("postcode").value;

                if (address && city && postcode) {
                    shippingDetails = `${address}, ${postcode} ,${city}`;
                    shippingSummary.textContent = shippingDetails;
                    alert("Shipping details saved successfully!");
                    activateStep("Payment");
                } else {
                    alert("Please fill in all fields.");
                }
            });
        } else if (stepName === "Payment") {
            document.getElementById("payment-form").addEventListener("submit", (e) => {
                e.preventDefault();
                alert("Payment completed successfully!");
                document.body.innerHTML = `
                    <div class="order-confirmation">
                        <h2>Order Confirmation</h2>
                        <p>Your order has been successfully received.</p>
                        <p>Order Details:</p>
                        <ul>
                            <li>Item: Ryna Kurung, Abaya Ruby</li>
                            <li>Price: RM 339.00</li>
                            <li>Shipping: ${shippingDetails}</li>
                        </ul>
                        <p>Thank you for shopping with us!</p>
                    </div>
                `;
            });
        }cancelOrderButton.addEventListener("click", () => {
        orderItem.summary.style.display = "none";
        totalAmount.textContent = "RM 0.00";
        alert("Order has been canceled.");
    });
}

    activateStep("Account");
});
