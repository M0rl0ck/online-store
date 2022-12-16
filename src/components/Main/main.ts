import './main.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Main {
  createMain(): HTMLElement {
    const element = createHtmlElement('main', 'main__content', '', document.body);
    const mainWrapper = createHtmlElement('main', 'main__wrapper', '', element);
    return mainWrapper;
  }
}
