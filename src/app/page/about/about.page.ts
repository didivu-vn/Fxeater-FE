import { Component, OnInit } from '@angular/core';
import { StringMap } from 'quill';
import { ApiService } from 'src/app/service';
import { BasePage, IMetaData } from 'src/app/shared/interface/base.component';

export interface IAboutData {
  title: string;
  description: string;
  section1_title: string;
  section1_description: string;
  section2_title: string;
  section2_description: string;
  section3_title: string;
  section3_description: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
})
export class AboutPage extends BasePage {
  override metaData: IMetaData = {
    breadcrumb: [
      {
        name: 'About Us',
        url: '/about',
      },
    ],
    layout: {
      title: 'About Us',
      subtitle: 'Who we are and what we do.',
    },
    page: {
      title: 'FXeater | About Us',
      description:
        'We are trying to expose real good Expert Advisors and Indicator from Japan trader to the world.',
      keywords: ['FX', 'Expert Advisors', 'Indicator'],
      type: 'website',
    },
  };

  aboutData = {} as IAboutData;

  constructor(private apiService: ApiService) {
    super();
  }

  override routeChange(data: any): void {
    const lang = data.lang ? data.lang : '';
    let targetUrl = 'v1/api-about-us/';
    targetUrl = lang ? targetUrl + `?lang=${lang}` : targetUrl;
    this.apiService.getDataWithUrl(targetUrl).subscribe((about) => {
      this.aboutData = about['results'][0];
    });
  }
}
