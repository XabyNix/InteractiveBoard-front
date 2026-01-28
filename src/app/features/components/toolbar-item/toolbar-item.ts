import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-toolbar-item',
  imports: [],
  templateUrl: './toolbar-item.html',
  styleUrl: './toolbar-item.css',
})
export class ToolbarItem {

  @Input() label: string = "";

}
