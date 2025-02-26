const Form = document.getElementById("Form");
const nameField = document.getElementById("Name");
const idField = document.getElementById("BITS_ID");
const emailField = document.getElementById("email");
const sizeGroup = document.getElementsByName("size"); 
const hostelField = document.getElementById("Hostel");
const clearButton = document.getElementById("clearForm");
const thankYouMessage = document.getElementById("thankYouMessage");
const submitAnotherButton = document.getElementById("submitAnother");
const nameError = document.getElementById("nameError");
const idError = document.getElementById("idError");
const emailError = document.getElementById("emailError");
const sizeError = document.getElementById("sizeError");
const hostelError = document.getElementById("hostelError");
const termsCheckbox = document.getElementById("checkbox");
const phoneField = document.getElementById("Phone_number");
const numberError = document.getElementById("numberError");


const submittedEmails = JSON.parse(localStorage.getItem("submittedEmails")) || [];

Form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        const email = emailField.value.trim();

        if (submittedEmails.includes(email)) {
            alert("This email has already submitted a response.");
        } else {
            submittedEmails.push(email);
            localStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));

            Form.style.display = "none"; 
            thankYouMessage.style.display = "block"; 
        }
    }
});


submitAnotherButton.addEventListener("click", function () {
    Form.reset();
    clearValidation();
    Form.style.display = "block"; 
    thankYouMessage.style.display = "none"; 
});


clearButton.addEventListener("click", function () {
    Form.reset();
    clearValidation();
});


function validateForm() {
    let isValid = true;
    isValid = validateField(nameField, nameError, "Please fill this field.") && isValid;
    isValid = validateField(idField, idError, "Please fill this field.") && isValid;
    isValid = validateEmail(emailField, emailError) && isValid;
    isValid = validateHostel(hostelField, hostelError) && isValid;
    isValid = validateSize(sizeGroup, sizeError) && isValid;
    isValid = validateTerms(termsCheckbox) && isValid;
    isValid = validatePhone(phoneField, numberError) && isValid;
    return isValid;
}


function validateField(field, errorElement, message) {
    if (field.value.trim() === "") {
        showError(field, errorElement, message);
        return false;
    } else {
        showValid(field, errorElement);
        return true;
    }
}


function validateEmail(field, errorElement) {
    if (field.value.trim() === "") {
        showError(field, errorElement, "Please fill this field.");
        return false;
    } else if (!field.value.endsWith("@pilani.bits-pilani.ac.in")) {
        showError(field, errorElement, "Only Bits email addresses are allowed!");
        return false;
    } else {
        showValid(field, errorElement);
        return true;
    }
}


function validatePhone(field, errorElement) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(field.value.trim())) {
        showError(field, errorElement, "Enter a valid 10-digit phone number.");
        return false;
    } else {
        showValid(field, errorElement);
        return true;
    }
}


function validateSize(group, errorElement) {
    for (let i = 0; i < group.length; i++) {
        if (group[i].checked) {
            errorElement.textContent = "";
            return true;
        }
    }
    errorElement.textContent = "Please select a size.";
    return false;
}


function validateHostel(field, errorElement) {
    if (field.value === "" || field.value === null) {
        showError(field, errorElement, "Please select your hostel.");
        return false;
    } else {
        showValid(field, errorElement);
        return true;
    }
}


function validateTerms(checkbox) {
    if (!checkbox.checked) {
        alert("You must agree to the Terms & Conditions.");
        checkbox.classList.add("invalid");
        return false;
    }
    checkbox.classList.remove("invalid");
    return true;
}


function showError(field, errorElement, message) {
    if (field) {
        field.classList.add("invalid");
        field.classList.remove("valid");
    }
    errorElement.textContent = message;
}


function showValid(field, errorElement) {
    if (field) {
        field.classList.add("valid");
        field.classList.remove("invalid");
    }
    errorElement.textContent = "";
}


function clearValidation() {
    document.querySelectorAll(".error").forEach((error) => (error.textContent = ""));
    document.querySelectorAll("input, select").forEach((field) => {
        field.classList.remove("valid", "invalid");
    });
}
let currentIndex = 0;
    const slides = document.querySelectorAll(".cr .img");
    const totalSlides = slides.length;
    const slideContainer = document.querySelector(".cr");

    function showSlide(index) {
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        slideContainer.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
    }

    document.querySelector(".next").addEventListener("click", function () {
        event.preventDefault(); 
        showSlide(currentIndex + 1);
    });

    document.querySelector(".prev").addEventListener("click", function () {
        event.preventDefault(); 
        showSlide(currentIndex - 1);
    });

    showSlide(currentIndex);
