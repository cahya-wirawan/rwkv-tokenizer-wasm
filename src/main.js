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