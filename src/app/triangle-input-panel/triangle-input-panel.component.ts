import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-triangle-input-panel',
  templateUrl: './triangle-input-panel.component.html',
  styleUrls: ['./triangle-input-panel.component.css']
})
export class TriangleInputPanelComponent implements OnInit {

  constructor() { }

  @Input() id = '';
  @Input() triangle:any;
  @Output() update: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  onKey($event) {
    this.update.emit();
  }

}
