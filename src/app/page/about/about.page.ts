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
    }
  }

  constructor(
  ) {
    super();
  }
}
