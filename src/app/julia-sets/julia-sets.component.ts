import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import * as MathJS from 'mathjs';

@Component({
  selector: 'app-julia-sets',
  templateUrl: './julia-sets.component.html',
  styleUrls: ['./julia-sets.component.css']
})
export class JuliaSetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initScene();
  }

  @ViewChild('mandelbrot')
  mandelbrot: ElementRef<HTMLCanvasElement>;

  @ViewChild('julia')
  julia: ElementRef<HTMLCanvasElement>;

  async initScene() {
    this.setDefaultDimensions(this.getContext(this.mandelbrot));
    this.setDefaultDimensions(this.getContext(this.julia));
    this.addCanvasEventListener();
  }

  setDefaultDimensions(context) {
    context.canvas.width = window.innerWidth * 20/100;
    context.canvas.height = context.canvas.width;
  }

  loading = false;

  showSpinner(show) {
    this.loading = !!show;
  }

  getContext(ref) {
    return ref.nativeElement.getContext('2d');
  }

  clear() {
    let context = this.getContext(this.mandelbrot);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context =  this.getContext(this.julia);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  size:number=1;
  gridX0:number = -1;
  gridX1:number = 1;
  gridY0:number = -1;
  gridY1:number = 1;

  redrawMandelbrot() {
    this.showSpinner(true);
    setTimeout(() => {
      this.drawMandelbrot();
      this.showSpinner(false);
    }, 1);
  }

  redrawJulia() {
    this.showSpinner(true);
    setTimeout(() => {
      this.drawJulia();
      this.showSpinner(false);
    }, 1);
  }

  drawMandelbrot() {
    let context = this.getContext(this.mandelbrot);

    for (let x = 0; x < context.canvas.width; x = x + this.size) {
      for (let y = 0; y < context.canvas.height; y = y + this.size) {
          let z = this.toComplex(x, y);
          // Maldelbrot set
          context.fillStyle = this.escape(MathJS.complex(0, 0), z);
          context.fillRect(x, y, this.size, this.size);
      }
    }
  }

  drawJulia() {
    let context = this.getContext(this.julia);

    for (let x = 0; x < context.canvas.width; x = x + this.size) {
      for (let y = 0; y < context.canvas.height; y = y + this.size) {
          let z = this.toComplex(x, y);
          // Julia set
          context.fillStyle = this.escape(z, MathJS.complex(this.lambda));
          context.fillRect(x, y, this.size, this.size);
      }
    }
  }

  escapeRadius:number = 2;

  escape(z, l) {
    const ESCAPE_LEVEL = [
      '#c1c5f5',
      '#abafeb',
      '#959be6',
      '#7d84e3',
      '#626ade',
      '#2732cf',
      '#0713ba',
      '#040d87',
      '#c1c5f5',
      '#abafeb',
      '#959be6',
      '#7d84e3',
      '#626ade',
      '#2732cf',
      '#0713ba',
      '#040d87',
      '#c1c5f5',
      '#abafeb',
      '#959be6',
      '#7d84e3',
      '#626ade',
      '#2732cf',
      '#0713ba',
      '#040d87',
      '#c1c5f5',
      '#abafeb',
      '#959be6',
      '#7d84e3',
      '#626ade',
      '#2732cf',
      '#0713ba',
      '#040d87',
      '#c1c5f5',
      '#abafeb',
      '#959be6',
      '#7d84e3',
      '#626ade',
      '#2732cf',
      '#0713ba',
      '#040d87',
      '#c1c5f5',
      '#abafeb',
      '#959be6',
    ].reverse();

    for (let i = 0; i < ESCAPE_LEVEL.length; i++) {
      z = this.f(z, l);
      if (!(z.re**2 + z.im**2 < this.escapeRadius**2)) {
        return ESCAPE_LEVEL[i];
      }
    }
    
    return '#000000';
  }

  toComplex(x, y) {
    let context = this.getContext(this.mandelbrot);
    let REAL_SET = { start: this.gridX0, end: this.gridX1 }
    let IMAGINARY_SET = { start: this.gridY0, end: this.gridY1 }
    const WIDTH = context.canvas.width;
    const HEIGHT = context.canvas.height;

    const z = {
      x: REAL_SET.start + (x / WIDTH) * (REAL_SET.end - REAL_SET.start),
      y: IMAGINARY_SET.start + (y / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
    }
    
    return MathJS.complex(z.x, z.y);
  }

  lambda:string = '-0.54 + 0.525911i';
  fz:string = "1";

  f(z, l):any {
    switch (parseInt(this.fz)) {
      case 1:
        return MathJS.add(MathJS.add(MathJS.pow(z, 7), MathJS.pow(z, 3)), l);
      case 2:
        return MathJS.add(MathJS.pow(z, 2), l);
      case 3:
        return MathJS.add(MathJS.subtract(MathJS.pow(z, 4), MathJS.pow(z, 2)), l);
      default:
        return MathJS.add(MathJS.add(MathJS.pow(z, 7), MathJS.pow(z, 3)), l);
    }
  }

  addCanvasEventListener() {
    this.getContext(this.mandelbrot).canvas.onclick = ($event) => {
      console.log($event);

      let bounds = $event.target.getBoundingClientRect();
      let offsetX = bounds.left;
      let offsetY = bounds.top;

      let mouseX = $event.clientX - offsetX;
      let mouseY = $event.clientY - offsetY;

      this.lambda = this.toComplex(mouseX, mouseY).toString();
    }
  }


}
