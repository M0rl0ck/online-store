import Header from '../src/components/Header/header';
import LeftFilter from '../src/components/Filters/Left filter/left_filter';
import Catalog from '../src/components/Catalog/catalog';
import '../src/css/global.css';
import Footer from './components/Footer/footer';
import Main from './components/Main/main';

const header = new Header();
header.createHeader();

const main = new Main();

const leftFilter = new LeftFilter();

const catalog = new Catalog();

main.createMain().append(leftFilter.createLeftFilter(), catalog.createCatalog());

const footer = new Footer();
footer.createFooter();
