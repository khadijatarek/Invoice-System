import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPsignupComponent } from './spsignup.component';

describe('SPsignupComponent', () => {
  let component: SPsignupComponent;
  let fixture: ComponentFixture<SPsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SPsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
