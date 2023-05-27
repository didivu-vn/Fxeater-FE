import { Component, OnInit } from '@angular/core';
import { BaseComponent, IMetaData } from 'src/app/shared/interface/base.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css']
})
export class AboutPage extends BaseComponent {

  override metaData: IMetaData = {
    breadcrumb:
    [
      {
        name: 'About Us',
        url: '/about'
      }
    ],
    layout:
    {
      title: 'About Us',
      subtitle: 'Who we are and what we do.'
    },
    page:{
      title: 'FXeater | About Us',
      description: 'We are trying to expose real good Expert Advisors and Indicator from Japan trader to the world.',
      keywords: ['FX', 'Expert Advisors', 'Indicator'],
      type: 'website',
    }
  }

  constructor(
  ) {
    super();
  }
}
