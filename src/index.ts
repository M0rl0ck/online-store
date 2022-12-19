import Header from '../src/components/Header/header';
import LeftFilter from '../src/components/Filters/Left filter/left_filter';
import Catalog from '../src/components/Catalog/catalog';
import '../src/css/global.css';
import Footer from './components/Footer/footer';
// import main from './components/Main/main';
import Main from './components/Main/main';
import ICard from './components/constants/interfaces/ICard';
import connector from './data/connector/Connector';
import Error from './components/Error/error';

// new Header();

// const footer = new Footer();
// footer.createFooter();

// async function mainPage() {
//   const data: ICard[] = await connector.getProducts(100);
//   const catalog = new Catalog(data);
//   const leftFilter = new LeftFilter(data);
//   main.append(leftFilter.createLeftFilter(), catalog.createCatalog());
// }

// async function errorPage() {
//   const error = new Error();
//   main.append(error.createErrorPage());
// }

// // mainPage();
// errorPage();

// Routing

export const enum PageIds {
  Catalog = 'main-page',
  ErrorPage = 'error-page',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  // private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Main | null = null;

    if (idPage === PageIds.Catalog) {
      page = App.mainPage(idPage);
    } else {
      page = new Error(idPage);
    }

    if (page) {
      const pageHTML = page.mainWrapper;
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  static mainPage = async (idPage: string): Promise<void> => {
    const data: ICard[] = await connector.getProducts(100);
    const catalog = new Catalog(idPage, data);
    const leftFilter = new LeftFilter(data);
    const main = new Main(idPage).mainWrapper;
    main.append(leftFilter.createLeftFilter(), catalog.createCatalog());
  };

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  // constructor() {
  //   this.header = new Header('header', 'header-container');
  // }

  run() {
    // App.container.append(this.header.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

// export default App;

const app = new App();
app.run();
