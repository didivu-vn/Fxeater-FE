import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ApiService, SlugService } from 'src/app/service';
import { BasePage, IBlogData, IMetaData } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';

const metaData: IMetaData = {
  breadcrumb: [
    {
      name: 'My Page',
      url: '/mypage'
    },
    {
      name: 'Blog',
    }
  ],
  layout:{
    title: 'My Blog',
    subtitle: 'Manage your resource.'
  },
  page: {
    title: `FXeater | My Blog`,
    description: 'Manage your resource.'
  }
}

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.page.html',
  styleUrls: ['./my-blog.page.scss'],
})
export class MyBlogPage extends BasePage {

  myBlogEndpoint = END_POINT_URL_LIST.MY_BLOG
  updateStatusEndpoint = END_POINT_URL_LIST.PUBLISH_BLOG
  blogData : IBlogData[] = []
  isLoadMore = false
  apiData$: Observable<IBlogData[]>  = 
    this.apiService.getDataWithUrl(this.myBlogEndpoint).pipe(
      tap(data => this.setUpApi(data)),
      map(data => this.dataProcess(data)),
      tap(data => this.setUpData(data))
    )

  protected override metaData: IMetaData = metaData;

  constructor(
    private apiService: ApiService,
    private slugService: SlugService,
    private router:Router,
  ) {
    super()
  }

  deleteItem(data: IBlogData){
    if (this.getStatus(data).isCanEdit){
      data.is_deleting = true
    }
  }

  deleteItemOK(data: IBlogData){
    if (this.getStatus(data).isCanEdit){
      data.is_deleting = false
      data.is_valid = 0
      this.apiService.deleteDataWithUrl(`${END_POINT_URL_LIST.MY_BLOG}${data.id}/`).subscribe()  
    }
  }

  deleteItemCancle(data: IBlogData){
    data.is_deleting = false
  }

  gotoEdit(data: IBlogData){
    this.getStatus(data).isCanEdit &&
    this.router.navigateByUrl(this.generateUrl(data) + '/edit')
  }

  generateUrl(data: IBlogData){
    return this.slugService.gerateBlogUrl(data)
  }

  getStatus(data: IBlogData){
    return data.is_valid == 0 
      ? {
        isCanEdit: false,
        msg:'Deleted'
      }
      : (
        data.status_type == 2
          ? {
            isCanEdit: true,
            msg:'Publish'
          }
          : {
            isCanEdit: true,
            msg:'Hidden'
          }
      )
  }

  toogleBlog(data:IBlogData){
    if (this.getStatus(data).isCanEdit) {
      const newStatus = data.status_type == 1 ? 2 : 1
      data.status_type = newStatus
      this.apiService.putDataWithUrl(`${this.updateStatusEndpoint}${data.id}/`,{status_type:newStatus})
      .pipe(
        tap(_ => console.log(_))
      )
      .subscribe(

      )  
    }
  }

  loadMore() {
    this.apiService.getDataWithUrl(this.myBlogEndpoint).pipe(
      tap(data => this.setUpApi(data)),
      map(data => this.dataProcess(data)),
      tap(data => this.setUpData(data))
    ).subscribe()
  }

  setUpApi(data:any){
    // update next endpoint
    this.myBlogEndpoint = data.next ? `${this.myBlogEndpoint}?` + data.next.split('?')[1] : this.myBlogEndpoint
    this.isLoadMore = !!data.next
  }

  dataProcess(data: any){
    let rawData = data['results']
    rawData = rawData.map((item:IBlogData) => {
      return Object.assign(item, {isShow: true})
    })
    return rawData
  }

  setUpData(data: IBlogData[]){
    this.blogData = [...this.blogData, ...data]
  }
}
