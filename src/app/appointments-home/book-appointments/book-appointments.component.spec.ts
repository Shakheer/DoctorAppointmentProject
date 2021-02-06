import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentsComponent } from './book-appointments.component';

describe('BookAppointmentsComponent', () => {
  let component: BookAppointmentsComponent;
  let fixture: ComponentFixture<BookAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
