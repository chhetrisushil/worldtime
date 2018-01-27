import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllZonesComponent } from './all-zones.component';

describe('AllZonesComponent', () => {
  let component: AllZonesComponent;
  let fixture: ComponentFixture<AllZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
