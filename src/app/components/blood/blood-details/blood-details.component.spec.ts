import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDetailsComponent } from './blood-details.component';

describe('BloodDetailsComponent', () => {
  let component: BloodDetailsComponent;
  let fixture: ComponentFixture<BloodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
