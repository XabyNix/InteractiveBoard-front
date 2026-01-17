import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Whiteboard} from './features/components/whiteboard/whiteboard';

@Component({
  selector: 'app-root',
  imports: [Whiteboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('InteractiveBoard');
}
