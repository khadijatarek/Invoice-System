import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPageComponent } from './sp-page.component';

describe('SpPageComponent', () => {
  let component: SpPageComponent;
  let fixture: ComponentFixture<SpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
