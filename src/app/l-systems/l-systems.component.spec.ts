import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LSystemsComponent } from './l-systems.component';

describe('LSystemsComponent', () => {
  let component: LSystemsComponent;
  let fixture: ComponentFixture<LSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LSystemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
