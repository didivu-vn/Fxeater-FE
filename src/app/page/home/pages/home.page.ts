import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BasePage, IMetaData } from 'src/app/shared/interface/base.component';
import { dummyData } from '../../product/pages/product-index/product-index.page';
import { IBlogData } from 'src/app/shared/interface';
import { ApiService, UserService } from 'src/app/service';
import { END_POINT_URL_LIST } from 'src/app/util';


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
