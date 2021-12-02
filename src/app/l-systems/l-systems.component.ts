import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExamplesService } from '../examples.service';

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
  iterations: number = 0;
  formula: string = "F"

  constructor(
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
    this.sceneNative.height = window.innerHeight * 8/10;
    this.redraw();
  }

  redraw() {
    this.clear();
    setTimeout(() => {
      this.draw();
    }, 1);
  }

  draw() {
      let context = this.sceneNative.getContext('2d');
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(100, 100);
      context.strokeStyle = "white";
      context.stroke();
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
}
