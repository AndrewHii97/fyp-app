import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKeyAlertComponent } from './delete-key-alert.component';

describe('DeleteKeyAlertComponent', () => {
  let component: DeleteKeyAlertComponent;
  let fixture: ComponentFixture<DeleteKeyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteKeyAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKeyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
