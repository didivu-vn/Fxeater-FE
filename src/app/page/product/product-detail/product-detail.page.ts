import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/service/layout.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
})
export class ProductDetailPage implements OnInit {
  
  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
      this.layoutService.setBreadbrumbData(
        [
          {
            name: 'Products',
            url: '/product'
          },
          {
            name: 'Detail',
            url: '/product'
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
