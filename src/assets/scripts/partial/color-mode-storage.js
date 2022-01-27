// check for localStorage, add as browser preference if missing
if (!localStorage.getItem("themeColor")) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("themeColor", "dark");
    } else {
        localStorage.setItem("themeColor", "light");
    }
};

// set interface to match localStorage
if (localStorage.getItem("themeColor") == "dark") {
    document.body.classList.add("--darkmode");
} else {
    document.body.classList.remove("--darkmode");
}