import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensabilisationComponent } from './sensabilisation.component';

describe('SensabilisationComponent', () => {
  let component: SensabilisationComponent;
  let fixture: ComponentFixture<SensabilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensabilisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensabilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
