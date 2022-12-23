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
  catalog: '/',
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
      this.routes[window.location.pathname.split('/').slice(0, 2).join('/')]();
    });
    window.addEventListener('DOMContentLoaded', () => {
      const patch = window.location.pathname.split('/').slice(0, 2).join('/');
      if (this.routes[patch]) {
        this.routes[patch]();
      } else {
        window.history.pushState({}, 'path', (window.location.origin + PATH.errorPage));
        this.routes[PATH.errorPage]();
      }
    });

    this.header.on('navigate', this.navigate);
  }

  navigate = (path: string) => {
    window.history.pushState({}, 'path', window.location.origin + path);
    this.routes[path.split('/').slice(0, 2).join('/')]();
  };

  private mainPage = async (): Promise<void> => {
    this.container.innerHTML = '';
    const data: ICard[] = await connector.getProducts(100);
    const main = new MainPage(PATH.catalog, data);
    main.catalog.on('navigate', this.navigate);
    this.container.append(main.render());
  };
  private product = () => {
    this.container.innerHTML = '';
    const page = new ProductPage(PATH.product);
    page.on('navigation', this.navigate);
    this.container.append(page.render());
  };
  private cart = () => {
    this.container.innerHTML = '';
    const page = new CartPage(PATH.cart);
    this.container.innerHTML = '';
    this.container.append(page.render());
  };
  private errorPage = () => {
    this.container.innerHTML = '';
    const page = new ErrorPage(PATH.errorPage);
    this.container.append(page.render());
  };
}

export default App;
