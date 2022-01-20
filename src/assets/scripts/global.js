// Search Toggle
document.getElementById(elcreativeConfig.buttons.buttonSearchToggle).addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.toggle("--search_active");
    document.getElementById(elcreativeConfig.elements.elementSearchInput).focus();
});

// Search Close
document.getElementById(elcreativeConfig.buttons.buttonSearchClose).addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.remove("--search_active");
    document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
});