const textInput = document.getElementById("textInput");
const counter = document.getElementById("counter");

/* AUTO EXPAND YANG STABIL */
function adjustHeight() {
    textInput.style.height = "auto";

    const maxHeight = 460;
    const newHeight = Math.min(textInput.scrollHeight, maxHeight);

    textInput.style.height = newHeight + "px";
}

/* INPUT EVENT */
textInput.addEventListener("input", () => {
    adjustHeight();

    const rawText = textInput.value;

    /* CHARACTER (TERMASUK SPASI) */
    const characters = rawText.length;

    /* WORD */
    const text = rawText.trim();
    const words = text ? text.split(/\s+/).length : 0;

    /* SENTENCE */
    const sentences = text
        ? text.split(/[.!?]+/).filter(s => s.trim()).length
        : 0;

    counter.innerHTML =
        `${characters} Char &nbsp; ${words} Word &nbsp; ${sentences} Sentence`;
});


/* WINDOW RESIZE SUPPORT */
window.addEventListener("resize", adjustHeight);


/* TRANSFORM */
function transformText(type) {
    let text = textInput.value;
    if (!text) return;

    switch (type) {
        case "upper":
            textInput.value = text.toUpperCase();
            break;
        case "lower":
            textInput.value = text.toLowerCase();
            break;
        case "capitalized":
            textInput.value = text.toLowerCase()
                .split(" ")
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
            break;
        case "sentence":
            textInput.value = text.toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
            break;
    }
    autoResize();
}

/* CLEAR */
function clearText() {
    textInput.value = "";
    counter.innerHTML = "0 Word &nbsp; 0 Sentence";
    autoResize();
}

/* COPY */
function copyText() {
    if (!textInput.value) return;
    navigator.clipboard.writeText(textInput.value);
}

