import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SignalRService} from '../../../core/services/signalr.service';
import {Point} from '../../../shared/models/point.model';
import {CanvasDrawingService, DEFAULT_CANVAS_CONFIG} from '../../../core/services/canvas-drawing.service';
import {Subject, takeUntil} from 'rxjs';
import {Toolbar} from '../toolbar/toolbar';
import {WhiteboardColorPicker} from '../toolbar/buttons/whiteboard-colorpicker/whiteboard-colorPicker';

@Component({
  selector: 'app-whiteboard',
  imports: [
    Toolbar,
    WhiteboardColorPicker
  ],
  standalone: true,
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard implements AfterViewInit {

  @ViewChild("canvasRef") canvasRef!: ElementRef<HTMLCanvasElement>;

  private signalrService = inject(SignalRService);
  private drawingService = inject(CanvasDrawingService);

  private isDrawing = false;
  currentColor: string = DEFAULT_CANVAS_CONFIG.strokeStyle

  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.initializeCanvas()
    this.subscribeToRemoteEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawingService.initialize(canvas);

  }

  private subscribeToRemoteEvents(): void {

    this.signalrService.pointReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => this.handleRemotePoints(p))

    this.signalrService.clearReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.drawingService.clear())

  }

  private handleRemotePoints(point: Point): void {
    if(point.isNewLine)
      this.drawingService.beginPath(point.x, point.y)
    else
      this.drawingService.linePath(point.x, point.y);
  }


  private getCoordinates(event: PointerEvent): Point{
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isNewLine: false,
    }
  }

  startDrawing(event: PointerEvent) {
    this.isDrawing = true;
    const coords = this.getCoordinates(event);

    this.drawingService.beginPath(coords.x, coords.y);
    this.signalrService.sendPoint({x: coords.x, y: coords.y, isNewLine: true})
  }

  draw(event: PointerEvent) {
    if (!this.isDrawing) return;

    const coords = this.getCoordinates(event);

    this.drawingService.linePath(coords.x, coords.y);
    this.signalrService.sendPoint(coords)
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  clearWhiteboard(){
    this.drawingService.clear()
    this.signalrService.sendClear();
  }

  onColorChange(color: string){
    this.drawingService.setStrokeColor(color)
  }

}
