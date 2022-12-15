import './catalog.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Catalog {
  createCatalog(): HTMLElement {
    const element = createHtmlElement('main', 'main__content', '', document.body);
    return element;
  }
}
