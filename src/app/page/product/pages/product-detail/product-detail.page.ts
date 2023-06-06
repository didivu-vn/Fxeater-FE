import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { BasePage, IMetaData } from 'src/app/shared/interface/base.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
})
export class ProductDetailPage extends BasePage {
  
  productId = 0
  productName = ''

  override metaData: IMetaData = {
    breadcrumb: [
      {
        name: 'Products',
        url: '/product'
      },
      {
        name: 'Detail ' + this.productId,
        url: '/product/' + this.productId 
      }
    ],
    layout:{
      title: 'Product Detail',
      subtitle: 'Everything you need to know about.'
    },
    page: {
      title: `FXeater | ${this.productName}`,
      description: 'Everything you need to know about.'
    }
  }

  productId$ = this.route.params.pipe(
    map(_ => _['id'].split('-')[0]),
    tap(_ => {
        this.productId = _
        this.metaData.breadcrumb[1].name = 'Detail ' + _
        this.metaData.breadcrumb[1].url = '/product/' + _
        this.updateLayout()
      }),
  )
  
  panels = [
    {
      active: false,
      name: 'Overview',
      disabled: false
    },
    {
      active: false,
      name: 'Performance',
      disabled: false
    },
    {
      active: false,
      name: 'Review',
      disabled: false
    },
  ]

    
  constructor(
    private route: ActivatedRoute,
  ) {
    super()
  }
}
