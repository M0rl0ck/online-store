import Header from '../src/components/Header/header';
import LeftFilter from '../src/components/Filters/Left filter/left_filter';
import '../src/css/global.css';
import Footer from './components/Footer/footer';

const header = new Header();
header.createHeader();

const leftFilter = new LeftFilter();
leftFilter.createLeftFilter();

const footer = new Footer();
footer.createFooter();
