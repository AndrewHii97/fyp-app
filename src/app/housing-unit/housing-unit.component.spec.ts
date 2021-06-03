import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingUnitComponent } from './housing-unit.component';

describe('HousingUnitComponent', () => {
  let component: HousingUnitComponent;
  let fixture: ComponentFixture<HousingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
