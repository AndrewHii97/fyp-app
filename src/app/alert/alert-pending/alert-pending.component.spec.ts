import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPendingComponent } from './alert-pending.component';

describe('AlertPendingComponent', () => {
  let component: AlertPendingComponent;
  let fixture: ComponentFixture<AlertPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
