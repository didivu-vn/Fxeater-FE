import { Component } from '@angular/core';
import { forkJoin,combineLatest, map, tap } from 'rxjs';
import { ApiService, UserService } from 'src/app/service';
import { BasePage, IMetaData } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';


const metaData: IMetaData = {
  breadcrumb:
  [
    {
      name: 'Blog Series',
      url: '/blog/series'
    }
  ],
  layout:
  {
    title: 'Blog Series',
    subtitle: 'Deep dive into MT world.'
  },
  page:{
    title: 'FXeater | Series',
    description: 'Series of topic from Beginner to Expert level around Forex trading knowledge',
    keywords: ['FX', 'Expert Advisors', 'Indicator'],
    type: 'website',
  }
}


@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss']
})
export class SeriesPage extends BasePage  {

  override metaData = metaData
  targetEndpoint = END_POINT_URL_LIST.BLOG_SERIES

  isLogin$ = this.userSerivce.isHasUserInfo$
  seriesData$ = this.apiService.getDataWithUrl(this.targetEndpoint).pipe(
    map(data => data.results)
  )

  pageData$ = combineLatest([
    this.seriesData$,
    this.route$,
  ]).pipe(
    map(data => data[0]),
  )

  constructor(
    private apiService:ApiService,
    private userSerivce: UserService
  ) { 
    super();
  }

}
