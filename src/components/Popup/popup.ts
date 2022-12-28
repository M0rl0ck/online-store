import './popup.css';
import { createHtmlElement } from '../../utils/createElement';
const payment = require('payment');

export default class Popup {
  popupContentWrap: HTMLElement;
  popupForm: HTMLElement;
  constructor() {
    this.popupContentWrap = createHtmlElement('div', 'popup__content-wrap');
    const popupContent = createHtmlElement('div', 'popup__content', '', this.popupContentWrap);
    this.popupForm = createHtmlElement('form', 'popup__form', '', popupContent);
    const personalDetails = createHtmlElement('div', 'personal__details', '', this.popupForm);
    const personalDetailsTitle = createHtmlElement('h2', 'personal__details-title', 'Personal details', personalDetails);
    const personalName = createHtmlElement('div', 'personal__item', '', personalDetails);
    const nameLabel = createHtmlElement('span', 'item__label', 'Name:', personalName);
    const nameInput = createHtmlElement('input', 'item__input', '', personalName);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Nick Borisov');
    nameInput.setAttribute('required', '');
    nameInput.setAttribute('pattern', `[A-Za-zА-Яа-яЁё0-9-]{3,}\\s[A-Za-zА-Яа-яЁё0-9-]{3,}`);
    const ErrorMessageName = createHtmlElement('span', 'error__message', 'Invalid name', personalName);
    if (!(nameInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    nameInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!nameInput.validity.valid) {
        ErrorMessageName.classList.toggle('active');
      }
    });
    nameInput.addEventListener('input', function () {
      if (ErrorMessageName.classList.contains('active')) {
        ErrorMessageName.classList.toggle('active');
      }
    });
    nameInput.addEventListener('blur', function () {
      if (!nameInput.validity.valid) {
        ErrorMessageName.classList.toggle('active');
      }
    });
    const personalPhone = createHtmlElement('div', 'personal__item', '', personalDetails);
    const phoneLabel = createHtmlElement('span', 'item__label', 'Phone:', personalPhone);
    const phoneInput = createHtmlElement('input', 'item__input', '', personalPhone);
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('placeholder', '+15852826894');
    phoneInput.setAttribute('required', '');
    phoneInput.setAttribute('pattern', `[+][0-9]{9,}`);
    const ErrorMessagePhone = createHtmlElement('span', 'error__message', 'Invalid phone', personalPhone);

