const tabcordion = document.querySelector('.tabcordion');
const tabcordionButtons = tabcordion.querySelectorAll('[role="tab"]');
const expandArrows = tabcordion.querySelectorAll('[role="tab"] span');
const tabcordionPanels = Array.from(tabcordion.querySelectorAll('[role="tabpanel"]'));

if (window.innerWidth >= 1080) {
    tabcordionButtons[0].setAttribute('aria-expanded', true);
    tabcordionButtons[0].style.borderTop = 'solid 3px black';
    tabcordionButtons[0].style.borderBottom = 'none';
    tabcordionPanels[0].setAttribute('aria-hidden', false);
    tabcordionPanels[0].style.maxHeight = `${tabcordionPanels[0].scrollHeight}px`;
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

tabcordionButtons.forEach((button) => button.addEventListener('click', handleClick));
