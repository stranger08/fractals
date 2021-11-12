import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationInputPanelComponent } from './transformation-input-panel.component';

describe('TransformationInputPanelComponent', () => {
  let component: TransformationInputPanelComponent;
  let fixture: ComponentFixture<TransformationInputPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformationInputPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationInputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
