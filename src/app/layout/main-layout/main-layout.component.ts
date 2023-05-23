import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isCollapsed = false;
  breadcrumb = [
    {
      name: 'EA',
      url: '/ea'
    },
    {
      name: 'All',
      url: '/ea/all'
    }
  ]

  onBack() {
    console.log('onBack');
  }
}
