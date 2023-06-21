enum BUTTON_TEXT {
  ADD = 'ADD TO CART',
  DEL = 'DROP FROM CART',
}

type EmitsName = 'navigate' | 'deleteFromCart' | 'addToCart' | 'buyNow' | 'filter' | 'reset';

enum SORTBY {
  DEFAULT = 'Default',
  PRICEASC = 'PriceASC',
  PRICEDESC = 'PriceDESC',
  RATINGASC = 'RatingASC',
  RATINGDESC = 'RatingDESC',
  DISCOUNTASC = 'DiscountASC',
  DISCOUNTDESC = 'DiscountDESC',
}

export { BUTTON_TEXT, EmitsName, SORTBY };
