# RWKV Tokenizer Visualization

The RWKV tokenizer is a subword-level tokenizer used across RWKV language models to convert text to integer token IDs and back. It segments text into frequently occurring sub-words or characters, mapping them to a finite vocabulary of around 50,000 tokens (in case of RWKV World Tokenizer used in RWKV 5 and newer).

This repository provides [a web application](https://cahya-wirawan.github.io/rwkv-tokenizer-wasm/) to visualise the tokenization using the RWKV World Tokenizer. It runs entirely in the web browser thanks to the WebAssembly version of the original Rust RWKV Tokeniser.