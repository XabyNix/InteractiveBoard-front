import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {SignalRService} from '../../../core/services/signalr.service';
import {Point} from '../../../shared/models/point.model';
import {CanvasDrawingService} from '../../../core/services/canvas-drawing.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-whiteboard',
  imports: [ ],
  standalone: true,
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard implements AfterViewInit, OnDestroy {

  @ViewChild("canvasRef") canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly signalrService = inject(SignalRService);
  private readonly drawingService = inject(CanvasDrawingService);

  private isDrawing = false;
  private pointBuffer: Point[] = [];
  private intervalId!: number;

  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.initializeCanvas()
    this.subscribeToRemoteEvents();
    this.intervalId = setInterval(() => {this.sendPoints()}, 50)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if(this.intervalId)
      clearInterval(this.intervalId);
  }

  startDrawing(event: PointerEvent) {
    this.isDrawing = true;
    const coords = this.getCoordinates(event);

    this.drawingService.beginPath(coords.x, coords.y);
    this.pointBuffer.push({x: coords.x, y: coords.y, isNewLine: true})
  }

  draw(event: PointerEvent) {
    if (!this.isDrawing) return;

    const coords = this.getCoordinates(event);

    this.drawingService.linePath(coords.x, coords.y);
    this.pointBuffer.push({x: coords.x, y: coords.y, isNewLine: false})
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  clearWhiteboard(){
    this.drawingService.clear()
    this.signalrService.sendClear();
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawingService.initialize(canvas);

  }

  private subscribeToRemoteEvents(): void {

    this.signalrService.pointsReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => this.handleRemotePoints(p))

    this.signalrService.clearReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.drawingService.clear())

  }

  private handleRemotePoints(points: Point[]): void {
    for (const point of points) {
      if (point.isNewLine)
        this.drawingService.beginPath(point.x, point.y)
      else
        this.drawingService.linePath(point.x, point.y);
    }
  }

  private getCoordinates(event: PointerEvent): Point{
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isNewLine: false,
    }
  }

  private sendPoints(): void {
    if (!this.pointBuffer.length) return;

    this.signalrService.sendPoints(this.pointBuffer);
    this.pointBuffer.length = 0;
  }



}
