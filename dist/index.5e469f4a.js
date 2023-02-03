const tabcordionButtons = document.querySelectorAll(".tabcordion-list button");
const tabcordionPanels = document.querySelectorAll(".tabcordion-panel");
function handleClick(e) {
    console.log(e.currentTarget);
    console.log(this);
}
tabcordionButtons.forEach((button)=>button.addEventListener("click", handleClick));

//# sourceMappingURL=index.5e469f4a.js.map
