'use strict';

import Visualizer from "../visualizer/visualizer";

import './audio-quote.scss';

export default class AudioQuote {
    constructor() {
        this.container = document.querySelector('[data-audio-quote] .audio-quote-widget-container');

        if (!this.container) {
            console.error('missing audio-quote container')
        }

        this.file = this.container.dataset.audioQuote;
        this.build();
    }

    build() {

        this.canvas = document.createElement('canvas');

        this.container.appendChild(this.canvas)

        this.visualizer = new Visualizer(this.canvas);

        console.log(this.file)


    }

}