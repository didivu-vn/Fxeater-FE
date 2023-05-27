import { Component, OnInit } from '@angular/core';
import { BaseComponent, IMetaData } from 'src/app/shared/interface/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage extends BaseComponent {

  override metaData: IMetaData = {
    breadcrumb:[
      {
        name: 'Home',
        url: '/'
      }
    ],
    layout: {
      title: 'Home',
      subtitle: 'Best in price you can find.'
    }
  }

  constructor( ) {
    super()
  }

}
