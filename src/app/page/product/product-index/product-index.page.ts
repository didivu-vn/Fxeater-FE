import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent, IMetaData } from 'src/app/shared/interface/base.component';

const dummyData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'tzirw@example.com',
    address: 'New York, NY 10012, US',
  },
  {
    id: 2,
    name: 'Mike Litorus',
    email: 'ejeyd@example.com',
    address: 'London, UK',
  },
  {
    id: 3,
    name: 'Bao Nguyen',
    email: 'baonh@example.com',
    address: 'HCM, VN',
  },
]

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.page.html',
  styleUrls: ['./product-index.page.scss']
})
export class ProductIndexPage extends BaseComponent {
  
  public productData$ =  new BehaviorSubject(dummyData);

  protected override metaData: IMetaData = {
    breadcrumb:[
      {
        name: 'Products',
        url: '/product'
      }
    ],
    layout:{
      title: 'Products',
      subtitle: 'Every products that we have tried.'
    },
    page:{
      title: 'FXeater | All products',
      description: 'We are trying to expose real good Expert Advisors and Indicator from Japan trader to the world.',
      keywords: ['FX', 'Expert Advisors', 'Indicator'],
      type: 'website',
    }
  }

  constructor() {
    super()
  }

}
