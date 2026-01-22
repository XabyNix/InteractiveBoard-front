import { Component } from '@angular/core';
import {WhiteboardButton} from './buttons/button/whiteboard-button';
import {WhiteboardColorPicker} from './buttons/whiteboard-colorpicker/whiteboard-colorPicker';

@Component({
  selector: 'app-toolbar',
  imports: [
    WhiteboardButton,
    WhiteboardColorPicker
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {

}
