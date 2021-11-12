import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transformation-input-panel',
  templateUrl: './transformation-input-panel.component.html',
  styleUrls: ['./transformation-input-panel.component.css']
})
export class TransformationInputPanelComponent implements OnInit {

  constructor() { }

  @Output() update: EventEmitter<any> = new EventEmitter();

  @Input() matrix;
  @Input() offset;

  ngOnInit(): void {
  }

  onKey($event) {
    this.update.emit();
  }

}
