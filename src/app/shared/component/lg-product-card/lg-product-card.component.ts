import { Component, Input, OnInit } from '@angular/core';
import slugify from 'slugify';
import { IProduct } from '../../interface/common.interface';

@Component({
  selector: 'app-lg-product-card',
  templateUrl: './lg-product-card.component.html',
  styleUrls: ['./lg-product-card.component.scss']
})
export class LgProductCardComponent implements OnInit {

  @Input() productData: IProduct = {} as IProduct

  blogSlug:string =''

  constructor() { }

  ngOnInit(): void {
    this.blogSlug = slugify(this.productData.name, {locale: 'vi'}).toLowerCase()
  }
}
