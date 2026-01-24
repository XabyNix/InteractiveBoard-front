import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CanvasDrawingService, DEFAULT_CANVAS_CONFIG} from '../../../../core/services/canvas-drawing.service';

@Component({
  selector: 'app-size-selector',
  imports: [
    FormsModule
  ],
  templateUrl: './size-selector.html',
  styleUrl: './size-selector.css',
})
export class SizeSelector{

  private drawingService = inject(CanvasDrawingService)

  brushSize: number = DEFAULT_CANVAS_CONFIG.lineWidth;

  increaseSize(): void {
    this.brushSize += 2;
    this.drawingService.setLineWidth(this.brushSize)
  }

  decreaseSize(): void {
    this.brushSize -= 2;
    this.drawingService.setLineWidth(this.brushSize)
  }

}
