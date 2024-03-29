import { Component } from '@angular/core';
import { ApiService } from 'src/app/service';

import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { END_POINT_URL_LIST } from 'src/app/util';
import { BlogService } from '../../services/blog.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { BasePage, IBlogData, IBlogRelatedData } from 'src/app/shared/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

const MSG_TYPE ={
  OK:'success',
  ERROR:'error',
  WARNING:'warning'
}


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent extends BasePage {

  quillInitValue = ''
  htmlstring = ''

  isPreviewContent = false
  currentDate = new Date();

  seriesUrl = END_POINT_URL_LIST.BLOG_SERIES
  seriesData$ = this.apiService.getDataWithUrl(this.seriesUrl).pipe(
    map(data => data.results),
  )  

  form: any = {
    title: '',
    sub_title: '',
    description: '',
    thumbnail_image_url: '',
    series: null,
  }

  blogId?:number
  blogData: any
  
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

    this.route.params.subscribe(
      data => {
        this.blogId = data['id'].split('-')[0]
        this.getBlogData(false)

        this.metaData ={
          breadcrumb: [
            {
              name: 'All Blog',
              url: '/blog/all'
            },
            {
              name: 'Edit Blog',
            }
          ],
          layout:{
            title: 'Edit Blog',
            subtitle: 'Daily reading is a must.'
          },
        }
        this.updateLayout()
      }
    )
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };


  sendForm(){
    // bad code here, sorry
    if (!this.form.title || !this.htmlstring){
      this.isFormError$.next(true)
      return
    }

    this.form.html_string = this.htmlstring
    this.form.name = this.form.title
    this.form.thumbnail_image =  this.fileList[0]

    if (Object.keys(this.form).length > 0 && this.blogId) {
      this.blogService.putBlog(this.form, this.blogId).subscribe(
        data => {
          this.router.navigateByUrl(`/blog/${this.blogId}`)
        },
        error => console.log(error)
      )
    } else {
      this.isFormError$.next(true)
    }
  }

  cancelForm(){
    console.log('handle delete uploaded file before cancel')
    this.router.navigateByUrl(`/blog/${this.blogId}`)
  }

  selectedSeries(value:any){
    this.form.series = value
  }

  updateHttmlString(htmlstring:string){
    this.htmlstring = htmlstring
  }

  getBlogData(is_no_cache = false){
    const header = new HttpHeaders({'x-refresh':'true'})
    let data$ = is_no_cache 
      ? this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.BLOG}${this.blogId}/`,header) 
      : this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.BLOG}${this.blogId}/`)

    data$.subscribe(
      (data:IBlogData) => {
        this.blogData = data
        this.updateDataToForm(data)

        this.metaData.page ={
          title: `FXeater | Edit | ${this.blogData.name}`,
          description: 'Sharing with other.'
        }
        this.updateSEO()
      }
    )
  }

  updateDataToForm(data:IBlogData){
    this.quillInitValue = data.html_string
    this.form.title = data.name
    this.form.sub_title = data.sub_title
    this.form.description = data.description
    this.form.thumbnail_image_url = data.thumbnail_image_url
    this.updateHttmlString(data.html_string)
  }
}