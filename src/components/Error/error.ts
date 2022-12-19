import './error.css';
import { createHtmlElement } from '../../utils/createElement';
import Main from '../Main/main';

export default class Error extends Main {
  constructor(id: string) {
    super(id);
  }
  createErrorPage(): HTMLElement {
    const element = createHtmlElement('div', 'error__wrap', '');
    const errorText = createHtmlElement('h1', 'error__text', 'PAGE NOT FOUND (404)', element);
    return element;
  }
}
