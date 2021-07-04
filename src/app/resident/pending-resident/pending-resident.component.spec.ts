import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingResidentComponent } from './pending-resident.component';

describe('PendingResidentComponent', () => {
  let component: PendingResidentComponent;
  let fixture: ComponentFixture<PendingResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingResidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
