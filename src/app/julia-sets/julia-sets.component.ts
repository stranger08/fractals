import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as MathJS from 'mathjs';

@Component({
  selector: 'app-julia-sets',
  templateUrl: './julia-sets.component.html',
  styleUrls: ['./julia-sets.component.css']
})
export class JuliaSetsComponent implements OnInit {

  COLOR_SET:any = [
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

  ROOT_COLOR_SET:any = [
    '#2732cf',
    '#0713ba',
    '#040d87',
    '#c1c5f5',
    '#abafeb',
    '#959be6',
    '#7d84e3',
  ]

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

  @ViewChild('newton')
  newton: ElementRef<HTMLCanvasElement>;

  async initScene() {
    this.setDefaultDimensions(this.getContext(this.mandelbrot));
    this.setDefaultDimensions(this.getContext(this.julia));
    this.setDefaultDimensions(this.getContext(this.newton));
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
    context =  this.getContext(this.newton);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.showRoots = false;
    this.roots = [];
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

  redrawNewton() {
    this.showSpinner(true);
    setTimeout(() => {
      this.drawNewton();
      this.showSpinner(false);
    }, 1);
  }

  drawMandelbrot() {
    let context = this.getContext(this.mandelbrot);

    for (let x = 0; x < context.canvas.width; x = x + this.size) {
      for (let y = 0; y < context.canvas.height; y = y + this.size) {
          let z = this.toComplex(x, y);
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
          context.fillStyle = this.escape(z, MathJS.complex(this.lambda));
          context.fillRect(x, y, this.size, this.size);
      }
    }
  }

  r:string = '0.0001';
  showRoots:boolean = false;
  roots:any = [];

  drawNewton() {
    let context = this.getContext(this.newton);
    let d = (x, y) => Math.sqrt((y.re - x.re)**2 + (y.im - x.im)**2);
    let roots = [];
    let rootsD = [];
    console.log(context.canvas.width * context.canvas.height);

    for (let x = 0; x < context.canvas.width; x = x + this.size) {
      for (let y = 0; y < context.canvas.height; y = y + this.size) {
          let z = this.toComplex(x, y);
          let ninth = this.fnewton(z, this.lambda, 9);
          let tenth = this.fnewton(z, this.lambda, 10);
          let distance = d(ninth, tenth);

          if (parseFloat(this.r) > distance) {
            let rootIndex = roots.findIndex(root => parseFloat(this.r) > d(root, tenth));
            if (rootIndex > -1) {
              context.fillStyle = this.ROOT_COLOR_SET[rootIndex];
            } else {
              roots.push(tenth);
              rootsD.push(d(ninth, tenth));
              context.fillStyle = this.ROOT_COLOR_SET[roots.length - 1];
            }
          } else {
            context.fillStyle = '#000000'
          }
          context.fillRect(x, y, this.size, this.size);
      }
    }
    this.showRoots = true;
    this.roots = roots.map(r => r.toString());
  }

  escapeRadius:number = 2;

  escape(z, l) {
    for (let i = 0; i < this.COLOR_SET.length; i++) {
      z = this.f(z, l);
      if (!(z.re**2 + z.im**2 < this.escapeRadius**2)) {
        return this.COLOR_SET[i];
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

  lambda:string = '0.36510416666666656 + 0.6507440476190476i';
  fz:string = "1";

  f(z, l):any {
    switch (parseInt(this.fz)) {
      case 1:
        return MathJS.add(MathJS.add(MathJS.pow(z, 7), MathJS.pow(z, 3)), l);
      case 2:
        return MathJS.add(MathJS.pow(z, 2), l);
      case 3:
        return MathJS.add(MathJS.subtract(MathJS.pow(z, 4), MathJS.pow(z, 2)), l);
      case 4:
        return MathJS.add(MathJS.multiply(l, MathJS.pow(z, 3)), MathJS.add(MathJS.pow(z, 2), l));
      default:
        return MathJS.add(MathJS.pow(z, 2), l);
    }
  }

  fnewton(z, l, iterations) {
    for (let i = 0; i < iterations; i++) {
      z = MathJS.subtract(z, MathJS.divide(this.f(z, l), this.fderivative(z, l)));
    }
    return z;
  }

  fderivative(z, l) {
    switch (parseInt(this.fz)) {
      case 1:
        return MathJS.add(
                MathJS.multiply(7, MathJS.pow(z, 6)),
                MathJS.multiply(3, MathJS.pow(z, 2)));
      case 2:
        return MathJS.multiply(z, 2);
      case 3:
        return MathJS.subtract(
                MathJS.multiply(4, MathJS.pow(z, 3)),
                MathJS.multiply(2, z));
      case 4:
        return MathJS.add(
                MathJS.multiply(
                  MathJS.multiply(l, MathJS.complex(3, 0)),
                  MathJS.pow(z, 2)),
                MathJS.multiply(z, MathJS.complex(2, 0)));
      default:
        return MathJS.multiply(z, 2);
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
