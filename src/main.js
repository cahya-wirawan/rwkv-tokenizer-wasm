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

const MIN_HUE_DIFFERENCE = 50; // Minimum difference between hues
let hue = 0;

function getRandomColor() {
    let newHue = 0;
    do {
        newHue = Math.floor(Math.random() * 360);
    } while (Math.abs(newHue-hue)<MIN_HUE_DIFFERENCE || Math.abs(newHue-hue)>(360-MIN_HUE_DIFFERENCE));
    hue = newHue; // Ensure the new hue is different from the previous one
    const saturation = Math.floor(Math.random() * 20 + 80);
    const lightness = Math.floor(Math.random() * 10 + 80);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
}

window.encodeText = function encodeText(str) {
    if (!tokenizer) {
        console.error("Tokenizer is not initialized.");
        return;
    }
    return tokenizer.encode(str);
}

window.decodeNumbers = function decodeNumbers(numbers) {
    if (!tokenizer) {
        console.error("Tokenizer is not initialized.");
        return;
    }
    return tokenizer.decode(numbers);
}

window.updateCharacterCount = function updateCharacterCount(textAreaElement, lengthSpanElement) {
    const length = textAreaElement.value.length;
    lengthSpanElement.textContent = `(${length} characters)`;
}

window.updateTokenCount = function updateTokenCount(length, lengthSpanElement) {
    lengthSpanElement.textContent = `(${length} tokens)`;
}

window.updateAll = function updateAll() {
    // Get references to the input and output text areas
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    // Get references to the length display spans
    const inputLengthSpan = document.getElementById('inputLength');
    const outputLengthSpan = document.getElementById('outputLength');
    const textBtn = document.getElementById('output-text-btn');
    const tokenBtn = document.getElementById('output-token-btn');
    let colorPalette = {};

    let isTokenMode = true;

    function updateButtonStates() {
        if (isTokenMode) {
            tokenBtn.classList.add('btn-active');
            textBtn.classList.remove('btn-active');
        } else {
            textBtn.classList.add('btn-active');
            tokenBtn.classList.remove('btn-active');
        }
    }

    function handleInput() {
        if (tokenizer === null) {
            return;
        }
        const inputValue = inputText.value;

        const encodedText = encodeText(inputValue);
        console.log("Encoded Text:", encodedText);

        if (isTokenMode) {            
            outputText.innerHTML = encodedText.join(', ');
        } else {
            let coloredTokens = [];
            encodedText.forEach(element => {
                let ch = decodeNumbers([element]);
                console.log("Decoded Number:", [element]);
                console.log("Decoded Character:", ch);             
                if (!colorPalette[element]) {
                    colorPalette[element] = getRandomColor(); // Assign a random color if not already assigned
                }
                if( ch.search(/\n/) !== -1) {
                    let newCh = "";
                    ch.split('').forEach(item => {
                        if (item === "\n") {
                            coloredTokens.push(`<br>`);
                        } else {
                            newCh += item;
                        }
                    });
                    ch = newCh;
                }
                coloredTokens.push(`<span style="background-color: ${colorPalette[element]};">${ch}</span>`);
            });
            outputText.innerHTML = coloredTokens.join('');
        }

        updateCharacterCount(inputText, inputLengthSpan);
        updateTokenCount(encodedText.length, outputLengthSpan);
    }
    
    inputText.addEventListener('input', handleInput);

    textBtn.addEventListener('click', () => {
        isTokenMode = false;
        updateButtonStates();
        handleInput(); // Re-process text with new mode
    });

    tokenBtn.addEventListener('click', () => {
        isTokenMode = true;
        updateButtonStates();
        handleInput(); // Re-process text with new mode
    });

    // Initial setup when the page loads
    updateButtonStates(); // Set initial button active state
    handleInput(); // Process any initial text

}