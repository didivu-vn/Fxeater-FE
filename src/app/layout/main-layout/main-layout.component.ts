import { Component } from '@angular/core';
import { LayoutService } from 'src/app/service/layout.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isCollapsed = true;
  breadcrumb$ = this.layoutService.getBreadcrumbData()
  header$ = this.layoutService.getHeaderData()
  isHandset$ = this.layoutService.getIsHandset()

  constructor( 
    private layoutService: LayoutService
  ) {}    

  onBack(in_data = '/') {
    console.log('onBack to -- ', in_data);
  }
}
