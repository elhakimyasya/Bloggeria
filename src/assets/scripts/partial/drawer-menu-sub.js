if (elcreativeConfig.themeInfo.config.featuresSubMenu == "2px") {
    (function (selector) {
        var result = "";
        var listItem = document.getElementById(selector).querySelectorAll("li");
        var boolean = false;

        listItem.forEach(function (element, index) {
            var listText = element.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();


            if (listText.startsWith("_")) {
                element = element.outerHTML.replace(">_", ">");
                listText = "";

                if (!boolean) {
                    result = result.replace(/<\/li>$/, "");
                    listText = '<ul class="drawer_sub">';
                };

                result = result + (listText + element);
                boolean = true
            } else {
                if (boolean) {
                    result = result + "</ul>"
                };

                result = result + element.outerHTML;
                boolean = false;
            }

            if (boolean & index == listItem.length - 1) {
                result = result + "</ul></li>";
            }
        });

        document.getElementById(selector).querySelector("ul").classList.remove("visibility_hidden");
        document.getElementById(selector).querySelectorAll("ul")[0].innerHTML = result;
        document.getElementById(selector).querySelectorAll(".drawer_sub").forEach((element) => {
            element.previousElementSibling.setAttribute("href", "javascript:;");
            element.previousElementSibling.setAttribute("data-toggle-class", "--active");
            element.previousElementSibling.setAttribute("data-toggle-target-next", "");
            element.previousElementSibling.setAttribute("data-toggle-escape", "");
        });
    })(elcreativeConfig.elements.elementDrawerMenu)
};