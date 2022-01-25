// Lazysizes
document.addEventListener("lazybeforeunveil", function (element) {
    var target = element.target.getAttribute("data-image");

    target && (element.target.style.backgroundImage = "url(" + target + ")")
});

// Backdrop
if (document.getElementById(elcreativeConfig.elements.elementBackdrop)) {
    document.getElementById(elcreativeConfig.elements.elementBackdrop).addEventListener("click", () => {
        document.body.classList.remove("--drawer_menu_active");
        document.body.classList.remove("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
    })
};

// Drawer Menu Toggle
if (document.getElementById(elcreativeConfig.buttons.buttonDrawerMenu)) {
    document.getElementById(elcreativeConfig.buttons.buttonDrawerMenu).addEventListener("click", () => {
        document.body.classList.toggle("--drawer_menu_active");
        document.body.classList.remove("--search_active");
        document.getElementById(elcreativeConfig.elements.elementSearchInput).blur();
    })
};

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