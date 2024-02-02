//OBSOLETE

const normalTextArea = document.getElementById('normal');
const encryptedTextArea = document.getElementById('encriptado');
const button = document.querySelector('.btn');
const errorDiv = document.getElementById('error_message');


function decrypt(text) {
    text = text.replace(/enter/g, "e");
    text = text.replace(/imes/g, "i");
    text = text.replace(/ai/g, "a");
    text = text.replace(/ober/g, "o");
    text = text.replace(/ufat/g, "u");

    return text;
}


function encrypt(text) {
    text = text.replace(/e/g, "enter");
    text = text.replace(/i/g, "imes");
    text = text.replace(/a/g, "ai");
    text = text.replace(/o/g, "ober");
    text = text.replace(/u/g, "ufat");

    return text;
}

function handleClick() {
    if (clearButtonDisplayed()) {
        clearTextArea(normalTextArea);
        clearTextArea(encryptedTextArea);
        handleInput();
    } else if (hasText(normalTextArea)) {
        const normalTextAreaValue = normalTextArea.value;

        if (!isValidString(normalTextAreaValue)) {
            displayInvalidText();
            return;
        }

        displayInTextArea(encryptedTextArea, encrypt(normalTextAreaValue));
        handleInput();
    } else if (hasText(encryptedTextArea)) {
        const encryptedTextAreaValue = encryptedTextArea.value;

        if (!isValidString(encryptedTextAreaValue)) {
            displayInvalidText();
            return;
        }

        displayInTextArea(normalTextArea, decrypt(encryptedTextAreaValue));
        handleInput();
    }

}

function handleInput() {

    if (invalidTextDisplayed()) {
        hideInvalidText();
    }

    if (!hasText(normalTextArea) && !hasText(encryptedTextArea)) {
        disableButton(button);
    } else if (hasText(normalTextArea) && !hasText(encryptedTextArea)) {
        button.removeAttribute('disabled');
        button.innerHTML = '&#8680;'; //right arrow symbol
    } else if (!hasText(normalTextArea) && hasText(encryptedTextArea)) {
        button.removeAttribute('disabled');
        button.innerHTML = '&#8678;'; //left arrow symbol
    } else {
        //both contain text
        //disableButton(button);
        button.innerHTML = '&#10006;'; //clear symbol
    }


}


function hasText(textarea) {
    return textarea.value.length > 0;
}

function disableButton(button) {
    button.setAttribute('disabled', true);
    button.innerHTML = '';
}

function isValidString(inputString) {
    const pattern = /^[a-z0-9\s.,!?]+$/;
    return pattern.test(inputString);
}

function displayInvalidText() {
    errorDiv.innerHTML = 'Invalid text';
}

function hideInvalidText() {
    errorDiv.innerHTML = '';
}

function clearButtonDisplayed() {
    return hasText(normalTextArea) && hasText(encryptedTextArea);
}

function clearTextArea(textArea) {
    textArea.value = '';
}

function displayInTextArea(textArea, value) {
    textArea.value = value;
}

function invalidTextDisplayed() {
    return errorDiv.textContent != '';
}