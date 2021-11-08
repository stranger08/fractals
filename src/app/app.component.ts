import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'koch-fractal';

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('tooltip')
  vertexTooltip: ElementRef<HTMLDivElement>;
  tooltipText;

  public context: CanvasRenderingContext2D;

  constructor() {
    Chart.register(...registerables);
  }

}
