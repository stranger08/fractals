import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transformation-input-panel',
  templateUrl: './transformation-input-panel.component.html',
  styleUrls: ['./transformation-input-panel.component.css']
})
export class TransformationInputPanelComponent implements OnInit {

  constructor() { }

  @Input() matrix;
  @Input() offset;

  ngOnInit(): void {
  }

}
