import './main.css';
import { createHtmlElement } from '../../utils/createElement';

class Main {
  mainWrapper: HTMLElement;
  constructor(id: string) {
    const element = createHtmlElement('main', 'main__content', '', document.body);
    this.mainWrapper = createHtmlElement('main', 'main__wrapper', '', element);
    this.mainWrapper.id = id;
  }
}

// const main = (new Main).mainWrapper;

// export default main;

export default Main;
