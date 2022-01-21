// Backdrop Toggle
document.getElementById(elcreativeConfig.elements.elementBackdrop).addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.remove("--search_active");
    document.body.classList.remove("--drawer_menu_active");
    document.getElementById(elcreativeConfig.elements.elementBackdrop).classList.remove("--active");
    document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
});

// Search Toggle
document.getElementById(elcreativeConfig.buttons.buttonSearchToggle).addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.toggle("--search_active");
    document.body.classList.remove("--drawer_menu_active");
    document.getElementById(elcreativeConfig.elements.elementBackdrop).classList.toggle("--active");
    document.getElementById(elcreativeConfig.elements.elementSearchInput).focus();
});

// Search Close
document.getElementById(elcreativeConfig.buttons.buttonSearchClose).addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.remove("--search_active");
    document.body.classList.remove("--drawer_menu_active");
    document.getElementById(elcreativeConfig.elements.elementBackdrop).classList.remove("--active");
    document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
});