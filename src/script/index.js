import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

import AudioQuote from "./components/audio-quote/audio-quote";
import '../styles/styles.scss';

let ex = new AudioQuote();
console.log('Hello Parcels', process.env.DEBUGGING);