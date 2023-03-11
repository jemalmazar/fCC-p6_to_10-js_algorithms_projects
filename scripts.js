import { tabcordionButtons, tabcordionPanels, panelForms } from './elements.js';
/* eslint import/no-unresolved: 2 */
import { handleClick, handleSubmit } from './handlers.js';

if (window.innerWidth >= 1080) {
    tabcordionButtons[0].setAttribute('aria-expanded', true);
    tabcordionButtons[0].style.borderTop = 'solid 3px black';
    tabcordionButtons[0].style.borderBottom = 'none';
    tabcordionPanels[0].setAttribute('aria-hidden', false);
    tabcordionPanels[0].style.maxHeight = `${tabcordionPanels[0].scrollHeight}px`;
}

tabcordionButtons.forEach((button) => button.addEventListener('click', handleClick));
panelForms.forEach((form) => form.addEventListener('submit', handleSubmit));
