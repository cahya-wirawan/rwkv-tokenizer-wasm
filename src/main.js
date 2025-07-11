import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import init, { WorldTokenizer } from 'rwkv-tokenizer-web';

let tokenizer = null;

async function run() {
  await init();
  tokenizer = new WorldTokenizer();
}

run();


window.encodeText = function encodeText(str) {
    if (!tokenizer) {
        console.error("Tokenizer is not initialized.");
        return;
    }
    return tokenizer.encode(str);
}

window.updateCharacterCount = function updateCharacterCount(textAreaElement, lengthSpanElement) {
    const length = textAreaElement.value.length;
    lengthSpanElement.textContent = `(${length} characters)`;
}

window.updateTokenCount = function updateTokenCount(textAreaElement, lengthSpanElement) {
    const length = textAreaElement.value.split(',').length;
    lengthSpanElement.textContent = `(${length} tokens)`;
}

window.updateAll = function updateAll() {
    // Get references to the input and output text areas
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    // Get references to the length display spans
    const inputLengthSpan = document.getElementById('inputLength');
    const outputLengthSpan = document.getElementById('outputLength');

    // Add an event listener to the input text area
    // The 'input' event fires whenever the value of an <input>, <select>, or <textarea> element has been changed.
    inputText.addEventListener('input', () => {
        // Get the current value from the input text area
        const inputValue = inputText.value;
        // Encode the input value
        const encodedText = encodeText(inputValue);
        // Set the token ids to the output text area
        outputText.value = encodedText.join(', ');
        updateCharacterCount(inputText, inputLengthSpan);
        updateTokenCount(outputText, outputLengthSpan);
    });
}