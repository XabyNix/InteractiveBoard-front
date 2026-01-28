import { Component } from '@angular/core';
import {CanvasDrawingService} from '../../../core/services/canvas-drawing.service';
import {SignalRService} from '../../../core/services/signalr.service';

@Component({
  selector: 'app-clear-button',
  imports: [],
  templateUrl: './clear-button.html',
  styleUrl: './clear-button.css',
})
export class ClearButton {

  constructor(private drawingService: CanvasDrawingService, private signalrService: SignalRService){

  }

  clearWhiteboard (){
    this.drawingService.clear();
    this.signalrService.sendClear();
  }

}
