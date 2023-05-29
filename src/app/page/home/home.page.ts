import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent, IMetaData } from 'src/app/shared/interface/base.component';
import { dummyData } from '../product/product-index/product-index.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage extends BaseComponent {
  public productData$ =  new BehaviorSubject(dummyData);
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
