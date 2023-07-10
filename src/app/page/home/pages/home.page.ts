import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { BasePage, IMetaData } from 'src/app/shared/interface/base.component';
import { dummyData } from '../../product/pages/product-index/product-index.page';
import { IBlogData } from 'src/app/shared/interface';
import { ApiService, UserService } from 'src/app/service';
import { END_POINT_URL_LIST } from 'src/app/util';
import { IChartPattern } from '../../learning/interface/interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage extends BasePage {
  isHandset$ = this.layoutService.getIsHandset()
  public productData$ =  new BehaviorSubject(dummyData);

  blogsData$: Observable<IBlogData[]>  = this.apiService.getDataWithUrl(END_POINT_URL_LIST.HOME_BLOG).pipe(
    map(data => data['results'])
  )
  seriesData$ = this.apiService.getDataWithUrl(END_POINT_URL_LIST.BLOG_SERIES).pipe(
    map(data => data.results)
  )

  patternData$: Observable<IChartPattern[]>  = this.apiService.getDataWithUrl(END_POINT_URL_LIST.CHART_PATTERN).pipe(
    map(data => data['results'])
  )

  currentPageData: any

  pageData$ = combineLatest([
    this.blogsData$,
    this.seriesData$,
    this.route$,
    this.patternData$,
  ]).pipe(
    map(data => {
      return {
        blogData: data[0],
        seriesData: data[1],
        route: data[2],
        patternData: data[3],
      }
    }),
    tap(data => {
        this.currentPageData = data
        this.currentPageData.patternData.forEach(
          (data: IChartPattern) => {
            data.slug = this.slugService.genChartUrl(data)
          }
        )
      }
    )
  )

  isLoggedIn = false

  userInfo$ = this.userService.userInfoStorage.pipe(
    tap(data => {
      if (data && Object.keys(data).length !== 0){
        this.isLoggedIn = false
      } else {
        this.isLoggedIn = true
      }
    })
  )

  override metaData: IMetaData = {
    breadcrumb:[
      {
        name: 'Home',
        url: '/'
      }
    ],
    layout: {
      title: 'Home',
      subtitle: 'Until the day every one of us become master in FX world.'
    },
    page: {
      title: 'FXeater | Homepage',
      description: 'Until the day every one of us become master in FX world.'
    }
  }

  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) {
    super()
  }
}
