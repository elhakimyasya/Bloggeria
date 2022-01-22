// Drawer Menu Toggle
document.getElementById(elcreativeConfig.buttons.buttonMenuToggle).addEventListener("click", function (event) {
    event.preventDefault();
    document.body.classList.toggle("--drawer_menu_active");
    document.body.classList.remove("--search_active");
    document.getElementById(elcreativeConfig.elements.elementBackdrop).classList.toggle("--active");
    document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
})
