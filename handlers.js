import { sanitize } from 'dompurify';
import { tabcordionButtons, expandArrows, tabcordionPanels, resultDivs } from './elements.js';
import { palindrome, convertToRoman, rot13, telephoneCheck } from './lib.js';

export function handleClick(e) {
    // grab button panel's open or closed status
    const isTabOpen = e.currentTarget.getAttribute('aria-expanded');
    // object destructure + .find() code from: https://wesbos.com/javascript/06-serious-practice-exercises/tabs
    const { id } = e.currentTarget;
    const tabPanel = tabcordionPanels.find((panel) => panel.getAttribute('aria-labelledby') === id);

    // button marking + panel hiding code from: https://wesbos.com/javascript/06-serious-practice-exercises/tabs
    // mark all buttons as unselected
    tabcordionButtons.forEach((button) => {
        button.setAttribute('aria-expanded', false);
        button.style = null;
    });

    // hide all panels & mark all as hidden
    tabcordionPanels.forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
        panel.style.maxHeight = null;
    });

    // rotate expand arrow to original state
    expandArrows.forEach((icon) => (icon.style.transform = null));

    if (isTabOpen === 'false') {
        e.currentTarget.setAttribute('aria-expanded', true);
        e.currentTarget.style.borderTop = 'solid 3px black';
        e.currentTarget.style.borderBottom = `none`;
        e.currentTarget.children[0].style.transform = 'rotate(180deg)';
        tabPanel.setAttribute('aria-hidden', false);
        // .scrollHeight interpolation into px string code from: https://dev.to/lizlaffitte/creating-an-accordion-with-html-css-javascript-3gmn
        tabPanel.style.maxHeight = `${tabPanel.scrollHeight}px`;
    }
}

export function handleSubmit(e) {
    e.preventDefault();
    const { name } = e.currentTarget;
    const targetDiv = resultDivs.find((panel) => panel.getAttribute('aria-labelledby') === name);

    if (name === 'palindrome' && e.currentTarget.palindrome.value !== '') {
        const cleanPalindrome = sanitize(e.currentTarget.palindrome.value, {
            FORBID_ATTR: ['width', 'height', 'style'],
            FORBID_TAGS: ['style'],
        });

        if (palindrome(cleanPalindrome) && cleanPalindrome !== '') {
            targetDiv.innerHTML = `
                <p>
                    <span class="material-symbols-outlined">check_circle</span>
                    Palindrome
                </p> 
            `;
        } else {
            targetDiv.innerHTML = `
                <p>
                    <span class="material-symbols-outlined">cancel</span>
                    Not a Palindrome
                </p>
            `;
        }
    } else if (name === 'roman' && e.currentTarget.roman.value !== '') {
        const cleanRomanNumeral = sanitize(e.currentTarget.roman.value, {
            FORBID_ATTR: ['width', 'height', 'style'],
            FORBID_TAGS: ['style'],
        });

        targetDiv.innerHTML = `
            <p>${convertToRoman(cleanRomanNumeral)}</p>
        `;
    } else if (name === 'caesar' && e.currentTarget.caesar.value !== '') {
        const cleanCaesar = sanitize(e.currentTarget.caesar.value, {
            FORBID_ATTR: ['width', 'height', 'style'],
            FORBID_TAGS: ['style'],
        });

        targetDiv.innerHTML = `
            <p>${rot13(cleanCaesar)}</p>
        `;
    } else if (name === 'telephone' && e.currentTarget.telephone.value !== '') {
        const cleanPhoneNumber = sanitize(e.currentTarget.telephone.value, {
            FORBID_ATTR: ['width', 'height', 'style'],
            FORBID_TAGS: ['style'],
        });

        if (telephoneCheck(cleanPhoneNumber) && cleanPhoneNumber !== '') {
            targetDiv.innerHTML = `
                <p>
                    <span class="material-symbols-outlined">check_circle</span>
                    Valid Format
                </p> 
            `;
        } else {
            targetDiv.innerHTML = `
                <p>
                    <span class="material-symbols-outlined">cancel</span>
                    Invalid Format
                </p>
            `;
        }
    } else {
        targetDiv.innerHTML = `<p>Nothing Entered</p>`;
    }
}
