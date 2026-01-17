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

  beginPath(offsetX: number, offsetY: number){
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  linePath(offsetX: number, offsetY: number){
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
  }

  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.beginPath(event.offsetX, event.offsetY);

    this.signalrService.sendPoint({x: event.offsetX, y: event.offsetY, isNewLine: true})
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;

    this.signalrService.sendPoint({x: event.offsetX, y: event.offsetY, isNewLine: false})
    this.linePath(event.offsetX, event.offsetY);
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
