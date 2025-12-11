import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AparmentGallery } from './aparment-gallery';

describe('AparmentGallery', () => {
  let component: AparmentGallery;
  let fixture: ComponentFixture<AparmentGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AparmentGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AparmentGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
