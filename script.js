let optionButtons = document.querySelectorAll(".editor-button");
let textEditor = document.getElementById("editor-text");
let wordCountDisplay = document.getElementById("wordCountDisplay");
let charCountDisplay = document.getElementById("charCountDisplay");
let colorPicker = document.getElementById("colorPicker");
let clearButton = document.getElementById("clearButton");

const modifyText = (command, defaultUI, value = null) => {
  let selection = window.getSelection();
  let selectedText = selection.toString();

  switch (command) {
    case "capitalize":
      document.execCommand("styleWithCSS", defaultUI, true);
      document.execCommand("formatBlock", false, "p");
      document.execCommand("fontSize", false, "4");
      document.execCommand("insertText", false, selectedText.toUpperCase());
      break;
    case "uppercase":
      document.execCommand("styleWithCSS", defaultUI, true);
      document.execCommand("fontSize", false, "4");
      document.execCommand("insertText", false, selectedText.toUpperCase());
      break;
    case "lowercase":
      document.execCommand("styleWithCSS", defaultUI, true);
      document.execCommand("fontSize", false, "1");
      document.execCommand("insertText", false, selectedText.toLowerCase());
      break;
    case "colorPicker":
      document.execCommand("styleWithCSS", defaultUI, true);
      document.execCommand("foreColor", false, value);
      break;
    default:
      document.execCommand(command, defaultUI, value);
  }
  updateCounts();
};

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let command = button.id;
    modifyText(command, false);
  });
});

colorPicker.addEventListener("input", (event) => {
  let value = event.target.value;
  modifyText("colorPicker", false, value);
});

document.getElementById("textAlign").addEventListener("change", (event) => {
  let value = event.target.value;
  document.execCommand("justify" + value, false, null);
});

clearButton.addEventListener("click", () => {
  textEditor.innerHTML = "";
  updateCounts();
});

const updateCounts = () => {
  let text = textEditor.innerText;
  let words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  let characters = text.length;
  wordCountDisplay.innerText = `Words: ${words}`;
  charCountDisplay.innerText = `Characters: ${characters}`;
};

textEditor.addEventListener("input", updateCounts);
