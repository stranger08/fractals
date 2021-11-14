import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AffineTransformationService } from "../affine-transformation.service";

@Component({
  selector: 'app-group-transformations',
  templateUrl: './group-transformations.component.html',
  styleUrls: ['./group-transformations.component.css']
})
export class GroupTransformationsComponent implements OnInit {

  @ViewChild('scene')
  scene: ElementRef<HTMLCanvasElement>;
  sceneNative;

  constructor(private transformationService: AffineTransformationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initScene();
  }

  rectangle = [
    {
      x: -200,
      y: -200,
    },
    {
      x: -200,
      y: 200,
    },
    {
      x: 200,
      y: 200,
    },
    {
      x: 200,
      y: -200,
    }
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

  transformations = [
      {
        matrix: {
          a: 0.2,
          b: -0.52,
          c: 0.3,
          d: 0.52,
        },
        offset: {
          x: -75,
          y: 70,
        }
      },
      {
        matrix: {
          a: 0.35,
          b: 0.4,
          c: -0.19,
          d: 0.25,
        },
        offset: {
          x: 90,
          y: 40,
        }
      },
    {
      matrix: {
        a: -0.5,
        b: 0,
        c: 0,
        d: 0.42,
      },
      offset: {
        x: 30,
        y: -10,
      }
    },
    {
      matrix: {
        a: -0.054,
        b: -0.07,
        c: 0.011,
        d: -0.5,
      },
      offset: {
        x: 20,
        y: -90,
      }
    },
    {
      matrix: {
        a: -0.056,
        b: 0.002,
        c: -0.055,
        d: -0.496,
      },
      offset: {
        x: 30,
        y: -90,
      }
    },
  ];

  initScene() {
    this.sceneNative = this.scene.nativeElement;
    this.sceneNative.width = window.innerWidth * 2/3;
    this.sceneNative.height = window.innerHeight * 8/10;
    this.drawRect(this.rectangle);
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
      console.log(origin);
      let transformed = this.transformationService.transformAll(origin, t.matrix, t.offset);
      console.log(transformed);
      if (depth == 0) {
        this.drawRect(transformed);
      } else {
        this.draw(depth - 1, transformed);
      }
    }
  }

  clear() {
    let context = this.sceneNative.getContext('2d');
    context.clearRect(0, 0, this.sceneNative.width, this.sceneNative.height);
  }

}
