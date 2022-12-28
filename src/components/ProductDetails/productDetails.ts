import './productDetails.css';
import { createHtmlElement } from '../../utils/createElement';
import connector from '../../data/connector/Connector';
import EventEmitter from 'events';
import { PATH } from '../app/app';
import { CatalogEmitsName } from '../Catalog/catalog';
import { BUTTON_TEXT } from '../constants/constants/connstants';

export default class ProductDetails extends EventEmitter {
  id: number;
  isCart: boolean;
  addToCartButton!: HTMLElement;
  constructor(id: number, isCart: boolean) {
    super();
    this.id = id;
    this.isCart = isCart;
  }

  emit(event: CatalogEmitsName, data?: number | string) {
    return super.emit(event, data);
  }

  on(event: CatalogEmitsName, callback: ((data: string) => void) | ((data: number) => void)) {
    return super.on(event, callback);
  }
  async createProduct(): Promise<HTMLElement> {
    const element = createHtmlElement('div', 'product__details');
    const data = await connector.getProduct(this.id);

    if (data.message) {
      element.className = 'product__details-empty';
      createHtmlElement('div', 'product__details-empty-text', data.message, element);
      return element;
    }

    const navigation = createHtmlElement('div', 'navigation', '', element);
    const navLinkStore = createHtmlElement('a', 'nav__link nav__link-store', 'STORE', navigation);
    navLinkStore.addEventListener('click', () => this.emit('navigate', PATH.catalog));
    navigation.append(' >> ');
    const navLinkCategory = createHtmlElement('a', 'nav__link nav__link-category', `${data.category.toUpperCase()}`, navigation);
    navigation.append(' >> ');
    const navLinkBrand = createHtmlElement('a', 'nav__link nav__link-brand', `${data.brand.toUpperCase()}`, navigation);
    navigation.append(' >> ');
    const navLinkModel = createHtmlElement('a', 'nav__link nav__link-model', `${data.title.toUpperCase()}`, navigation);
    const productDetail = createHtmlElement('div', 'product__detail', '', element);
    const productTitle = createHtmlElement('div', 'product__title', '', productDetail);
    const productTitleText = createHtmlElement('h1', 'product__title-text', `${data.title}`, productTitle);
    const productData = createHtmlElement('div', 'product__data', '', productDetail);
    const produtPhotos = createHtmlElement('div', 'product__photos', '', productData);
    const smallPhotos = createHtmlElement('div', 'small__photos', '', produtPhotos);
    data.images.forEach((image) => {
      const photo = createHtmlElement('img', 'small__photo', '', smallPhotos);
      photo.setAttribute('src', image);
    });

    smallPhotos.addEventListener('click', (e: Event) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) {
        return;
      }
      grandPhoto.setAttribute('src', `${target.getAttribute('src')}`);
    });

    const grandPhotoWrap = createHtmlElement('div', 'grand__photo-wrap', '', produtPhotos);
    const grandPhoto = createHtmlElement('img', 'grand__photo', '', grandPhotoWrap);
    grandPhoto.setAttribute('src', `${data.thumbnail}`);
    const productInfo = createHtmlElement('div', 'product__info', '', productData);
    const productDesc = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productDescTitle = createHtmlElement('h3', 'product__desc-title', 'Description:', productDesc);
    const productDescText = createHtmlElement('p', 'product__desc-text', `${data.description}`, productDesc);
    const productDiscount = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productDiscountTitle = createHtmlElement('h3', 'product__desc-title', 'Discount Percentage:', productDiscount);
    const productDiscountText = createHtmlElement('p', 'product__desc-text', `${data.discountPercentage}`, productDiscount);
    const productRating = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productRatingTitle = createHtmlElement('h3', 'product__desc-title', 'Rating:', productRating);
    const productRatingText = createHtmlElement('p', 'product__desc-text', `${data.rating}`, productRating);
    const productStock = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productStockTitle = createHtmlElement('h3', 'product__desc-title', 'Stock:', productStock);
    const productStockText = createHtmlElement('p', 'product__desc-text', `${data.stock}`, productStock);
    const productBrand = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productBrandTitle = createHtmlElement('h3', 'product__desc-title', 'Brand:', productBrand);
    const productBrandText = createHtmlElement('p', 'product__desc-text', `${data.brand}`, productBrand);
    const productCategory = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productCategoryTitle = createHtmlElement('h3', 'product__desc-title', 'Category:', productCategory);
    const productCategoryText = createHtmlElement('p', 'product__desc-text', `${data.category}`, productCategory);
    const addToCart = createHtmlElement('div', 'product__add-to-cart', '', productData);
    const cartButtons = createHtmlElement('div', 'cart__buttons', ` €${data.price} `, addToCart);
    this.addToCartButton = createHtmlElement('button', 'cart__button-add', `${this.isCart ? BUTTON_TEXT.DEL : BUTTON_TEXT.ADD}`, cartButtons);
    this.addToCartButton.addEventListener('click', this.addToCart);
    const buyNowButton = createHtmlElement('button', 'cart__button-buy', ' BUY NOW ', cartButtons);
    buyNowButton.addEventListener('click', () => this.emit('buyNow', this.id));
    return element;
  }

  addToCart = () => {
    this.isCart = !this.isCart;
    this.addToCartButton.textContent = `${this.isCart ? BUTTON_TEXT.DEL : BUTTON_TEXT.ADD}`;
    if (this.isCart) {
      this.emit('addToCart', this.id);
    } else {
      this.emit('deleteFromCart', this.id);
    }
  };
}
