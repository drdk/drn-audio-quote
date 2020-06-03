const color = '#ffe1f9';
const bg = '#fff';

import './visualizer.scss';

export default class Visualizer {

  constructor(element, container) {

    this.element = element;


    this.element.id = 'visualizer-blocks'



    for (let n=0; n < 10; n++) {
      const block = document.createElement('div');
      block.classList.add('visualizer-block')
      this.element.appendChild(block);


    }


  }



}