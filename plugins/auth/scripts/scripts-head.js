// Create Element
const functionCreateElement = (tag, options) => {
    var element = document.createElement(tag);
    for (var attributes in options) {
        // If Has Class Attribute
        if (attributes == "class") {
            element.classList.add.apply(element.classList, options[attributes]);
        } else if (attributes == "content") {
            element.innerHTML = options[attributes];
        } else {
            element[attributes] = options[attributes];
        }
    };

    return element
};

// Snackbar
const functionSnackbar = (content, duration) => {
    var element = functionCreateElement("div", {
        "class": [
            "elcreative_snackbar",
        ],
        "content": `<span class='snackbar_text'>${content}</span>`
    });
    document.body.appendChild(element);

    var snackbar = document.querySelectorAll(".elcreative_snackbar");
    for (var index = 0; index < snackbar.length; index++) {
        setTimeout(function () {
            element.classList.add("active");

            setTimeout(function () {
                element.classList.remove("active");
            }, index + duration + 100);

            setTimeout(function () {
                element.remove();
            }, index + duration + 200);
        }, index * 50);
    }
};




const authPageIndex = 'index.html'
const firebaseConfig = {
    apiKey: "AIzaSyCbeiP66A3aS68k7JJYOrIr5_jHvQ50OVI",
    authDomain: "materia-auth.firebaseapp.com",
    projectId: "materia-auth",
    storageBucket: "materia-auth.appspot.com",
    messagingSenderId: "497337413673",
    appId: "1:497337413673:web:357a3bdbe41624fd86ac38",
    measurementId: "G-YSV1HV0BJS"
}