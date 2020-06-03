const color = '#ffe1f9';
const bg = '#fff';

export default class Visualizer {

  constructor(element, container) {

    this.canvas = element;
    this.canvas.width = container.offsetWidth;
    this.canvas.height = Math.max(container.offsetHeight, 100);
    //console.log(this.canvas);
    this.canvasContext = this.canvas.getContext("2d");
    this.lowerFrequencyStop = 8;
    this.defaultRandomWaveFactor = 30;
    this.screenHeightWaveFactor = Math.min(window.innerHeight/900, 1);
    this.waveFactor = 1; //Math.min(window.innerWidth/window.innerHeight, 1); //0.8;
    this.noPoints = 32; //128;
    //console.log('WF: ' + this.waveFactor);
    this.points = [];
    this.initialPoints = [];
    this.initialFactors = [];
    this.count = 0;

    this.animate()
  }
  setDimensions(container) {
    this.canvas.width = container.offsetWidth;
    this.canvas.height = Math.max(container.offsetHeight, 100);
  }
  animate() {
      this.count++;
      this.updateWave()
      requestAnimationFrame(() => {
        this.animate();
      })
  }
  clamp(initial, y) {


    const newY = Math.min(Math.max(y, initial), initial + 20);
    //console.log(newY, this.canvas.height/2);
    return Math.min(newY, this.canvas.height / 2);
  }
  updateWave() {


    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle= color;
    this.canvasContext.lineWidth= 1;

    this.goingUp = (this.count % (200  )) > 100;

    //console.log(this.flat)

    // BOTTOM
    this.canvasContext.moveTo(0, this.canvas.height);

    let x = 0;
    for (var i = 0; i <= this.noPoints; i++) {



      //var v = dataArrayAlt[i] / 128.0;
      //var y = (this.canvas.height)  - Math.floor(Math.random() * this.defaultRandomWaveFactor * this.waveFactor)
      const sd = i / (this.noPoints / 2)
      const factor = Math.abs(1 - sd);
      if (!this.points[i]) {
        var y = (factor * 180) + (this.canvas.height / 24)
        y -= (Math.random() * this.defaultRandomWaveFactor);
        this.initialPoints[i] = y;
        this.initialFactors[i] = factor;
        this.points[i] = y;
      }

      this.points[i] = (this.points[i] * (this.goingUp ? 1.0005 : 0.9995)) + ((Math.random() - 0.5) * 12)
      this.points[i] = this.clamp(this.initialPoints[i], this.points[i])



      this.canvasContext.lineTo(x, this.points[i]);
      x += Math.ceil((this.canvas.width / this.noPoints));

    }
    this.canvasContext.lineTo(this.canvas.width,this.canvas.height);
    this.canvasContext.lineTo(0, this.canvas.height);

    //this.canvasContext.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.stroke();
    this.canvasContext.fillStyle = color;
    this.canvasContext.fill();




    this.canvasContext.moveTo(0, 0);
    x = 0;
    for (var i = 0; i <= 128; i++) {

      //var v = dataArrayAlt[i] / 128.0;
      //var y = Math.floor(Math.random() * this.defaultRandomWaveFactor * this.waveFactor)
      var y = this.canvas.height - this.points[i];

      this.canvasContext.lineTo(x, y);
      x += Math.ceil((this.canvas.width / this.noPoints));

    }
    this.canvasContext.lineTo(this.canvas.width, 0);
    this.canvasContext.lineTo(0, 0);

    //this.canvasContext.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.stroke();
    this.canvasContext.fillStyle = bg;
    this.canvasContext.fill();



  }

}