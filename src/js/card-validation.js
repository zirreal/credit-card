import {el} from 'redom';
import validator from 'validator';
import valid from 'card-validator';
import Card from 'card';

import mir from '../assets/img/mir.svg';
import amex from '../assets/img/american-express-card.svg';
import maestro from '../assets/img/maestro.svg';
import mastercard from '../assets/img/mastercard.svg';
import visa from'../assets/img/visa.svg';

const email = document.querySelector('.card-email');
const cardNumber = document.querySelector('.card-number');
const expirationDate = document.querySelector('.card-expiry');
const cvv = document.querySelector('.card-cvv');
const inputs = document.querySelectorAll('.card-input');
const name  = document.querySelector('.card-name');
const lastName = document.querySelector('.card-lastname');

let validInputs = [];
const reg = /^[0-9]{4}$/;
const regWords = /^[А-Яа-я/]+$/g;

const validateName = (type) => {

    type.addEventListener('keypress', (e) => {
        let value = type.value + e.key;
        console.log(value);
        if(!value.match(regWords)) {
            e.preventDefault();
        } else {
            isValid(type);
        }
    });


    type.addEventListener('blur', () => {
        if(!type.value) {
            isInvalid(type, 'Неверный формат');
        } else {
            isValid(type);
        }
    });
};

const checkAllFields = () => {
    inputs.forEach(item => {
        item.addEventListener('blur', () => {
            validInputs.filter((item, index) => {
                return validInputs.indexOf(item) === index;
            });

            if(!item.classList.contains('invalid') && item.value !== '') {
                validInputs.push(item);
            };
            if(validInputs.length === inputs.length + 1) {
                document.querySelector('.btn').disabled = false;
            } else {
                document.querySelector('.btn').disabled = true;
            }

        
        });
    });

};

const removeAllErrors = () => {
    inputs.forEach(item => {
        item.addEventListener('input', () => {
            item.classList.remove('invalid');

            if(item.parentElement.querySelector('.js-validate-error-label')) {
                item.parentElement.querySelector('.js-validate-error-label').classList.add('hide')
            }
        });
    });
    
};

const createCardTypeElement = (item, src) => {
    const block = el('div.card-type');
    const img = el('img', {alt:'card', src: src});
    block.append(img);
    item.append(block);
};

const createInvalidBlock = (item, message) => {
    const block = el('div.js-validate-error-label');
    block.textContent = message;
    item.append(block);
}

const isInvalid = (element, message) => {
    element.classList.remove('valid');
    element.nextElementSibling.classList.remove('show');
    element.classList.add('invalid')
    if(element.parentElement.querySelector('.js-validate-error-label')) {
        element.parentElement.querySelector('.js-validate-error-label').classList.remove('hide')
    } else {
        createInvalidBlock(element.parentElement, message);
    }
};

const isValid = (element) => {
    element.classList.add('valid');
    element.nextElementSibling.classList.add('show');
    element.classList.remove('invalid');
    if(element.parentElement.querySelector('.js-validate-error-label')) {
        element.parentElement.querySelector('.js-validate-error-label').classList.add('hide') 
    }
}

const showCardType = (type) => {
    switch(type) {
        case 'mir': 
            createCardTypeElement(cardNumber.parentElement, mir);
            break;
        case 'visa':
            createCardTypeElement(cardNumber.parentElement, visa);
            break; 
        case 'maestro':
            createCardTypeElement(cardNumber.parentElement, maestro);
            break; 
        case 'mastercard':
            createCardTypeElement(cardNumber.parentElement, mastercard);
            break; 
        case 'american-express':
            createCardTypeElement(cardNumber.parentElement, amex);
            break; 
    };
}

let card = new Card({
    form: 'form',
    container: '.card-wrapper',

    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    },

    messages: {
        validDate: 'valid\ndate',
        monthYear: 'мм/гггг', 
    },

    placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'ИМЯ ВЛАДЕЛЬЦА КАРТЫ',
        expiry: '••/••',
        cvc: '•••'
    },

    debug: true,
});


cardNumber.addEventListener('change', () => {
    const numberValidation = valid.number(cardNumber.value);

    if(cardNumber.parentElement.querySelector('.card-type')) {
        cardNumber.parentElement.querySelector('.card-type').remove();
    } 

    if(numberValidation.card && numberValidation.card.type !== 'mir' && document.querySelector('.jp-card').classList.contains('jp-card-mir')) {
        document.querySelector('.jp-card').classList.remove('jp-card-mir')
    }
})

cardNumber.addEventListener('blur', () => {
    const numberValidation = valid.number(cardNumber.value);

    if (!numberValidation.isPotentiallyValid) {
        isInvalid(cardNumber, 'Неверно введен номер!');
    }
      
    if (numberValidation.card && cardNumber.value.length === 19 || numberValidation.card && cardNumber.value.length === 17) {
        console.log(numberValidation.card.type);
        showCardType(numberValidation.card.type);
        isValid(cardNumber);
    } else {
        isInvalid(cardNumber, 'Неверно введен номер!');
    }
});

expirationDate.addEventListener('blur', () => {
    const expirationDateValidation = valid.expirationDate(expirationDate.value);

    if (!expirationDateValidation.isPotentiallyValid || expirationDate.value.length !== 7) {
        isInvalid(expirationDate, 'Неправильно введена дата!');
    }
      
    if (expirationDateValidation.isValid) {
        isValid(expirationDate);
    }

});

cvv.addEventListener('blur', () => {
    const cvvValidation = valid.cvv(cvv.value);

    if (cvvValidation.isPotentiallyValid) {
        // renderInvalidCardNumber();
        isInvalid(cvv, 'Неправильно введен cvc/cvv код!');
      }
      
    if (cvvValidation.isValid) {
        isValid(cvv);
      }
});

cvv.addEventListener('keypress', (e) => {
    let value = cvv.value + e.key;
    if(value.match(reg)) {
        e.preventDefault();
    }
});


email.addEventListener('blur', () => {
    const emailCheck = validator.isEmail(email.value);
    if(!emailCheck) {
        isInvalid(email, 'Неправильно введен email!');

    } else {
        isValid(email);
    }
});

checkAllFields();
removeAllErrors();
validateName(name);
validateName(lastName);

