import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSystemComponent } from './dynamic-system.component';

describe('DynamicSystemComponent', () => {
  let component: DynamicSystemComponent;
  let fixture: ComponentFixture<DynamicSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
