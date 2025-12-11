import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSystem } from './booking-system';

describe('BookingSystem', () => {
  let component: BookingSystem;
  let fixture: ComponentFixture<BookingSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
