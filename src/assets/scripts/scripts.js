// Menu Toggle
if (document.getElementById(elcreativeConfig.buttons.buttonMenu)) {
    document.getElementById(elcreativeConfig.buttons.buttonMenu).addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.toggle("--drawer_menu_active");
        document.body.classList.remove("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
    })
};

// Search Toggle
if (document.getElementById(elcreativeConfig.buttons.buttonSearchToggle)) {
    document.getElementById(elcreativeConfig.buttons.buttonSearchToggle).addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.toggle("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).focus();
    })
};

// Search Close
if (document.getElementById(elcreativeConfig.buttons.buttonSearchClose)) {
    document.getElementById(elcreativeConfig.buttons.buttonSearchClose).addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.remove("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
    })
};

// Backdrop
if (document.getElementById(elcreativeConfig.elements.elementBackdrop)) {
    document.getElementById(elcreativeConfig.elements.elementBackdrop).addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.remove("--drawer_menu_active");
        document.body.classList.remove("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
    })
};