import './footer.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Footer {
  createFooter(): HTMLElement {
    const element = createHtmlElement('footer', '', '', document.body);
    const wrapper = createHtmlElement('div', 'footer__wrap', '', element);
    const socials = createHtmlElement('div', 'socials', '', wrapper);
    const githubLinks = createHtmlElement('div', 'github__links', '', socials);
    const githubLink1 = createHtmlElement('a', 'footer__logo__link', '', githubLinks);
    githubLink1.setAttribute('target', '_blank');
    githubLink1.setAttribute('href', 'https://github.com/M0rl0ck');
    const githubImg1 = createHtmlElement('div', 'github__img', '', githubLink1);
    const githubText1 = createHtmlElement('span', 'github__text', 'SERGEY SERGEEV', githubLink1);
    const githubLink2 = createHtmlElement('a', 'footer__logo__link', '', githubLinks);
    githubLink2.setAttribute('target', '_blank');
    githubLink2.setAttribute('href', 'https://github.com/Gregory-Vinokur');
    const githubImg2 = createHtmlElement('div', 'github__img', '', githubLink2);
    const githubText2 = createHtmlElement('span', 'github__text', 'Gregory-Vinokur', githubLink2);
    const footerText = createHtmlElement('p', 'footer__text', '2023', socials);
    const rsLink = createHtmlElement('a', 'footer__logo__link', '', socials);
    rsLink.setAttribute('target', '_blank');
    rsLink.setAttribute('href', 'https://rs.school/js/');
    const rsImg = createHtmlElement('div', 'rs__img', '', rsLink);
    return element;
  }
}
