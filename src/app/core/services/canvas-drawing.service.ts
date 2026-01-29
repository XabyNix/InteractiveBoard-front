import {Injectable} from '@angular/core';
import {SignalRService} from './signalr.service';

export interface CanvasConfig {
  strokeStyle?: string;
  lineWidth?: number;
  lineCap?: CanvasLineCap;
}

export const DEFAULT_CANVAS_CONFIG: Required<CanvasConfig> = {
  strokeStyle: '#8d0000',
  lineWidth: 12,
  lineCap: 'round'
}

@Injectable({providedIn: 'root'})
export class CanvasDrawingService {

  constructor(private signalrService: SignalRService){

  }

  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private config: Required<CanvasConfig> = {...DEFAULT_CANVAS_CONFIG};

  private lastX!: number;
  private lastY!: number;

  initialize(canvas: HTMLCanvasElement, config?: CanvasConfig): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    if (config){
      this.config = {...this.config, ...config};
    }

    this.setupCanvas();
  }

  private setupCanvas(){
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;

    this.ctx.strokeStyle = this.config.strokeStyle;
    this.ctx.lineWidth = this.config.lineWidth;
    this.ctx.lineCap = this.config.lineCap;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  beginPath(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);

    this.lastX = x;
    this.lastY = y;
  }

  linePath(x: number, y: number): void {

    const mixX = (this.lastX + x) / 2;
    const mixY = (this.lastY + y) / 2;

    this.ctx.quadraticCurveTo(this.lastX, this.lastY, mixX, mixY);

    this.lastX = x;
    this.lastY = y;
  }

  endStroke(){
    this.ctx.stroke();
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setLineWidth (width: number) : void {
    this.ctx.lineWidth = width;
  }

  setStrokeColor(color: string){
    this.ctx.strokeStyle = color;
  }

}
