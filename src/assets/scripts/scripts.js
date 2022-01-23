// Search Toggle
if (document.getElementById(elcreativeConfig.buttons.buttonSearchToggle)) {
    document.getElementById(elcreativeConfig.buttons.buttonSearchToggle).addEventListener("click", () => {
        document.body.classList.toggle("--search_active");
        elcreativeConfig.elements.elementSearchInput.focus();
    })
};