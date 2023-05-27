import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { LayoutService } from 'src/app/service/layout.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
})
export class ProductDetailPage implements OnInit {
  
  productId$ = this.route.params.pipe(
    map(_ => _['id']),
    tap(_ => {
        this.productId = _
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
  productId : number = 0
    
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.updateLayout()
  }

  updateLayout(){
    this.layoutService.setBreadbrumbData(
      [
        {
          name: 'Products',
          url: '/product'
        },
        {
          name: 'Detail ' + this.productId,
          url: '/product/' + this.productId 
        }
      ]
    )
    this.layoutService.setHeaderData(
      {
        title: 'Product Detail',
        subtitle: 'Everything you need to know about.'
      }
    )
  }
}
