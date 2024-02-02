const normalTextArea = document.getElementById('normal');
const encryptedTextArea = document.getElementById('encriptado');
const button = document.querySelector('.btn');
const errorDiv = document.getElementById('error_message');

let arrowDirection = '';

function handleClick() {

    if (arrowDirection == 'right') {
        const normalTextAreaValue = normalTextArea.value;

        if (!isValidString(normalTextAreaValue)) {
            displayInvalidText();
            return;
        }

        displayInTextArea(encryptedTextArea, encrypt(normalTextAreaValue));
    }

    if (arrowDirection == 'left') {
        const encryptedTextAreaValue = encryptedTextArea.value;

        if (!isValidString(encryptedTextAreaValue)) {
            displayInvalidText();
            return;
        }

        displayInTextArea(normalTextArea, decrypt(encryptedTextAreaValue));
    }

}

function handleClickCopyNormal(){
    const copyNormalBtn = document.getElementById('copy_normal_btn');
    navigator.clipboard.writeText(normalTextArea.value);
    copyNormalBtn.innerHTML = 'Copied';
    setTimeout(() => {
        copyNormalBtn.innerHTML = 'Copy';
    }, 2000);

}

function handleClickCopyEncrypted(){
    const copyEncryptedBtn = document.getElementById('copy_encrypted_btn');
    navigator.clipboard.writeText(encryptedTextArea.value);
    copyEncryptedBtn.innerHTML = 'Copied';
    setTimeout(() => {
        copyEncryptedBtn.innerHTML = 'Copy';
    }, 2000);
}

function handleNormalInput() {
    if (invalidTextDisplayed()) {
        hideInvalidText();
    }
    enableButton('right');
    arrowDirection = 'right';
}

function handleEncryptedInput() {
    if (invalidTextDisplayed()) {
        hideInvalidText();
    }
    enableButton('left');
    arrowDirection = 'left';
}

function encrypt(text) {
    text = text.replace(/e/g, "enter");
    text = text.replace(/i/g, "imes");
    text = text.replace(/a/g, "ai");
    text = text.replace(/o/g, "ober");
    text = text.replace(/u/g, "ufat");

    return text;
}

function decrypt(text) {
    text = text.replace(/enter/g, "e");
    text = text.replace(/imes/g, "i");
    text = text.replace(/ai/g, "a");
    text = text.replace(/ober/g, "o");
    text = text.replace(/ufat/g, "u");

    return text;
}

function enableButton(direction) {
    if (direction == 'right') {
        button.removeAttribute('disabled');
        button.innerHTML = '&#8680;';
    } else if (direction == 'left') {
        button.removeAttribute('disabled');
        button.innerHTML = '&#8678;';
    } else {
        throw new Error('only right or left accepted');
    }

}

function isValidString(inputString) {
    /* const pattern = /^[a-z0-9\s.,!?]+$/; */
    /* const pattern = /[0-9a-z]+$/; */
    const pattern = /^[a-z0-9\s]+$/;
    return pattern.test(inputString);
}

function displayInTextArea(textArea, value) {
    textArea.value = value;
}

function displayInvalidText() {
    errorDiv.innerHTML = 'Invalid text';
}

function invalidTextDisplayed() {
    return errorDiv.textContent != '';
}

function hideInvalidText() {
    errorDiv.innerHTML = '';
}