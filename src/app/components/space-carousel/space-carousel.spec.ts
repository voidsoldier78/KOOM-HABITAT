import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCarousel } from './space-carousel';

describe('SpaceCarousel', () => {
  let component: SpaceCarousel;
  let fixture: ComponentFixture<SpaceCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
