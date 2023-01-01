import './blackout.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Blackout {
  blackout: HTMLElement;
  constructor() {
    this.blackout = createHtmlElement('div', 'blackout');
  }
  render() {
    return this.blackout;
  }
}
