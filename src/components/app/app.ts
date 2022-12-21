import Header from '../Header/header';
import Footer from '../Footer/footer';
import ICard from '../constants/interfaces/ICard';
import connector from '../../data/connector/Connector';
import ErrorPage from '../pages/ErrorPage/errorPage';
import { createHtmlElement } from '../../utils/createElement';
import Page from '../pages/Template/page';
import MainPage from '../pages/Main/main';
import CartPage from '../pages/CartPage/CartPage';

new Header();
const main = createHtmlElement('main', 'main__content', '', document.body);
const footer = new Footer();
footer.createFooter();

export const enum PageIds {
  Catalog = 'main-page',
  Cart = 'cart-page',
  ErrorPage = 'error-page',
}

class App {
  private static container: HTMLElement = main;
  static renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.Catalog) {
      App.mainPage(idPage);
    } else if (idPage === PageIds.Cart) {
      page = new CartPage(idPage);
    } else {
      page = new ErrorPage(PageIds.ErrorPage);
    }

    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  static mainPage = async (idPage: string): Promise<void> => {
    const data: ICard[] = await connector.getProducts(100);
    const main = new MainPage(idPage, data);
    App.container.append(main.render());
  };

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      let hash = window.location.hash;
      hash = hash ? hash.slice(1) : PageIds.Catalog;
      App.renderNewPage(hash);
    });
  }

  run() {
    let hash = window.location.hash;
    hash = hash ? hash.slice(1) : PageIds.Catalog;
    App.renderNewPage(hash);
    this.enableRouteChange();
  }
}

export default App;
