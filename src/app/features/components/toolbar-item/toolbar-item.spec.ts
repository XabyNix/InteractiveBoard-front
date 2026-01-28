import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarItem } from './toolbar-item';

describe('ToolbarItem', () => {
  let component: ToolbarItem;
  let fixture: ComponentFixture<ToolbarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
