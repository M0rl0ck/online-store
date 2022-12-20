import { createHtmlElement } from '../../../utils/createElement';

export default abstract class Page {
  mainWrapper: HTMLElement;
  constructor(id: string) {
    this.mainWrapper = createHtmlElement('div', 'main__wrapper');
    this.mainWrapper.id = id;
  }

  render() {
    return this.mainWrapper;
  }
}
