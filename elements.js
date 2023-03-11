const tabcordion = document.querySelector('.tabcordion');
export const tabcordionButtons = tabcordion.querySelectorAll('[role="tab"]');
export const expandArrows = tabcordion.querySelectorAll('[role="tab"] span');
export const tabcordionPanels = Array.from(tabcordion.querySelectorAll('[role="tabpanel"]'));
export const panelForms = tabcordion.querySelectorAll('form');
export const resultDivs = Array.from(tabcordion.querySelectorAll('.result'));
