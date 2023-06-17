import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { ApiService, UserService } from 'src/app/service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BasePage, IBlogData, IMetaData } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';


@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css'],
})
export class AllBlogsComponent extends BasePage {
  

  override metaData: IMetaData = {
    breadcrumb:
    [
      {
        name: 'Blog',
        url: '/blog'
      }
    ],
    layout:
    {
      title: 'Blog',
      subtitle: 'Deep dive into MT world.'
    },
    page:{
      title: 'FXeater | Blog',
      description: 'We are trying to expose real good Expert Advisors and Indicator from Japan trader to the world.',
      keywords: ['FX', 'Expert Advisors', 'Indicator'],
      type: 'website',
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  isLogin$ = this.userSerivce.isHasUserInfo$

  filterKW = ''

  blogData : IBlogData[] = []
  filterData: IBlogData[] = []

  targetEndpoint = END_POINT_URL_LIST.BLOG
  isLoadMore = false
  apiData$: Observable<IBlogData[]>  = 
    this.apiService.getDataWithUrl(this.targetEndpoint).pipe(
      tap(data => this.setUpApi(data)),
      map(data => this.dataProcess(data)),
      tap(data => this.setUpData(data))
    )
  
  constructor(
    private apiService:ApiService,
    private titleService: Title,
    private breakpointObserver: BreakpointObserver,
    private userSerivce: UserService
  ) { 
    super();
    this.titleService.setTitle('Blog')
  }

  loadMore() {
    this.apiService.getDataWithUrl(this.targetEndpoint).pipe(
      tap(data => this.setUpApi(data)),
      map(data => this.dataProcess(data)),
      tap(data => this.setUpData(data))
    ).subscribe()
  }

  setUpApi(data:any){
    // update next endpoint
    this.targetEndpoint = data.next ? `${this.targetEndpoint}?` + data.next.split('?')[1] : this.targetEndpoint
    this.isLoadMore = !!data.next
  }
  
  setUpData(data: IBlogData[]){
    this.blogData = [...this.blogData, ...data]
    this.filter()
  }

  dataProcess(data: any){
    let rawData = data['results']
    rawData = rawData.map((item:IBlogData) => {
      return Object.assign(item, {isShow: true})
    })
    return rawData
  }

  filter(kw = '') {
    kw && (this.filterKW = kw)
    this.filterData = this.blogData.map(
      data => {

        // dont have kw, show all
        if (!Boolean(this.filterKW)){
          data.isShow = true
          return data
        }

        // filter
        [data.name, data.author, data.description, data.html_string, data.sub_title].some(_ => _.toLocaleLowerCase().includes(this.filterKW.toLocaleLowerCase())) 
          ? data.isShow = true
          : data.isShow = false
        return data
      }
    )
  }

  clear() {
    this.filterKW = ''
    this.filter()
  }
}
