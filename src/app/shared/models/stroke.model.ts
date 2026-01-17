import {Point} from './point.model';

export interface Stroke {
  color: string;
  size: number;
  points: Point[];
}
