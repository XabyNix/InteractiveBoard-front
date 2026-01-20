import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SignalRService} from '../../../core/services/signalr.service';
import {Stroke} from '../../../shared/models/stroke.model';
import {Point} from '../../../shared/models/point.model';

@Component({
  selector: 'app-whiteboard',
  imports: [],
  standalone: true,
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard implements AfterViewInit {

  @ViewChild("canvasRef") canvasRef!: ElementRef<HTMLCanvasElement>;

  private signalrService = inject(SignalRService);


  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;

  private boardWidth = window.innerWidth * 0.95;
  private boardHeight = 600;

  private drawingPoints: Point[] = [];


  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    canvas.width = this.boardWidth;
    canvas.height = this.boardHeight;

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.signalrService.pointReceived$.subscribe(point => {
      if(point.isNewLine)
        this.beginPath(point.x, point.y)
      else
        this.linePath(point.x, point.y);
    })

    this.signalrService.clearReceived$.subscribe(()=>{
      this.clear();
    })

  }

  private getCoordinates(event: PointerEvent){
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  beginPath(offsetX: number, offsetY: number){
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  linePath(offsetX: number, offsetY: number){
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
  }

  startDrawing(event: PointerEvent) {
    this.isDrawing = true;
    const coords = this.getCoordinates(event);
    this.beginPath(coords.x, coords.y);

    this.signalrService.sendPoint({x: coords.x, y: coords.y, isNewLine: true})
  }

  draw(event: PointerEvent) {
    if (!this.isDrawing) return;

    const coords = this.getCoordinates(event);

    this.signalrService.sendPoint({
      x: coords.x,
      y: coords.y,
      isNewLine: false
    })
    this.linePath(coords.x, coords.y);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  clear(){
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardHeight);
  }

  clearWhiteboard(){
    this.signalrService.sendClear();
    this.clear();
  }
}
