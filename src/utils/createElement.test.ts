import { createHtmlElement } from './createElement';

describe('createHtmlElement', () => {
  let parrent: HTMLElement;
  beforeEach(() => {
    parrent = document.createElement('div');
  });
  afterEach(() => {
    parrent.innerHTML = '';
  });
  it('should create an element of the specified type', () => {
    const element = createHtmlElement('div');
    expect(element.tagName).toBe('DIV');
  });

  it('should set the class name of the element', () => {
    const element = createHtmlElement('div', 'test-class');
    expect(element.className).toBe('test-class');
  });

  it('should set the inner text of the element', () => {
    const element = createHtmlElement('div', undefined, 'test');
    expect(element.innerText).toBe('test');
  });

  it('should append the created element to the parent element', () => {
    const element = createHtmlElement('div', undefined, undefined, parrent);
    expect(parrent.firstChild).toBe(element);
  });
});
