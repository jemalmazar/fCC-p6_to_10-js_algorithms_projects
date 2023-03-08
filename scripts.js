const tabcordion = document.querySelector('.tabcordion');
const tabcordionButtons = tabcordion.querySelectorAll('[role="tab"]');
const expandArrows = tabcordion.querySelectorAll('[role="tab"] span');
const tabcordionPanels = Array.from(tabcordion.querySelectorAll('[role="tabpanel"]'));
const panelForms = tabcordion.querySelectorAll('form');
const resultDivs = Array.from(tabcordion.querySelectorAll('.result'));

function palindrome(str) {
    const formattedStr = str.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    const reversedStr = formattedStr.split('').reverse().join('');
    return formattedStr === reversedStr;
}

function convertToRoman(num) {
    let numCopy = num;
    const romanNums = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };

    let convertedNum = '';

    // loop fine tuning from: https://stackoverflow.com/a/41358305
    for (const numeral of Object.keys(romanNums)) {
        const multiplier = Math.floor(numCopy / romanNums[numeral]);
        numCopy -= romanNums[numeral] * multiplier;
        convertedNum += numeral.repeat(multiplier);
    }

    return convertedNum;
}

function rot13(str) {
    // modulo use taken from https://forum.freecodecamp.org/t/caesars-cipher-other-approaches/82127/25
    return str.toUpperCase().replace(/[A-Z]/g, (letter) => String.fromCharCode((letter.charCodeAt(0) % 26) + 65));
}

function telephoneCheck(str) {
    const regex1 = /^(1\s?)?\d{3}([-\s]?)\d{3}\2\d{4}$/;
    const regex2 = /^(1\s?)?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/;

    if (regex1.test(str)) {
        return true;
    }
    return !!regex2.test(str);
}

function handleClick(e) {
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

function handleSubmit(e) {
    e.preventDefault();
    const { name } = e.currentTarget;
    const targetDiv = resultDivs.find((panel) => panel.getAttribute('aria-labelledby') === name);

    if (name === 'palindrome') {
        if (palindrome(e.currentTarget.palindrome.value)) {
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
    }

    if (name === 'roman') {
        targetDiv.innerHTML = `
            <p>
                ${convertToRoman(e.currentTarget.roman.value)}
            </p>
        `;
    }

    if (name === 'caesar') {
        targetDiv.innerHTML = `
            <p>${rot13(e.currentTarget.caesar.value)}</p>
        `;
    }

    if (name === 'telephone') {
        if (telephoneCheck(e.currentTarget.telephone.value)) {
            targetDiv.innerHTML = `
                <p>
                    <span class="material-symbols-outlined">check_circle</span>
                    Vaild Format
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
    }
}

if (window.innerWidth >= 1080) {
    tabcordionButtons[0].setAttribute('aria-expanded', true);
    tabcordionButtons[0].style.borderTop = 'solid 3px black';
    tabcordionButtons[0].style.borderBottom = 'none';
    tabcordionPanels[0].setAttribute('aria-hidden', false);
    tabcordionPanels[0].style.maxHeight = `${tabcordionPanels[0].scrollHeight}px`;
}

tabcordionButtons.forEach((button) => button.addEventListener('click', handleClick));
panelForms.forEach((form) => form.addEventListener('submit', handleSubmit));
