import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolatorsComponent } from './violators.component';

describe('ViolatorsComponent', () => {
  let component: ViolatorsComponent;
  let fixture: ComponentFixture<ViolatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViolatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViolatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
