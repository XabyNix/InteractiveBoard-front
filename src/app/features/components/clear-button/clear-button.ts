import { Component } from '@angular/core';
import {CanvasDrawingService} from '../../../core/services/canvas-drawing.service';

@Component({
  selector: 'app-clear-button',
  imports: [],
  templateUrl: './clear-button.html',
  styleUrl: './clear-button.css',
})
export class ClearButton {

  constructor(private drawingService: CanvasDrawingService){

  }

  clearWhiteboard (){
    this.drawingService.clear();
  }

}
