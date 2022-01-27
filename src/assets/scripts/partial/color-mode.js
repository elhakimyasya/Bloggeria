if (elcreativeConfig.theme.featuresColorMode === "2px") {
    document.getElementById(elcreativeConfig.buttons.buttonColorMode).addEventListener("click", (event) => {
        event.preventDefault();
        
        if (document.body.classList.contains("--darkmode")) {
            document.body.classList.remove("--darkmode");
            localStorage.setItem("themeColor", "light");
        } else {
            document.body.classList.add("--darkmode");
            localStorage.setItem("themeColor", "dark");
        }
    });
};