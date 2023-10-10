import { Component } from '@angular/core';
import { BasePage, IMetaData } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';

const metaData: IMetaData = {
  breadcrumb:
  [
    {
      name: 'FAQ',
      url: '/faq'
    }
  ],
  layout:
  {
    title: 'Frequently Asked',
    subtitle: 'Might you wonder?'
  },
  page:{
    title: 'FxEater | FAQ',
    description: 'Frequently Asked Questions of FxEater',
    keywords: ['FX', 'Expert Advisors', 'Indicator'],
    type: 'website',
  }
}



@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss']
})
export class FaqPage extends BasePage {

  override metaData = metaData
  targetEndpoint = END_POINT_URL_LIST.BLOG_SERIES

  panels = [
    {
      active: true,
      question: 'Who we are?',
      disabled: false,
      content: "We're just two random guys in our 30s from Vietnam, where people are quite active and open in forex trading and crypto."
    },
    {
      active: false,
      disabled: false,
      question: 'How we get monney from this website?',
      content: "Currently, we're starting with absolutely $0. This website is our side project as we also need to provide for our families. We hope to generate some income through affiliates or ads to invest more in it."
    },
    {
      active: false,
      disabled: false,
      question: 'How do the people in Vietnam doing?',
      content: "While we work hard, the pay isn't much. You might not be concerned, and neither are we. But, we do care about our children, and some of them can't even go to school. If we make 10 cents from this project, we'll donate 1 cent to support these children."
    }
  ];

  constructor() {
    super()
  }
  
}
