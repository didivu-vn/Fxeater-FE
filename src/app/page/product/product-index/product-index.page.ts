import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { BaseComponent, IMetaData } from 'src/app/shared/interface/base.component';

const dummyData = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem explicabo neque libero, deserunt fugiat aliquid voluptatibus sunt dolore illo blanditiis laudantium quia dolorum! Corporis, sint ipsam voluptates illum incidunt quae!',
    price: 2000,
    image: 'https://storage.googleapis.com/stormie-portfolio-bucket/media/blog/user_2/4wxgtl-20230406174437.png',
    category: 'MT4, MT5, USDAUX',
    rating: 4.5,
    view_count: 100,
    like_count: 5,
    created_at: 3,
    author: 'Jame',
    replies : []
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quisquam inventore possimus rem quis rerum sunt blanditiis expedita optio molestiae libero id iusto laborum, deleniti dolorum enim suscipit doloremque voluptate?',
    price: 3000,
    image: 'https://storage.googleapis.com/stormie-portfolio-bucket/media/blog/user_2/Google-devs-app-script-social-20230323092429-20230331232535.png',
    category: 'MT4, MT5, USDAUX',
    rating: 4.5,
    view_count: 200,
    like_count: 5,
    created_at: 3,
    author: 'Jonathan',
    replies : []
  },
]

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.page.html',
  styleUrls: ['./product-index.page.scss']
})
export class ProductIndexPage extends BaseComponent {
  isHandset$ = this.layoutService.getIsHandset()
  public productData$ =  new BehaviorSubject(dummyData);
  layoutType = 1
  
  protected options = [
    { label: 'List', value: 'list', icon: 'bars' },
    { label: 'Cart', value: 'card', icon: 'appstore' }
  ];

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
