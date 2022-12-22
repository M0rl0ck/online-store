import Header from '../Header/header';
import Footer from '../Footer/footer';
import ICard from '../constants/interfaces/ICard';
import connector from '../../data/connector/Connector';
import ErrorPage from '../pages/ErrorPage/errorPage';
import { createHtmlElement } from '../../utils/createElement';
import MainPage from '../pages/Main/main';
import CartPage from '../pages/CartPage/CartPage';
import ProductPage from './../pages/ProductPage/productPage';

export const PATH = {
  catalog: '/catalog',
  product: '/product',
  cart: '/cart',
  errorPage: '/404',
};

class App {
  private container: HTMLElement;
  private routes;
  header: Header;
  constructor() {
    this.header = new Header();
    this.container = createHtmlElement('main', 'main__content', '', document.body);
    const footer = new Footer();
    footer.createFooter();
    this.routes = {
      [PATH.catalog]: this.mainPage,
      [PATH.product]: this.product,
      [PATH.cart]: this.cart,
      [PATH.errorPage]: this.errorPage,
    };

    window.addEventListener('popstate', () => {
      this.routes[window.location.pathname](window.location.pathname);
    });
    window.addEventListener('DOMContentLoaded', () => {
      if (this.routes[window.location.pathname]) {
        this.routes[window.location.pathname](window.location.pathname);
      } else {
        this.routes[PATH.errorPage](PATH.errorPage);
      }
    });
    this.header.cart.addEventListener('click', () => this.navigate(PATH.cart));
    this.header.logo.addEventListener('click', () => this.navigate(PATH.catalog));
  }

  navigate = (path: string) => {
    window.history.pushState({}, 'path', window.location.origin + path);
    this.routes[path](path);
  };

  private mainPage = async (idPage: string): Promise<void> => {
    this.container.innerHTML = '';
    const data: ICard[] = await connector.getProducts(100);
    const main = new MainPage(idPage, data);
    this.container.append(main.render());
  };
  private product = (idPage: string) => {
    this.container.innerHTML = '';
    // this.container.append('product');
    const page = new ProductPage(idPage);
    this.container.append(page.render());
  };
  private cart = (idPage: string) => {
    this.container.innerHTML = '';
    const page = new CartPage(idPage);
    this.container.innerHTML = '';
    this.container.append(page.render());
  };
  private errorPage = (idPage: string) => {
    this.container.innerHTML = '';
    const page = new ErrorPage(idPage);
    this.container.append(page.render());
  };

  // run() {}
}

export default App;
