import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-koch-fractal',
  templateUrl: './koch-fractal.component.html',
  styleUrls: ['./koch-fractal.component.css']
})
export class KochFractalComponent {

  title = 'koch-fractal';

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('tooltip')
  vertexTooltip: ElementRef<HTMLDivElement>;
  tooltipText;

  public context: CanvasRenderingContext2D;

  constructor() {
    // Chart.register(...registerables);
  }

  message: string = "";

  iteration: number = 2;

  vertexes = [];

  ngAfterViewInit() {
    this.draw();
    this.addCanvasEventListener();
    this.reOffset();
    window.onscroll = window.onresize = this.reOffset.bind(this);
    this.hideVertexTooltip();
  }

  @HostListener('window:resize', ['$event'])
  redraw(event?) {
      this.draw();
  }

  draw() {
    this.vertexes = [];
    const canvas = this.canvas.nativeElement;
    const context = this.canvas.nativeElement.getContext('2d');
    canvas.width = window.innerWidth - 200;
    canvas.height = Math.abs(canvas.width / 3)

    const startingPoints = {
        p1: {
            x: 10,
            y: canvas.height - 10
        },
        p2: {
            x: canvas.width - 20,
            y: canvas.height - 10
        }
    }
    

    const koch = (a, b, limit = this.iteration, branch) => {

        let [dx, dy] = [b.x - a.x, b.y - a.y]
        let dist = Math.sqrt(dx * dx + dy * dy)
        let unit = dist / 3
        let angle = Math.atan2(dy, dx)

        let p1 = {
            x: a.x + dx / 3,
            y: a.y + dy / 3
        }
        let p3 = {
            x: b.x - dx / 3,
            y: b.y - dy / 3
        }
        let p2 = {
            x: p1.x + Math.cos(angle - Math.PI / 3) * unit,
            y: p1.y + Math.sin(angle - Math.PI / 3) * unit
        }

        if (limit > 0) {
            koch(a, p1, limit - 1, branch + '10');
            koch(p1, p2, limit - 1, branch + '11');
            koch(p2, p3, limit - 1, branch + '12');
            koch(p3, b, limit - 1, branch + '20');
        } else {
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.lineTo(p3.x, p3.y)
            context.lineTo(b.x, b.y)
            context.stroke()
        }
        this.registerVertexes([p1, p2, p3], branch);
    }
    koch(startingPoints.p1, startingPoints.p2, this.iteration, '');
  }

  registerVertexes(points, branch) {
    for (let i in points) {
      this.registerVertex(points[i].x, points[i].y, `${branch}${i}`);
    }
  }

  format (num, minChars) {
    return num.toString().length < minChars
     ? this.format(`0${num}`, minChars)
     : num.toString()
  }

  registerVertex(x, y, branch) {
    let branchCodeLength = 1 + this.iteration * 2;
    branch = this.format(branch, branchCodeLength);
    this.vertexes.push({
      x, y, branch
    });
  }

  drawVertexes() {
    for (let v of this.vertexes) {
      this.drawVertex(v);
    }
  }

  drawVertex(vertex) {
    let context = this.canvas.nativeElement.getContext('2d');
    context.beginPath()
    context.moveTo(vertex.x, vertex.y)
    let radius = 7 - this.iteration;
    context.arc(vertex.x, vertex.y, radius, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.moveTo(vertex.x, vertex.y);
    context.closePath()
  }

  offsetX: number;
  offsetY: number;

  reOffset() {
    var BB = this.canvas.nativeElement.getBoundingClientRect();
    this.offsetX = BB.left;
    this.offsetY = BB.top;
  }

  onMouseOutOfCanvas() {
    if( !this.searchLock) {
      this.draw();
      this.hideVertexTooltip();
    }
  }

  addCanvasEventListener() {
    const canvas = this.canvas.nativeElement;
    canvas.onmousemove = ($event) => {

      if (this.searchLock) {
        return;
      }

      let mouseX = $event.clientX - this.offsetX;
      let mouseY = $event.clientY - this.offsetY;
      
      let hoverInterval = this.iteration >= 4 ? 2 : 10;
      let targetedVertex = this.vertexes.find(v => Math.abs(v.x - mouseX) < hoverInterval && Math.abs(v.y - mouseY) < hoverInterval);

      if (targetedVertex) {
        this.draw();
        this.drawVertex(targetedVertex);
        this.displayVertexTooltip($event.clientX, $event.clientY, targetedVertex);
        this.displayMessage(`Targeted vertex: ${targetedVertex.branch}`);
      } else {
        this.draw();
        this.hideVertexTooltip();
        this.clearMessage();
      }
    }
  }

  displayVertexTooltip(x, y, vertex) {
    const TOOLTIP = this.vertexTooltip.nativeElement;
    this.tooltipText = vertex.branch;
    TOOLTIP.hidden = false;
    TOOLTIP.style.left = `${Math.abs(x)}px`;
    TOOLTIP.style.top = `${Math.abs(y) - 50}px`;
  }

  hideVertexTooltip() {
    this.vertexTooltip.nativeElement.hidden = true;
  }

  next() {

    if (this.iteration == 5) {
      this.displayMessage("Can't get any higher due to resolution limitation!");
      return;
    }

    this.clearMessage();
    this.clearSearch();
    this.iteration = this.iteration + 1;
    this.draw();
  }

  prev() {

    if (this.iteration == 0) {
      this.displayMessage("Can't get any lower!");
      return;
    }

    this.clearMessage();
    this.clearSearch();
    this.iteration = this.iteration - 1;
    this.draw();
  }

  clearMessage() {
    this.message = "";
  }

  displayMessage(message) {
    this.message = message;
  }

  searchVertex:string = '';
  searchLock:boolean = false;

  clearSearch() {
    this.searchVertex = '';
  }

  onKey(event: any) {

    this.draw();

    if (this.searchVertex !== '') {
      let targetedVertex = this.vertexes.find(v => v.branch == this.searchVertex);

      if (targetedVertex) {
        this.searchLock = true;
        this.drawVertex(targetedVertex);
        this.displayMessage(`Targeted vertex: ${targetedVertex.branch}`);
      } else {
        this.searchLock = true;
        this.displayMessage(`Cannot find ${this.searchVertex}`);
      }
    } else {
      this.searchLock = false;
      this.clearMessage();
    }
  }

}
