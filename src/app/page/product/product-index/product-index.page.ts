import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from 'src/app/service/layout.service';

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
]

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.page.html',
  styleUrls: ['./product-index.page.scss']
})
export class ProductIndexPage implements OnInit {
  
  public productData$ =  new BehaviorSubject(dummyData);

  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
      this.layoutService.setBreadbrumbData(
        [
          {
            name: 'Products',
            url: '/product'
          }
        ]
      )
      this.layoutService.setHeaderData(
        {
          title: 'Products',
          subtitle: 'Every products that we have tried.'
        }
      )
  }
}
