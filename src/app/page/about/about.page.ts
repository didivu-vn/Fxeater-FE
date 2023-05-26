import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/service/layout.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css']
})
export class AboutPage implements OnInit {
  constructor(
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
      this.layoutService.setBreadbrumbData(
        [
          {
            name: 'About Us',
            url: '/about'
          }
        ]
      )
      this.layoutService.setHeaderData(
        {
          title: 'About Us',
          subtitle: 'Who we are and what we do.'
        }
      )
  }
}
