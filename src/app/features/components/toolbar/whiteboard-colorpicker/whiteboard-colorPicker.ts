import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ColorPickerDirective} from 'ngx-color-picker';
import {CanvasDrawingService} from '../../../../core/services/canvas-drawing.service';

@Component({
  selector: 'whiteboard-colorPicker',
  imports: [ColorPickerDirective],
  templateUrl: './whiteboard-colorPicker.html',
  styleUrl: './whiteboard-colorPicker.css',
})
export class WhiteboardColorPicker {
  private drawingService = inject(CanvasDrawingService);

  currentColor: string = '#000000';

  onColorChange(color: string){
    this.currentColor = color;
    this.drawingService.setStrokeColor(color);
  }

}