    if (!(phoneInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    phoneInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!phoneInput.validity.valid) {
        ErrorMessagePhone.classList.toggle('active');
      }
    });
    phoneInput.addEventListener('input', function () {
      if (ErrorMessagePhone.classList.contains('active')) {
        ErrorMessagePhone.classList.toggle('active');
      }
    });
    phoneInput.addEventListener('blur', function () {
      if (!phoneInput.validity.valid) {
        ErrorMessagePhone.classList.toggle('active');
      }
      if (phoneInput.value === '+') {
        phoneInput.value += '';
      }
    });
    phoneInput.addEventListener('focus', function () {
      if (phoneInput.value === '') {
        phoneInput.value += '+';
      }
    });

    const personalAddress = createHtmlElement('div', 'personal__item', '', personalDetails);
    const addressLabel = createHtmlElement('span', 'item__label', 'Address:', personalAddress);
    const addressInput = createHtmlElement('input', 'item__input', '', personalAddress);
    addressInput.setAttribute('type', 'text');
    addressInput.setAttribute('placeholder', 'Howard street Oswego');
    addressInput.setAttribute('required', '');
    addressInput.setAttribute('pattern', `[A-Za-zА-Яа-яЁё0-9-]{5,}\\s[A-Za-zА-Яа-яЁё0-9-]{5,}\\s[A-Za-zА-Яа-яЁё0-9-]{5,}`);
    const ErrorMessageAddress = createHtmlElement('span', 'error__message', 'Invalid address', personalAddress);

    if (!(addressInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    addressInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!addressInput.validity.valid) {
        ErrorMessageAddress.classList.toggle('active');
      }
    });
    addressInput.addEventListener('input', function () {
      if (addressInput.value.split(' ').length >= 3) {
        addressInput.pattern += '\\s?([A-Za-zА-Яа-яЁё0-9-]{5,})?';
      }
      if (ErrorMessageAddress.classList.contains('active')) {
        ErrorMessageAddress.classList.toggle('active');
      }
    });
    addressInput.addEventListener('blur', function () {
      if (!addressInput.validity.valid) {
        ErrorMessageAddress.classList.toggle('active');
      }
    });

    const personalMail = createHtmlElement('div', 'personal__item', '', personalDetails);
    const mailLabel = createHtmlElement('span', 'item__label', `E-mail:`, personalMail);
    const mailInput = createHtmlElement('input', 'item__input', '', personalMail);
    mailInput.setAttribute('type', 'text');
    mailInput.setAttribute('placeholder', 'nick-borisov@gmail.com');
    mailInput.setAttribute('required', '');
    mailInput.setAttribute('pattern', `[a-z0-9-_]+@[a-z]+\\.[a-z]{2,3}`);
    const ErrorMessageMail = createHtmlElement('span', 'error__message', 'Invalid e-mail', personalMail);

    if (!(mailInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    mailInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!mailInput.validity.valid) {
        ErrorMessageMail.classList.toggle('active');
      }
    });
    mailInput.addEventListener('input', function () {
      if (ErrorMessageMail.classList.contains('active')) {
        ErrorMessageMail.classList.toggle('active');
      }
    });
    mailInput.addEventListener('blur', function () {
      if (!mailInput.validity.valid) {
        ErrorMessageMail.classList.toggle('active');
      }
    });

    const cardDetails = createHtmlElement('div', 'card__details', '', this.popupForm);
    const cardDetailsTitle = createHtmlElement('h2', 'card__details-title', 'Credit card details', cardDetails);
    const cardData = createHtmlElement('div', 'card__data', '', cardDetails);
    const allCards = createHtmlElement('div', 'all__cards', '', cardData);
    const cardNumber = createHtmlElement('div', 'card__number', '', cardData);
    const cardImg = createHtmlElement('div', 'card__img', '', cardNumber);
    const cardNumberInput = createHtmlElement('input', 'card__number-input', '', cardNumber);
    cardNumberInput.setAttribute('type', 'text');
    cardNumberInput.setAttribute('placeholder', 'Card number (start from 3 for AE)');
    cardNumberInput.setAttribute('required', '');
    cardNumberInput.setAttribute('pattern', `[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}`);
    cardNumberInput.setAttribute('maxLength', '19');
    payment.formatCardNumber(cardNumberInput);
    const ErrorMessageCardNumber = createHtmlElement('span', 'error__message', 'Invalid card number', cardDetails);

    if (!(cardNumberInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    cardNumberInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!cardNumberInput.validity.valid) {
        ErrorMessageCardNumber.classList.toggle('active');
      }
    });
    cardNumberInput.addEventListener('input', function () {
      if (ErrorMessageCardNumber.classList.contains('active')) {
        ErrorMessageCardNumber.classList.toggle('active');
      }
      if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
      if (cardNumberInput.value.slice(0, 1) === '3') {
        cardImg.classList.add('ae');
        cardImg.classList.remove('mastercard');
        cardImg.classList.remove('visa');
      }
      if (cardNumberInput.value.slice(0, 1) === '4') {
        cardImg.classList.add('visa');
        cardImg.classList.remove('mastercard');
        cardImg.classList.remove('ae');
      }
      if (cardNumberInput.value.slice(0, 1) === '5') {
        cardImg.classList.add('mastercard');
        cardImg.classList.remove('visa');
        cardImg.classList.remove('ae');
      }
      if (cardNumberInput.value.slice(0, 1) !== '3' && cardNumberInput.value.slice(0, 1) !== '4' && cardNumberInput.value.slice(0, 1) !== '5') {
        cardImg.classList.remove('mastercard');
        cardImg.classList.remove('visa');
        cardImg.classList.remove('ae');
      }
    });
    cardNumberInput.addEventListener('blur', function () {
      if (!cardNumberInput.validity.valid) {
        ErrorMessageCardNumber.classList.toggle('active');
      }
    });

    const cardOther = createHtmlElement('div', 'card__other', '', cardData);
    const validData = createHtmlElement('div', 'valid__data', ' VALID: ', cardOther);
    const validInput = createHtmlElement('input', 'valid__input', '', validData);
    validInput.setAttribute('type', 'text');
    validInput.setAttribute('placeholder', 'MM / YY');
    validInput.setAttribute('required', '');
    validInput.setAttribute('maxLength', '7');
    validInput.setAttribute('pattern', `^(0[1-9]|1[0-2])\\s\/?\\s([0-9]{4}|[0-9]{2})$`);
    payment.formatCardExpiry(validInput);
    const ErrorMessageCardValid = createHtmlElement('span', 'error__message', 'Invalid card expiry', cardDetails);

    if (!(validInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    validInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!validInput.validity.valid) {
        ErrorMessageCardValid.classList.toggle('active');
      }
    });
    validInput.addEventListener('input', function () {
      if (ErrorMessageCardValid.classList.contains('active')) {
        ErrorMessageCardValid.classList.toggle('active');
      }
      if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    });
    validInput.addEventListener('blur', function () {
      if (!validInput.validity.valid) {
        ErrorMessageCardValid.classList.toggle('active');
      }
    });

    const cvvData = createHtmlElement('div', 'cvv__data', ' CVV: ', cardOther);
    const cvvInput = createHtmlElement('input', 'cvv__input', '', cvvData);
    cvvInput.setAttribute('type', 'text');
    cvvInput.setAttribute('placeholder', 'Code');
    cvvInput.setAttribute('required', '');
    cvvInput.setAttribute('maxLength', '3');
    cvvInput.setAttribute('pattern', `[0-9]{3}`);
    payment.formatCardCVC(cvvInput);
    const ErrorMessageCardCvv = createHtmlElement('span', 'error__message', 'Invalid card CVV', cardDetails);

    if (!(cvvInput instanceof HTMLInputElement)) {
      throw Error('Not select element');
    }
    cvvInput.addEventListener('invalid', function (e: Event) {
      e.preventDefault();
      if (!cvvInput.validity.valid) {
        ErrorMessageCardCvv.classList.toggle('active');
      }
    });
    cvvInput.addEventListener('input', function () {
      if (ErrorMessageCardCvv.classList.contains('active')) {
        ErrorMessageCardCvv.classList.toggle('active');
      }
      if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    });
    cvvInput.addEventListener('blur', function () {
      if (!cvvInput.validity.valid) {
        ErrorMessageCardCvv.classList.toggle('active');
      }
    });

    const confirmButton = createHtmlElement('button', 'confirm__button', 'CONFIRM', this.popupForm);
  }
}
