import { Component } from '@angular/core';
import { BasePage, IMetaData } from 'src/app/shared/interface';

const metaData: IMetaData = {
  breadcrumb: [
    {
      name: 'Landing page',
      url: '/landing-page'
    },
  ],
  layout:{
    title: 'FXeater',
    subtitle: "It's FXeater time of the day."
  },
  page: {
    title: `FXeater | Landing Page`,
    description: "It's FXeater time of the day."
  }
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage extends BasePage {

  override metaData = metaData
  
}
