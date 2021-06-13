import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityNewComponent } from './security-new.component';

describe('SecurityNewComponent', () => {
  let component: SecurityNewComponent;
  let fixture: ComponentFixture<SecurityNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
