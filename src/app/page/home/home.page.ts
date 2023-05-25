import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/service/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
      this.layoutService.setBreadbrumbData(
        [
          {
            name: 'Home',
            url: '/'
          }
        ]
      )
      this.layoutService.setHeaderData(
        {
          title: 'Home',
          subtitle: 'Best in price you can find.'
        }
      )
  }

}
