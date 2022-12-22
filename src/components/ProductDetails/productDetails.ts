import './productDetails.css';
import { createHtmlElement } from '../../utils/createElement';

export default class ProductDetails {
  createProduct(): HTMLElement {
    const element = createHtmlElement('div', 'product__details');
    const navigation = createHtmlElement('div', 'navigation', '', element);
    const navLinkStore = createHtmlElement('a', 'nav__link nav__link-store', 'STORE', navigation);
    navigation.append(' >> ');
    const navLinkCategory = createHtmlElement('a', 'nav__link nav__link-category', 'SMARTPHONES', navigation);
    navigation.append(' >> ');
    const navLinkBrand = createHtmlElement('a', 'nav__link nav__link-brand', 'APPLE', navigation);
    navigation.append(' >> ');
    const navLinkModel = createHtmlElement('a', 'nav__link nav__link-model', 'IPHONE 9', navigation);
    const productDetail = createHtmlElement('div', 'product__detail', '', element);
    const productTitle = createHtmlElement('div', 'product__title', '', productDetail);
    const productTitleText = createHtmlElement('h1', 'product__title-text', 'iPhone 9', productTitle);
    const productData = createHtmlElement('div', 'product__data', '', productDetail);
    const produtPhotos = createHtmlElement('div', 'product__photos', '', productData);
    const smallPhotos = createHtmlElement('div', 'small__photos', '', produtPhotos);
    const firstPhoto = createHtmlElement('img', 'small__photo', '', smallPhotos);
    const secondPhoto = createHtmlElement('img', 'small__photo', '', smallPhotos);
    const thirdPhoto = createHtmlElement('img', 'small__photo', '', smallPhotos);
    firstPhoto.setAttribute('src', 'https://i.dummyjson.com/data/products/1/1.jpg');
    secondPhoto.setAttribute('src', 'https://i.dummyjson.com/data/products/1/3.jpg');
    thirdPhoto.setAttribute('src', 'https://i.dummyjson.com/data/products/1/4.jpg');

    smallPhotos.addEventListener('click', (e: Event) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) {
        return;
      }
      grandPhoto.setAttribute('src', `${target.getAttribute('src')}`);
    });

    const grandPhotoWrap = createHtmlElement('div', 'grand__photo-wrap', '', produtPhotos);
    const grandPhoto = createHtmlElement('img', 'grand__photo', '', grandPhotoWrap);
    grandPhoto.setAttribute('src', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg');
    const productInfo = createHtmlElement('div', 'product__info', '', productData);
    const productDesc = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productDescTitle = createHtmlElement('h3', 'product__desc-title', 'Description:', productDesc);
    const productDescText = createHtmlElement('p', 'product__desc-text', 'An apple mobile which is nothing like apple', productDesc);
    const productDiscount = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productDiscountTitle = createHtmlElement('h3', 'product__desc-title', 'Discount Percentage:', productDiscount);
    const productDiscountText = createHtmlElement('p', 'product__desc-text', '12.96', productDiscount);
    const productRating = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productRatingTitle = createHtmlElement('h3', 'product__desc-title', 'Rating:', productRating);
    const productRatingText = createHtmlElement('p', 'product__desc-text', '4.69', productRating);
    const productStock = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productStockTitle = createHtmlElement('h3', 'product__desc-title', 'Stock:', productStock);
    const productStockText = createHtmlElement('p', 'product__desc-text', '94', productStock);
    const productBrand = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productBrandTitle = createHtmlElement('h3', 'product__desc-title', 'Brand:', productBrand);
    const productBrandText = createHtmlElement('p', 'product__desc-text', 'Apple', productBrand);
    const productCategory = createHtmlElement('div', 'product__detail-item product__desc', '', productInfo);
    const productCategoryTitle = createHtmlElement('h3', 'product__desc-title', 'Category:', productCategory);
    const productCategoryText = createHtmlElement('p', 'product__desc-text', 'smartphones', productCategory);
    const addToCart = createHtmlElement('div', 'product__add-to-cart', '', productData);
    const cartButtons = createHtmlElement('div', 'cart__buttons', ' €549.00 ', addToCart);
    const addToCartButton = createHtmlElement('button', 'cart__button-add', ' ADD TO CART ', cartButtons);
    const buyNowButton = createHtmlElement('button', 'cart__button-buy', ' BUY NOW ', cartButtons);
    return element;
  }
}
