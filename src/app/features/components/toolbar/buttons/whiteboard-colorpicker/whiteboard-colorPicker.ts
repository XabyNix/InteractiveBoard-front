import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColorPickerDirective} from 'ngx-color-picker';

@Component({
  selector: 'whiteboard-colorPicker',
  imports: [ColorPickerDirective],
  templateUrl: './whiteboard-colorPicker.html',
  styleUrl: './whiteboard-colorPicker.css',
})
export class WhiteboardColorPicker {

  @Input() color: string = '#000000';
  @Output() colorChange = new EventEmitter<string>();

  onColorChange(color: string){
    this.colorChange.emit(this.color);
  }

}
