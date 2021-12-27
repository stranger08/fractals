import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fractals';

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  lab = 7;

  @ViewChild('tooltip')
  vertexTooltip: ElementRef<HTMLDivElement>;
  tooltipText;

  public context: CanvasRenderingContext2D;

  constructor() {
  }

}
