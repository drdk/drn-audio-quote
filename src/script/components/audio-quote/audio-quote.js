'use strict';

import Visualizer from "../visualizer/visualizer";

import './audio-quote.scss';

export default class AudioQuote {
    constructor() {
        this.element  = document.querySelector('[data-audio-quote]');


        this.container = this.element.querySelector('.audio-quote-widget-container');


        if (!this.container) {
            console.error('missing audio-quote container')
        }


        this.file = this.element.dataset.audioQuote;
        console.log()
        if (!this.file) {
            console.error('missing audio-quote file')
        }

        this.playing = false;

        this.build();
    }

    build() {

        this.visualizerElement = document.createElement('div');

        this.container.appendChild(this.visualizerElement)

        this.visualizer = new Visualizer(this.visualizerElement, this.element);

        this.audio = document.createElement('audio');
        this.audio.setAttribute('preload', 'auto')
        this.audio.setAttribute('loop', true)
        this.audio.src = this.file;

        this.audio.addEventListener('canplaythrough', () => {
            console.log('loaded')
            this.setLoaded()
        }, false);

        window.addEventListener('resize',  () => {


            // only run if we're not throttled
            /*if (!this.throttled) {
                // actual callback action
                this.handleResize();
                // we're throttled!
                this.throttled = true;
                // set a timeout to un-throttle
                setTimeout(function () {
                    this.throttled = false;
                }, 250);
            }*/
            clearTimeout(this.timeout);
            // start timing for event "completion"
            this.timeout = setTimeout(() => {
                this.handleResize();
            }, 200);
        });

        this.toggleButton = document.createElement('button')
        this.toggleButton.id = 'toggle-button'
        this.toggleButton.innerHTML = `
            <svg version="1.1" id="sound" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <style type="text/css">
                .bg{fill:#FF001E;}
                .color{fill:#FFFFFF;}
            </style>
            <g>
                <g>
                    <circle class="bg" cx="25" cy="25" r="25"/>
                </g>
                <g>
                    <polygon class="color" points="16.7,21.2 12.7,21.2 12.7,29.3 16.7,29.3 23.2,34 23.2,16.5 		"/>
                    <path class="color mute" d="M28.1,33.2l-1.7-1.7c3.4-3.5,3.4-9,0-12.5l1.7-1.7c2.1,2.1,3.3,5,3.3,8S30.3,31.1,28.1,33.2z"/>
                    <path class="color mute" d="M32.8,37.3L31,35.5c5.6-5.7,5.6-14.9,0-20.6l1.7-1.7C39.3,19.9,39.3,30.6,32.8,37.3z"/>

                    <polygon  class="color sound" points="38.5,21.9 36.8,20.2 33.2,23.8 29.6,20.2 27.9,21.9 31.5,25.5 27.9,29.1 29.6,30.8 33.2,27.2
                        36.8,30.8 38.5,29.1 34.9,25.5 		"/>
                </g>
            </g>
            </svg>

        `;

        this.controls = document.createElement('div');
        this.controls.id = 'controls'

        this.progress = document.createElement('div');
        this.progress.id = 'progress'

        this.element.appendChild(this.controls)

        this.controls.appendChild(this.audio)
        this.controls.appendChild(this.progress)
        this.controls.appendChild(this.toggleButton)
        console.log(this.file)


    }

    handleResize() {
        console.log('handle r5esize')
        this.visualizer.setDimensions(this.element)
    }
    setLoaded() {


        this.updateProgress()

        this.toggleButton.addEventListener('click', () => {
            if (this.playing) {
                this.audio.pause()
            } else {
                this.audio.play()
            }
            this.playing = !this.playing;
            console.log('Palying : ' + this.playing)
            this.toggleButton.classList.toggle("playing", this.playing);
        })

    }
    setProgress() {
        let time = Math.round(this.audio.duration - this.audio.currentTime).toString();
        this.time = (time.length < 2) ? '0' + time : time;
        if (this.time != this.currentTime) {
            this.progress.innerText = `00:${this.time}`;
            this.currentTime = this.time
        }
    }
    updateProgress() {

        this.setProgress()
        requestAnimationFrame(() => {
            //this.progress
            this.updateProgress();
        })
    }

}