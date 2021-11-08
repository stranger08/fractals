import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KochFractalComponent } from './koch-fractal.component';

describe('KochFractalComponent', () => {
  let component: KochFractalComponent;
  let fixture: ComponentFixture<KochFractalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KochFractalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KochFractalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
