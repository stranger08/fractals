import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleTransformationsComponent } from './triangle-transformations.component';

describe('TriangleTransformationsComponent', () => {
  let component: TriangleTransformationsComponent;
  let fixture: ComponentFixture<TriangleTransformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriangleTransformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleTransformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
