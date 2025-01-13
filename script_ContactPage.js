document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageText = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    nameInput.addEventListener("input", () => {
        const nameRegex = /^[a-zA-Z\- ]+$/;
        if (!nameInput.value.trim()) {
            nameError.textContent = "Name is required.";
        } else if (!nameRegex.test(nameInput.value)) {
            nameError.textContent = "Name can only contain letters, spaces, and hyphens.";
        } else {
            nameError.textContent = "";
        }
    });

    emailInput.addEventListener("input", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
        } else {
            emailError.textContent = "";
        }
    });

    messageText.addEventListener("input", () => {
        if (!messageText.value.trim()) {
            messageError.textContent = "Message is required.";
        } else {
            messageError.textContent = "";
        }
    });

    form.addEventListener("submit", handleSubmit);

    async function handleSubmit(event) {
        event.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageText.value;

        if (nameError.textContent || emailError.textContent || messageError.textContent) {
            successMessage.textContent = "Please fix errors before submitting.";
            return;
        }

        try {
            const anyMessage = await submitForm(name, email, message);
            successMessage.style.color = "green";
            successMessage.textContent = anyMessage;
            form.reset(); 
        } catch (error) {
            successMessage.style.color = "red";
            successMessage.textContent = error;
        }
    }

    async function submitForm(name, email, message) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && message) {
                    resolve("Form submitted successfully!");
                } else {
                    reject("Form submission failed.");
                }
            }, 2000);
        });
    }
});
