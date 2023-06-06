import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasePage, IMetaData } from 'src/app/shared/interface/base.component';
import { dummyData } from '../product/pages/product-index/product-index.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage extends BasePage {
  isHandset$ = this.layoutService.getIsHandset()
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
