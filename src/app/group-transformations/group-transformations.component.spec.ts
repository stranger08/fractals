import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTransformationsComponent } from './group-transformations.component';

describe('GroupTransformationsComponent', () => {
  let component: GroupTransformationsComponent;
  let fixture: ComponentFixture<GroupTransformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTransformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTransformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
