import { Component } from '@angular/core';
import { BasePage, IMetaData } from 'src/app/shared/interface/base.component';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent extends BasePage {
  override metaData: IMetaData = {
    breadcrumb:
    [
      {
        name: 'Page Not Found',
        url: '/about'
      }
    ],
    layout:
    {
      title: 'Page Not Found',
      subtitle: 'Oh, this page is not yet existed, OR are you from future?'
    },
    page:{
      title: 'FXeater | Page Not Found',
      description: 'We are trying to expose real good Expert Advisors and Indicator from Japan trader to the world.',
      keywords: ['FX', 'Expert Advisors', 'Indicator'],
      type: 'website',
    }
  }
  constructor() {
    super()
  }
}
