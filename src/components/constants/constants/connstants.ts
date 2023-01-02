enum BUTTON_TEXT {
  ADD = 'ADD TO CART',
  DEL = 'DROP FROM CART',
}

type EmitsName = 'navigate' | 'deleteFromCart' | 'addToCart' | 'buyNow' | 'filter';

export { BUTTON_TEXT, EmitsName };