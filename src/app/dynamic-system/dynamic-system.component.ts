import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dynamic-system',
  templateUrl: './dynamic-system.component.html',
  styleUrls: ['./dynamic-system.component.css']
})
export class DynamicSystemComponent implements OnInit {

  constructor() { }

  //
  // f(x) = ax / (1+rx)^5
  //

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
    context.canvas.width = window.innerWidth * 3/4;
    context.canvas.height = window.innerHeight * 8/10;
  }

  loading = false;

  showSpinner(show) {
    this.loading = !!show;
  }

  clear() {
    this.chart.data.labels = [];
    this.chart.data.datasets = [];
    this.chart.update();
  }

  a:number = 30;
  r:number = 1/20;
  x0:number = 1;
  i:number = 50;


  drawTimeline() {
    let context = this.sceneNative.getContext('2d');
    context.canvas.width = window.innerWidth * 3/4;
    context.canvas.height = window.innerHeight * 8/10;
    this.chart = new Chart(context, {
      type: 'line',
      data: {
          labels: [],
          datasets: [],
      },
    });
    this.chart.data.labels = [];
    this.chart.data.datasets = [{
      label: 'Timeline',
      lineTension: 0,
      data: [],
      backgroundColor: null,
      borderColor: 'red',
      fill: 'none',
      borderWidth: 1
    }];
    let x = this.x0;
    for (let i = 0; i < this.i; i++) {
      x = (this.a * x) / ((1 + this.r * x) ** 5);
      this.chart.data.labels.push(`f${i}`);
      this.chart.data.datasets[0].data.push(x);
    }
    this.chart.update();
  }

  drawIteration() {
    let context = this.sceneNative.getContext('2d');
    context.canvas.width = window.innerWidth * 3/4;
    context.canvas.height = window.innerHeight * 8/10;
    this.chart = new Chart(context, {
      type: 'scatter',
      data: {
          labels: [],
          datasets: [],
      },
    });
    this.chart.data.labels = [];
    this.chart.data.datasets = [
      {
        label: 'f(x)',
        data: [],
        backgroundColor: null,
        borderColor: 'red',
        fill: 'none',
        borderWidth: 0.5,
        showLine: true,
        lineTension: 0,
      },
      {
        label: 'y=x',
        data: [],
        backgroundColor: null,
        borderColor: 'white',
        fill: 'none',
        borderWidth: 0.5,
        showLine: true,
        lineTension: 0,
      },
      {
        label: 'iteration',
        data: [],
        backgroundColor: null,
        borderColor: 'green',
        fill: 'none',
        borderWidth: 0.5,
        showLine: true,
        lineTension: 0,
      }
  ];


    for (let i = 0; i < this.i; i++) {
      let y = (this.a * i) / ((1 + this.r * i) ** 5);
      this.chart.data.labels.push(i);
      this.chart.data.datasets[0].data.push({x:i, y:y});
      this.chart.data.datasets[1].data.push({x:i, y:i});
    }
    let x = this.x0;
    this.chart.data.datasets[2].data.push({x:x, y:0});
    for (let i = 0; i < this.i; i++) {
      let y = (this.a * x) / ((1 + this.r * x) ** 5);
      this.chart.data.datasets[2].data.push({x:x, y:y});
      this.chart.data.datasets[2].data.push({x:y, y:y});
      this.chart.data.labels.push(x);
      this.chart.data.labels.push(y);
      x = y;
    }
    this.chart.update();
  }

  drawFeigenbaum() {
    this.showSpinner(true);
    let context = this.sceneNative.getContext('2d');
    context.canvas.width = window.innerWidth * 3/4;
    context.canvas.height = window.innerHeight * 8/10;
    this.chart = new Chart(context, {
      type: 'scatter',
      data: {
          labels: [],
          datasets: [],
      },
    });
    this.chart.data.labels = [];
    this.chart.data.datasets = [
      {
        label: 'closing values',
        data: [],
        backgroundColor: null,
        borderColor: 'green',
        fill: 'none',
        pointRadius: 1,
        borderWidth: 0.5,
        showLine: false,
        lineTension: 0,
      }
    ];


    for (let a = 0; a < 50; a = a + 0.0625) {
      let x = this.x0;
      for (let i = 0; i < 250; i++) {
        let y = (a * x) / ((1 + this.r * x) ** 5);
        if (i > 200) {
          this.chart.data.datasets[0].data.push({x:a, y:y});
          this.chart.data.labels.push(a);
        }
        x = y;
      }
    }

    this.chart.update();
    this.showSpinner(false);
  }

}
