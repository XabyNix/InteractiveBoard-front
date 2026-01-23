import {Component, Input} from '@angular/core';

@Component({
  selector: 'whiteboard-button',
  imports: [],
  templateUrl: './whiteboard-button.html',
  styleUrl: './whiteboard-button.css',
})
export class WhiteboardButton {

  @Input() text: string = "Default text";

}
