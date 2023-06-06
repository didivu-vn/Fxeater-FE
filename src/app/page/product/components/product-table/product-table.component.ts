import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import slugify from 'slugify';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() items: any

  constructor(
    private router: Router
  ){}

  listOfColumn = [
    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: 1
    },
    {
      title: 'Author',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Category',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: 3
    },
    {
      title: 'Price',
      compare: (a: any, b: any) => a.price - b.price,
      priority: 2
    },
    {
      title: 'Rating',
      compare: (a: any, b: any) => a.rating - b.rating,
      priority: false
    },
    {
      title: 'Liked',
      compare: (a: any, b: any) => a.like_count - b.like_count,
      priority: false
    },
  ];

  expandSet = new Set<number>();

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  viewProduct(id:number, name:string){
    this.router.navigate(['/product/', `${id}-${slugify(name, {locale: 'vi'}).toLowerCase()}`]);
  }
}
