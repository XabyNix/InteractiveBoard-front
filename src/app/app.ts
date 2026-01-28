import { Component, signal } from '@angular/core';
import {Whiteboard} from './features/components/whiteboard/whiteboard';
import {ToolbarItem} from './features/components/toolbar-item/toolbar-item';
import {SizeSelector} from './features/components/toolbar/size-selector/size-selector';
import {WhiteboardColorPicker} from './features/components/toolbar/whiteboard-colorpicker/whiteboard-colorPicker';
import {Toolbar} from './features/components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [Whiteboard, ToolbarItem, SizeSelector, WhiteboardColorPicker, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('InteractiveBoard');
}
