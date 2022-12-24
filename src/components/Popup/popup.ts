import './popup.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Popup {
  popupContentWrap: HTMLElement;
  constructor() {
    this.popupContentWrap = createHtmlElement('div', 'popup__content-wrap');
    const popupContent = createHtmlElement('div', 'popup__content', '', this.popupContentWrap);
    const popupForm = createHtmlElement('form', 'popup__form', '', popupContent);
    const personalDetails = createHtmlElement('div', 'personal__details', '', popupForm);
    const personalDetailsTitle = createHtmlElement('h2', 'personal__details-title', 'Personal details', personalDetails);
    const personalName = createHtmlElement('div', 'personal__item', '', personalDetails);
    const nameInput = createHtmlElement('input', 'item__input', '', personalName);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Name');
    nameInput.setAttribute('required', '');
    const personalPhone = createHtmlElement('div', 'personal__item', '', personalDetails);
    const phoneInput = createHtmlElement('input', 'item__input', '', personalPhone);
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('placeholder', 'Phone number');
    phoneInput.setAttribute('required', '');
    const personalAddress = createHtmlElement('div', 'personal__item', '', personalDetails);
    const addressInput = createHtmlElement('input', 'item__input', '', personalAddress);
    addressInput.setAttribute('type', 'text');
    addressInput.setAttribute('placeholder', 'Delivery address');
    addressInput.setAttribute('required', '');
    const personalMail = createHtmlElement('div', 'personal__item', '', personalDetails);
    const mailInput = createHtmlElement('input', 'item__input', '', personalMail);
    mailInput.setAttribute('type', 'email');
    mailInput.setAttribute('placeholder', 'E-mail');
    mailInput.setAttribute('required', '');
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
    cardNumberInput.setAttribute('type', 'number');
    cardNumberInput.setAttribute('placeholder', 'Card number');
    cardNumberInput.setAttribute('required', '');
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
  }
}
