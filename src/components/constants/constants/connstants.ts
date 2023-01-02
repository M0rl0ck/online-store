enum BUTTON_TEXT {
  ADD = 'ADD TO CART',
  DEL = 'DROP FROM CART',
}

type EmitsName = 'navigate' | 'deleteFromCart' | 'addToCart' | 'buyNow';

export { BUTTON_TEXT, EmitsName };