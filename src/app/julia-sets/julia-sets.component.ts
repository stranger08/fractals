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

  @ViewChild('scene')
  scene: ElementRef<HTMLCanvasElement>;
  sceneNative;
  chart: Chart;

  async initScene() {
    this.sceneNative = this.scene.nativeElement;
    let context = this.sceneNative.getContext('2d');
    context.canvas.width = window.innerWidth * 40/100;
    context.canvas.height = context.canvas.width;
  }

  loading = false;

  showSpinner(show) {
    this.loading = !!show;
  }

  clear() {
    let context = this.sceneNative.getContext('2d');
    context.clearRect(0, 0, this.sceneNative.width, this.sceneNative.height);
  }

  redraw() {
    this.showSpinner(true);
    this.clear();
    setTimeout(() => {
      this.draw();
      this.showSpinner(false);
    }, 1);
  }

  size:number=2;
  gridX0:number = -1;
  gridX1:number = 1;
  gridY0:number = -1;
  gridY1:number = 1;

  draw() {
    let context = this.sceneNative.getContext('2d');

    for (let x = 0; x < context.canvas.width; x = x + 1) {
      for (let y = 0; y < context.canvas.height; y = y + 1) {
          let z = this.toComplex(x, y);
          context.fillStyle = this.escape(z);
          context.fillRect(x, y, 1, 1);
      }
    }
  }

  escapeRadius:number = 2;

  escape(z) {
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
      z = this.f(z);
      if (!(z.re**2 + z.im**2 < this.escapeRadius**2)) {
        return ESCAPE_LEVEL[i];
      }
    }
    
    return '#000000';
  }

  toComplex(x, y) {
    let context = this.sceneNative.getContext('2d');
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

  lambda:string = '-0.54 + 0.54i';

  f(z):any {
    return MathJS.add(MathJS.add(MathJS.pow(z, 7), MathJS.pow(z, 3)), MathJS.complex(this.lambda));// -0.70176 - 0.3842i
    // return MathJS.add(MathJS.pow(z, 2), MathJS.complex(this.lambda));// -0.835 - 0.2321i for cool expiriences :) 
  }
}
