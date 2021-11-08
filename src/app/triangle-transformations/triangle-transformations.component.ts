import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-triangle-transformations',
  templateUrl: './triangle-transformations.component.html',
  styleUrls: ['./triangle-transformations.component.css']
})
export class TriangleTransformationsComponent implements OnInit {

  @ViewChild('scene')
  scene: ElementRef<HTMLCanvasElement>;
  sceneNative;

  triangles = {
    start: {
      AX: 100,
      AY: 100,
      BX: 100,
      BY: 500,
      CX: 500,
      CY: 500,
    },
    finish: {
      AX: 800,
      AY: 100,
      BX: 1200,
      BY: 100,
      CX: 700,
      CY: 600,
    },
  }

  matrix = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };

  offset = {
    x: 0,
    y: 0,
  }

  constructor() { }

  ngOnInit(): void {
    window.onscroll = window.onresize = this.initScene.bind(this);
  }

  ngAfterViewInit() {
    this.initScene();
  }

  initScene() {
    this.sceneNative = this.scene.nativeElement;
    //const context = this.scene.nativeElement.getContext('2d');
    this.sceneNative.width = window.innerWidth - 200;
    this.sceneNative.height = this.sceneNative.width / 2;
    this.draw();
  }

  onTriangleInputsUpdated($event) {
    //this.triangles[$event.id] = $event;
    this.draw();
  }

  clear() {
    let context = this.sceneNative.getContext('2d');
    context.clearRect(0, 0, this.sceneNative.width, this.sceneNative.height);
  }

  draw() {
    this.clear();
    this.drawTriangle(this.triangles.start);
    this.drawTriangle(this.triangles.finish);
  }

  drawTriangle(t) {
    let context = this.scene.nativeElement.getContext('2d');
    context.beginPath()
    context.moveTo(t.AX, t.AY);
    context.lineTo(t.BX, t.BY);
    context.lineTo(t.CX, t.CY);
    context.lineTo(t.AX, t.AY);
    context.stroke();
  }
}
