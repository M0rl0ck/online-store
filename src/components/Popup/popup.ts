import './popup.css';
import { createHtmlElement } from '../../utils/createElement';
const payment = require('payment');

export default class Popup {
  popupContentWrap: HTMLElement;
  constructor() {
    this.popupContentWrap = createHtmlElement('div', 'popup__content-wrap');
    const popupContent = createHtmlElement('div', 'popup__content', '', this.popupContentWrap);
    const popupForm = createHtmlElement('form', 'popup__form', '', popupContent);
    const personalDetails = createHtmlElement('div', 'personal__details', '', popupForm);
    const personalDetailsTitle = createHtmlElement('h2', 'personal__details-title', 'Personal details', personalDetails);
    const personalName = createHtmlElement('div', 'personal__item', '', personalDetails);
    const nameLabel = createHtmlElement('label', 'item__label', 'Name:', personalName);
    const nameInput = createHtmlElement('input', 'item__input', '', nameLabel);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Nick Borisov');
    nameInput.setAttribute('required', '');
    nameInput.setAttribute('pattern', `[A-Za-zА-Яа-яЁё0-9-]{3,}\\s[A-Za-zА-Яа-яЁё0-9-]{3,}`);
    const ErrorMessageName = createHtmlElement('span', 'error__message', 'Invalid name', nameLabel);
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
    const phoneLabel = createHtmlElement('label', 'item__label', 'Phone:', personalPhone);
    const phoneInput = createHtmlElement('input', 'item__input', '', phoneLabel);
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('placeholder', '+15852826894');
    phoneInput.setAttribute('required', '');
    phoneInput.setAttribute('pattern', `[+][0-9]{9,}`);
    const ErrorMessagePhone = createHtmlElement('span', 'error__message', 'Invalid phone', phoneLabel);

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
    });
    phoneInput.addEventListener('focus', function () {
      if (phoneInput.value === '') {
        phoneInput.value += '+';
      }
    });

    const personalAddress = createHtmlElement('div', 'personal__item', '', personalDetails);
    const addressLabel = createHtmlElement('label', 'item__label', 'Address:', personalAddress);
    const addressInput = createHtmlElement('input', 'item__input', '', addressLabel);
    addressInput.setAttribute('type', 'text');
    addressInput.setAttribute('placeholder', 'Howard street Oswego');
    addressInput.setAttribute('required', '');
    addressInput.setAttribute('pattern', `[A-Za-zА-Яа-яЁё0-9-]{5,}\\s[A-Za-zА-Яа-яЁё0-9-]{5,}\\s[A-Za-zА-Яа-яЁё0-9-]{5,}`);
    const ErrorMessageAddress = createHtmlElement('span', 'error__message', 'Invalid address', addressLabel);

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
    const mailLabel = createHtmlElement('label', 'item__label', `E-mail:`, personalMail);
    const mailInput = createHtmlElement('input', 'item__input', '', mailLabel);
    mailInput.setAttribute('type', 'text');
    mailInput.setAttribute('placeholder', 'nick-borisov@gmail.com');
    mailInput.setAttribute('required', '');
    mailInput.setAttribute('pattern', `[a-z0-9-_]+@[a-z]+\\.[a-z]{2,3}`);
    const ErrorMessageMail = createHtmlElement('span', 'error__message', 'Invalid e-mail', mailLabel);

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

    const cardDetails = createHtmlElement('div', 'card__details', '', popupForm);
    const cardDetailsTitle = createHtmlElement('h2', 'card__details-title', 'Credit card details', cardDetails);
    const cardData = createHtmlElement('div', 'card__data', '', cardDetails);
    const cardNumber = createHtmlElement('div', 'card__number', '', cardData);
    const cardImg = createHtmlElement('img', 'card__img', '', cardNumber);
    cardImg.setAttribute(
      'src',
      'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71'
    );
    const cardNumberInput = createHtmlElement('input', 'card__number-input', '', cardNumber);
    cardNumberInput.setAttribute('type', 'text');
    cardNumberInput.setAttribute('placeholder', 'Card number');
    cardNumberInput.setAttribute('required', '');
    cardNumberInput.setAttribute('pattern', `[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}`);
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
    });
    cardNumberInput.addEventListener('blur', function () {
      if (!cardNumberInput.validity.valid) {
        ErrorMessageCardNumber.classList.toggle('active');
      }
    });

    const cardOther = createHtmlElement('div', 'card__other', '', cardData);
    const validData = createHtmlElement('div', 'valid__data', ' VALID: ', cardOther);
    const validInput = createHtmlElement('input', 'valid__input', '', validData);
    validInput.setAttribute('type', 'number');
    validInput.setAttribute('placeholder', 'Valid Thru');
    validInput.setAttribute('required', '');
    const cvvData = createHtmlElement('div', 'cvv__data', ' CVV: ', cardOther);
    const cvvInput = createHtmlElement('input', 'cvv__input', '', cvvData);
    cvvInput.setAttribute('type', 'number');
    cvvInput.setAttribute('placeholder', 'Code');
    cvvInput.setAttribute('required', '');
    const confirmButton = createHtmlElement('button', 'confirm__button', 'CONFIRM', popupForm);

    function handleFormSubmit(event: Event) {
      event.preventDefault();
      console.log('Отправка!');
    }

    popupForm.addEventListener('submit', handleFormSubmit);
  }
}
