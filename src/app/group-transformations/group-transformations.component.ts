import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AffineTransformationService } from '../affine-transformation.service';
import { ExamplesService } from '../examples.service';

import linear from 'linear-solve';

@Component({
  selector: 'app-group-transformations',
  templateUrl: './group-transformations.component.html',
  styleUrls: ['./group-transformations.component.css']
})
export class GroupTransformationsComponent implements OnInit {

  @ViewChild('scene')
  scene: ElementRef<HTMLCanvasElement>;
  sceneNative;

  loading = false;

  constructor(
    private examplesService: ExamplesService,
    private transformationService: AffineTransformationService
  ) { 

  }

  ngOnInit(): void {
    this.transformations = this.examplesService.tree();
  }

  ngAfterViewInit() {
    this.initScene();
  }

  rectangle = [
    {
      x: -300,
      y: -300,
    },
    {
      x: -300,
      y: 300,
    },
    {
      x: 300,
      y: 300,
    },
    {
      x: 300,
      y: -300,
    }
  ];

  rectangles = [
    [
      {
        x: -10,
        y: -100,
      },
      {
        x: -220,
        y: 75,
      },
      {
        x: -150,
        y: 210,
      },
      {
        x: 60,
        y: 40,
      }
    ],
    [
      {
        x: -80,
        y: 30,
      },
      {
        x: 70,
        y: 170,
      },
      {
        x: 240,
        y: 70,
      },
      {
        x: 75,
        y: -75,
      }
    ],
    [
      {
        x: 140,
        y: -100,
      },
      {
        x: 140,
        y: 95,
      },
      {
        x: -100,
        y: 95,
      },
      {
        x: -100,
        y: -100,
      }
    ],
    [
      {
        x: 5,
        y: 0,
      },
      {
        x: 30,
        y: -10,
      },
      {
        x: 20,
        y: -190,
      },
      {
        x: -5,
        y: -180,
      },
    ],
    [
      {
        x: 45,
        y: -170,
      },
      {
        x: 22,
        y: -200,
      },
      {
        x: 0,
        y: -20,
      },
      {
        x: 25,
        y: 15,
      }
    ]
  ];

  matrix = {
    a: 6,
    b: 3,
    c: 2,
    d: -1,
  };

  offset = {
    x: 0,
    y: 200,
  }

  transformations = [];

  async initScene() {
    this.sceneNative = this.scene.nativeElement;
    this.sceneNative.width = window.innerWidth * 2/3;
    this.sceneNative.height = window.innerHeight * 8/10;
    this.drawRect(this.rectangle);

    // for (let r of this.rectangles) {
    //   this.drawRect(r);
    //   await this.calculateTransformations(this.rectangle, r);
    // }
  }

  async calculateTransformations(origin, transformed) {
    const X = linear.solve([
      [origin[0].x, origin[0].y, 1],
      [origin[1].x, origin[1].y, 1],
      [origin[2].x, origin[2].y, 1],
      [origin[3].x, origin[3].y, 1],
    ],
      [transformed[0].x, transformed[1].x, transformed[2].x, transformed[3].x]
    );

    const Y = linear.solve([
      [origin[0].x, origin[0].y, 1],
      [origin[1].x, origin[1].y, 1],
      [origin[2].x, origin[2].y, 1],
      [origin[3].x, origin[3].y, 1],
    ],
      [transformed[0].y, transformed[1].y, transformed[2].y, transformed[3].y]
    );

    const T = {
      matrix: {
        a: X[0],
        b: X[1],
        c: Y[0],
        d: Y[1],
      },
      offset: {
        x: X[2],
        y: Y[2],
      }
    }

    this.transformations.push(T);
  }

  onTransformationSettingsUpdate($event) {
  }

  scenePosition(point) {
    const canvas = this.scene.nativeElement;

    return {
      x: canvas.width / 2 + point.x,
      y: canvas.height / 2 - point.y,
    }
  };

  drawRect(rect) {
      let context = this.scene.nativeElement.getContext('2d');
      const startPoint = this.scenePosition(rect[rect.length - 1]);
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      for (let point of rect) {
        let p = this.scenePosition(point);
        context.lineTo(p.x, p.y);
      }
      context.strokeStyle = "white";
      context.stroke();
  }

  iterations = 1;

  draw(depth = this.iterations, origin = this.rectangle) {
    for (let t of this.transformations) {
      let transformed = this.transformationService.transformAll(origin, t.matrix, t.offset);
      if (depth == 0) {
        this.drawRect(transformed);
      } else {
        this.draw(depth - 1, transformed);
      }
    }
  }

  redraw() {
    this.clear();
    this.draw();
  }

  clear() {
    let context = this.sceneNative.getContext('2d');
    context.clearRect(0, 0, this.sceneNative.width, this.sceneNative.height);
  }

  removeTransformation(i) {
    this.transformations.splice(i, 1)
  }

  addTransformation() {
    const DEFAULT_TRANSFORMATION = this.examplesService.exact();
    this.transformations.push(DEFAULT_TRANSFORMATION);
  }

  showSpinner(show) {
    this.loading = !!show;
  }

}
