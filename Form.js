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

Form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    if (!validateForm()) return; 

    if(localStorage.getItem(emailField.value) === "submitted"){
        alert("This email has already submitted a response. You can only submit one response per email.");
    }
    else{
        localStorage.setItem(emailField.value, "submitted");
        Form.style.display = "none";  
        thankYouMessage.style.display = "block"; 
    }
});

submitAnotherButton.addEventListener("click", function () {
    localStorage.removeItem(emailField.value);
    Form.reset();
    thankYouMessage.style.display = "none"; 
    Form.style.display = "block";
});

clearButton.addEventListener("click", function() {
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
    console.log(field.value);
    if (field.value === ""|| field.value === null) {
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
    document.querySelectorAll(".error").forEach(error => error.textContent = "");
    document.querySelectorAll("input, select").forEach(field => {
        field.classList.remove("valid", "invalid");
    });
}
