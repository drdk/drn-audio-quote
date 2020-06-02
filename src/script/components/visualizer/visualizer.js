
export default class Visualizer {

  constructor(element) {

    this.canvas = element;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    //console.log(this.canvas);
    this.canvasContext = this.canvas.getContext("2d");
    this.lowerFrequencyStop = 8;
    this.defaultRandomWaveFactor = 50;
    this.screenHeightWaveFactor = Math.min(window.innerHeight/900, 1);
    this.waveFactor = 1; //Math.min(window.innerWidth/window.innerHeight, 1); //0.8;

    //console.log('WF: ' + this.waveFactor);
    this.points = [];

    this.animate()
  }

  animate() {

      this.updateWave()
      requestAnimationFrame(() => {
        this.animate();
      })
  }

  updateWave() {


    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle= '#fff';
    this.canvasContext.lineWidth= 1;



    // BOTTOM
    this.canvasContext.moveTo(0, this.canvas.height);

    let x = 0;
    for (var i = 0; i < 128; i++) {

      //var v = dataArrayAlt[i] / 128.0;
      var y = (this.canvas.height)  - Math.floor(Math.random() * this.defaultRandomWaveFactor * this.waveFactor)
      //var y = this.canvas.height -
      this.canvasContext.lineTo(x, y);
      x += Math.floor((this.canvas.width / 128) * 2);

    }
    this.canvasContext.lineTo(this.canvas.width,this.canvas.height);
    this.canvasContext.lineTo(0, this.canvas.height);

    //this.canvasContext.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.stroke();
    this.canvasContext.fillStyle="#fff";
    this.canvasContext.fill();




    this.canvasContext.moveTo(0, 0);
    x = 0;
    for (var i = 0; i < 128; i++) {

      //var v = dataArrayAlt[i] / 128.0;
      var y = Math.floor(Math.random() * this.defaultRandomWaveFactor * this.waveFactor)
      this.canvasContext.lineTo(x, y);
      x += Math.floor((this.canvas.width / 128) * 2);

    }
    this.canvasContext.lineTo(this.canvas.width, 0);
    this.canvasContext.lineTo(0, 0);

    //this.canvasContext.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.stroke();
    this.canvasContext.fillStyle="#fff";
    this.canvasContext.fill();



  }

  updateVisual(analyser) {

    analyser.fftSize = 256;
    var bufferLengthAlt = analyser.frequencyBinCount;

    var dataArrayAlt = new Uint8Array(bufferLengthAlt);

    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasContext.beginPath();
    analyser.getByteFrequencyData(dataArrayAlt);
    this.canvasContext.strokeStyle= '#fff';
    /*
    this.canvasContext.fillStyle = '#fff';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);*/

    this.canvasContext.lineWidth= 1;

    // BOTTOM
    this.canvasContext.moveTo(0, this.canvas.height);

    let x = 0;
    for (var i = this.lowerFrequencyStop; i < bufferLengthAlt; i++) {

      //var v = dataArrayAlt[i] / 128.0;
      var y = (this.canvas.height)  - Math.floor(dataArrayAlt[i]*this.waveFactor*this.screenHeightWaveFactor)
      this.canvasContext.lineTo(x, y);
      x += Math.floor((this.canvas.width / bufferLengthAlt) * 2);
    }
    this.canvasContext.lineTo(this.canvas.width,this.canvas.height);
    this.canvasContext.lineTo(0, this.canvas.height);

    //this.canvasContext.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.stroke();
    this.canvasContext.fillStyle="#fff";
    this.canvasContext.fill();



    // TOP
    this.canvasContext.moveTo(0, 0);
    x = 0;
    for (var i = this.lowerFrequencyStop; i < bufferLengthAlt; i++) {

      //var v = dataArrayAlt[i] / 128.0;
      var y =  Math.floor(dataArrayAlt[i]*this.waveFactor*this.screenHeightWaveFactor)
      this.canvasContext.lineTo(x, y);
      x += Math.floor((this.canvas.width / bufferLengthAlt) * 2);

    }
    this.canvasContext.lineTo(this.canvas.width, 0);
    this.canvasContext.lineTo(0, 0);

    //this.canvasContext.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.stroke();
    this.canvasContext.fillStyle="#fff";
    this.canvasContext.fill();





  }
}