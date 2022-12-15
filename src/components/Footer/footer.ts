import './footer.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Footer {
  createFooter(): HTMLElement {
    const element = createHtmlElement('footer', '', '', document.body);
    const wrapper = createHtmlElement('div', 'footer__wrap', '', element);
    const socials = createHtmlElement('div', 'socials', '', wrapper);
    const githubLink = createHtmlElement('a', 'footer__logo__link', '', socials);
    githubLink.setAttribute('target', '_blank');
    githubLink.setAttribute('href', 'https://github.com');
    const githubImg = createHtmlElement('div', 'github__img', '', githubLink);
    const footerText = createHtmlElement('p', 'footer__text', '2023', socials);
    const rsLink = createHtmlElement('a', 'footer__logo__link', '', socials);
    rsLink.setAttribute('target', '_blank');
    rsLink.setAttribute('href', 'https://rs.school/js/');
    const rsImg = createHtmlElement('div', 'rs__img', '', rsLink);
    return element;
  }
}
