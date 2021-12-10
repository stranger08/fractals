import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExamplesService } from '../examples.service';
import { LSystemsService } from '../lsystems.service';

import RealTurtle from 'real-turtle';

@Component({
  selector: 'app-l-systems',
  templateUrl: './l-systems.component.html',
  styleUrls: ['./l-systems.component.css']
})
export class LSystemsComponent implements OnInit {

  @ViewChild('scene')
  scene: ElementRef<HTMLCanvasElement>;
  sceneNative;
  loading = false;

  settings = {
    axiom: 'F',
    iterations: 0,
    formula: "F:F+F--F+F",
    angle: 60,
    length: "1300",
    ratio: "0.333",
    x: "100",
    y: "500",
  }

  constructor(
    private lService: LSystemsService,
    private examplesService: ExamplesService,
  ) {

  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.initScene();
  }


  async initScene() {
    this.sceneNative = this.scene.nativeElement;
    this.sceneNative.width = window.innerWidth * 94/100;
    this.sceneNative.height = window.innerHeight * 7/10;
    this.redraw();
  }

  redraw() {
    this.clear();
    setTimeout(() => {
      this.draw();
    }, 1);
  }

  draw() {
      let paintInstructions = this.lService.produce(this.settings.axiom, this.settings.formula, this.settings.iterations);
      console.log(paintInstructions);
      let turtle = new RealTurtle(this.sceneNative, {});
      turtle.setIcon("");
      turtle.setSpeed(1);
      turtle.setPosition(eval(this.settings.x), eval(this.settings.y));
      turtle.penDown();
      turtle.beginPath();
      turtle.right(90);
      let stepSize = this.settings.iterations > 0
        ? eval(this.settings.length) * eval(this.settings.ratio)**this.settings.iterations
        : eval(this.settings.length);
      for (let c of paintInstructions) {
        switch (c) {
          case 'F':
            turtle.forward(stepSize);
            break;
          case 'I':
            turtle.penUp();
            turtle.forward(stepSize);
            turtle.penDown();
            break;
          case '+':
            turtle.left(this.settings.angle);
            break;
          case '-':
            turtle.right(this.settings.angle);
            break;
          default:
            continue;
        }
      }
      turtle.start();
      turtle.closePath();
    }
 

  scenePosition(point) {
    const canvas = this.scene.nativeElement;

    return {
      x: canvas.width / 2 + point.x,
      y: canvas.height / 2 - point.y,
    }
  };

  clear() {
    let context = this.sceneNative.getContext('2d');
    context.clearRect(0, 0, this.sceneNative.width, this.sceneNative.height);
  }

  examples:any = [
    {
      name: "Koch",
      settings: this.lService.koch(),
    },
    {
      name: "Quadratic",
      settings: this.lService.quadratic(),
    },
    {
      name: "Snowflake",
      settings: this.lService.snowflake(),
    },
    {
      name: "Cantor",
      settings: this.lService.cantor(),
    },
  ];

  loadExamples(i) {
    this.settings = this.examples[i].settings;
  }

}
