function elementsFromPointPolyfill(x, y) {
    const elements = [];
    const pointerEvents = [];
    let el;

    do {
        if (el !== document.elementFromPoint(x, y)) {
            el = document.elementFromPoint(x, y);
            elements.push(el);
            pointerEvents.push(el.style.pointerEvents);
            el.style.pointerEvents = "none";
        } else {
            el = null;
        }
    } while (el);

    for (const i = 0; i < elements.length; i++) {
        elements[i].style.pointerEvents = pointerEvents[i];
    }

    return elements;
}

if (typeof document !== "undefined" && typeof document.elementsFromPoint === "undefined") {
    document.elementsFromPoint = elementsFromPointPolyfill;
}
