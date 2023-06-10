import { Component } from '@angular/core';
import { ApiService } from 'src/app/service';
import { Router } from '@angular/router';

import { BehaviorSubject, map, tap } from 'rxjs';
import { BasePage } from 'src/app/shared/interface';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { BlogService } from '../../services/blog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { END_POINT_URL_LIST } from 'src/app/util';


const MSG_TYPE ={
  OK:'success',
  ERROR:'error',
  WARNING:'warning'
}

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent extends BasePage {

  isPreviewContent = false
  currentDate = new Date();

  seriesUrl = END_POINT_URL_LIST.BLOG_SERIES
  seriesData$ = this.apiService.getDataWithUrl(this.seriesUrl).pipe(
    map(data => data.results),
  )
  quillInitValue = ''

  form: any = {
    title: '',
    sub_title: '',
    description: '',
    series: null,
  }

  isFormError = false

  blurred = false
  focused = false
  htmlstring = ''
  isFormError$ = new BehaviorSubject(false)
  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(
    private apiService:ApiService,
    private blogService: BlogService,
    private router:Router,
    private messageService: NzMessageService,
  ) { 
    super()
  }

  override ngOnInit(): void {
    // set up alert
    this.isFormError$.pipe(
      tap(isError => 
        {
          if(isError) {
            this.scrollTop()
            setTimeout(() => {
              this.messageService.create(MSG_TYPE.ERROR,'Create blog fail, some fiels are empty.')
            }, 700);
          } 
        }
      ),
    ).subscribe()

    this.metaData ={
      breadcrumb: [
        {
          name: 'All Blog',
          url: '/blog/all'
        },
        {
          name: 'New Blog',
        }
      ],
      layout:{
        title: 'Blog New',
        subtitle: 'Daily reading is a must.'
      },
      page: {
        title: `FXeater | Blog | Create new blog`,
        description: 'Daily reading is a must.'
      }
    }
    this.updateLayout()
    this.updateSEO()
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  updateHttmlString(htmlString:string){
    this.htmlstring = htmlString
  }

  sendForm(){
    // bad code here, sorry
    if (!this.form.title || !this.htmlstring || !this.fileList){ 
      this.isFormError$.next(true)
      return
    }

    this.form.html_string = this.htmlstring
    this.form.name = this.form.title
    this.form.thumbnail_image = this.fileList[0]


    this.blogService.postBlog(this.form).subscribe(
      data => {
        this.router.navigateByUrl(`/blog/${data.id}`)
      },
      error => console.log(error)
    )
  }

  cancelForm(){
    console.log('handle delete uploaded file before cancel')
    this.router.navigateByUrl("/blog/overview")
  }

  selectedSeries(value:any){
    this.form.series = value
  }

}
