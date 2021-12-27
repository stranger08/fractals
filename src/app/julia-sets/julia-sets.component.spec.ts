import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuliaSetsComponent } from './julia-sets.component';

describe('JuliaSetsComponent', () => {
  let component: JuliaSetsComponent;
  let fixture: ComponentFixture<JuliaSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuliaSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuliaSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
