import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() header = {
    title: '',
    subtitle: '',
  }

  constructor() {
    console.log(this.header)
  } 
}
