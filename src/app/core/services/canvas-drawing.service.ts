import {Injectable} from '@angular/core';

export interface CanvasConfig {
  strokeStyle?: string;
  lineWidth?: number;
  lineCap?: CanvasLineCap;
  widthRatio?: number;
  height?: number;
}

export const DEFAULT_CANVAS_CONFIG: Required<CanvasConfig> = {
  strokeStyle: '#8d0000',
  lineWidth: 2,
  lineCap: 'round',
  widthRatio: 0.95,
  height: 600
}

@Injectable({providedIn: 'root'})
export class CanvasDrawingService {

  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private config: Required<CanvasConfig> = {...DEFAULT_CANVAS_CONFIG};

  initialize(canvas: HTMLCanvasElement, config?: CanvasConfig): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    if (config){
      this.config = {...this.config, ...config};
    }

    this.setupCanvas();
  }

  private setupCanvas(){
    this.canvas.width = window.innerWidth * this.config.widthRatio;
    this.canvas.height = this.config.height;

    this.ctx.strokeStyle = this.config.strokeStyle;
    this.ctx.lineWidth = this.config.lineWidth;
    this.ctx.lineCap = this.config.lineCap;
  }

  getConfig(){
    return {...this.config}
  }

  getStrokeColor(){
    return this.config.strokeStyle
  }

  beginPath(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  linePath(x: number, y: number): void {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }


  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }


  setLineWidth (width: number) : void {
    this.ctx.lineWidth = width;
  }

  setStrokeColor(color: string){
    this.config.strokeStyle = color;
  }

  getCanvasDimension() : {width: number, height: number} {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    }
  }

}
