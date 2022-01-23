// Search Toggle
if (document.getElementById(elcreativeConfig.buttons.buttonSearchToggle)) {
    document.getElementById(elcreativeConfig.buttons.buttonSearchToggle).addEventListener("click", () => {
        document.body.classList.toggle("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).focus();
    })
};

// Search Close
if (document.getElementById(elcreativeConfig.buttons.buttonSearchClose)) {
    document.getElementById(elcreativeConfig.buttons.buttonSearchClose).addEventListener("click", () => {
        document.body.classList.remove("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
    })
};