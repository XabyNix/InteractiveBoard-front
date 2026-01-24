import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardColorPicker } from './whiteboard-colorPicker';

describe('WhiteboardColorPicker', () => {
  let component: WhiteboardColorPicker;
  let fixture: ComponentFixture<WhiteboardColorPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteboardColorPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteboardColorPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
