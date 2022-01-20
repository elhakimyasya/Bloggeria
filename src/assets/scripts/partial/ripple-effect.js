var elcreativeRipple;
document.onpointerdown = function (event) {
    var rippleTarget = event.target;
    var rippleElement;

    if (elcreativeRipple) {
        var rippleContent = elcreativeRipple;
        elcreativeRipple = null;

        setTimeout(function () {
            if (rippleContent.parentNode) {
                rippleContent.parentNode.removeChild(rippleContent)
            }
        }, 400)
    };

    for (; rippleTarget && rippleTarget.classList && !rippleTarget.classList.contains("elcreative_ripple");) {
        rippleTarget = rippleTarget.parentNode;
    };

    if (rippleTarget && rippleTarget.classList && rippleTarget.classList.contains("elcreative_ripple")) {
        var rippleAxisX = event.x - rippleTarget.getBoundingClientRect().left;
        var rippleAxisY = event.y - rippleTarget.getBoundingClientRect().top;
        var rippleWidth = Math.max(rippleAxisX, rippleTarget.offsetWidth - rippleAxisX);
        var rippleHeight = Math.max(rippleAxisY, rippleTarget.offsetHeight - rippleAxisY);

        rippleWidth = Math.sqrt(rippleWidth * rippleWidth + rippleHeight * rippleHeight);
        (rippleHeight = document.createElement("i")).classList.add("ripple_container");
        rippleTarget.appendChild(rippleHeight);

        (rippleElement = document.createElement("i")).style.top = rippleAxisY - rippleWidth + "px";
        rippleElement.style.left = rippleAxisX - rippleWidth + "px";
        rippleElement.style.height = 2 * rippleWidth + "px";
        rippleElement.style.width = 2 * rippleWidth + "px";
        rippleElement.style.transform = "scale(0)";
        rippleHeight.appendChild(rippleElement);

        elcreativeRipple = rippleHeight;
        var rippleTimeOut = setTimeout(function () {
            rippleElement.style.transform = "scale(1)";
        }, 24);

        document.onpointerup = document.onpointercancel = function () {
            document.onpointerup = document.onpointercancel = document.onpointermove = null;
            elcreativeRipple.firstChild.style.opacity = "0";
        };

        document.onpointermove = function (render) {
            if (4 < event.rippleWidth - render.rippleWidth || -4 > event.rippleWidth - render.rippleWidth || 4 < event.y - render.y || -4 > event.y - render.y) {
                clearTimeout(rippleTimeOut), document.onpointercancel();
            }
        }
    }
};