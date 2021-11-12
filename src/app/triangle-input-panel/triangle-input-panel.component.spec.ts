import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleInputPanelComponent } from './triangle-input-panel.component';

describe('TriangleInputPanelComponent', () => {
  let component: TriangleInputPanelComponent;
  let fixture: ComponentFixture<TriangleInputPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriangleInputPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleInputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
