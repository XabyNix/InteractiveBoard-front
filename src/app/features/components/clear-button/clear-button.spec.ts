import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearButton } from './clear-button';

describe('ClearButton', () => {
  let component: ClearButton;
  let fixture: ComponentFixture<ClearButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
