import { Component, OnInit, Optional } from '@angular/core';
import { ApiService, UserService } from 'src/app/service';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import * as cheerio from 'cheerio';
import slugify from 'slugify';
import { BasePage, IBlogRelatedData, IBlogReply, IUserInfo } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';

export interface IToCData {
  name: string
  eleId: string
}

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent extends BasePage {

  userData: IUserInfo = {} as IUserInfo
  userInfo$ = this.userService.userInfoStorage.pipe(
    tap(data => this.userData = data ),
    tap(data => this.crateAndUpadateForm())
  ) 

  blogId?:number
  blogData: any
  replyData?: IBlogReply[]
  relatedPost?: IBlogRelatedData[]
  isVisibleSidebar = false
  visibleSidebarPosition : 'bottom' | 'right' = 'right'
  targetEndpoint = ''
  currentTime = Date()


  validateForm!: UntypedFormGroup;

  isShowAuthError = false
  isAllowAddComment = false

  tocData = [] as IToCData[]

  constructor(
    private apiService:ApiService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private fb: UntypedFormBuilder,
  ) {
    super()
  }

  override ngOnInit(): void {
    this.updateLayout()
    this.updateSEO()
    this.crateAndUpadateForm()
  }

  override routeChange(data: any): void {
    this.blogId = data['id'].split('-')[0]
    this.targetEndpoint = `${END_POINT_URL_LIST.BLOG}${this.blogId}/${data.lang ? ('?lang=' + data.lang) : ''}`
    this.getBlogData(true)
  }

  crateAndUpadateForm(){
    this.isAllowAddComment = this.userData.base_user?.username ? true : false
    this.validateForm = this.fb.group({
      username: [ this.userData.base_user?.username || null, [Validators.required]],
      content: [null, [Validators.required]],
    });
  }

  setupMetaData(){
    this.metaData ={
      breadcrumb: [
        {
          name: 'All Blog',
          url: '/blog/all'
        },
        {
          name: this.blogData.name,
        }
      ],
      layout:{
        title: 'Blog Detail',
        subtitle: 'Daily reading is a must.'
      },
      page: {
        title: `FXeater | Blog | ${this.blogData.name}`,
        description: this.blogData.description
      }
    }
  }

  getBlogData(is_no_cache = false){
    const header = new HttpHeaders({'x-refresh':'true'})
    let data$ = is_no_cache 
      ? this.apiService.getDataWithUrl(this.targetEndpoint, header) 
      : this.apiService.getDataWithUrl(this.targetEndpoint)

    data$.pipe(
      tap(
        data  => {
          this.blogData = data
          this.setupMetaData()
          this.updateLayout()
          this.updateSEO()
          this.initReplyData(data.replies)
          this.relatedPost = data.related_blog
        }
      ),
      tap(_ => this.processHtmlString())
    ).subscribe()
  }

  initReplyData(data:IBlogReply[]){
    this.replyData = data
  }

  updateReplyData(data:IBlogReply){
    this.replyData?.push(data)
  }

  onSubmitComment(){

    const data = {
      content: this.validateForm.value.content,
      username: this.validateForm.value.username,
      target_blog: this.blogId
    }

    this.apiService.postDataWithUrl(END_POINT_URL_LIST.REPLY_BLOG,data).pipe(
      tap(data => {
        this.validateForm.reset()
        this.getBlogData(true)
      }),
    ).subscribe()
    return

  }

  triggerSideBar(){
    this.visibleSidebarPosition = this.breakpointObserver.isMatched('(max-width: 599px)') ?
    'bottom' : 'right'
    this.isVisibleSidebar = true
  }

  like() {
    const header = new HttpHeaders({'x-refresh':'true','x-none-loader':'true'})
    let  like$  = this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.LIKE_BLOG}${this.blogId}/`,header)
    like$.pipe(
      tap(_ => this.blogData = _)
    ).subscribe()
  }

  processHtmlString(){
    this.tocData = [] // reset toc data
    const $ = cheerio.load(this.blogData.html_string)
    $('h2').each(
      (idx,el) => {
        const slug = slugify($(el).text(),{lower: true,})
        $(el).attr('id',slug)
        this.tocData.push(
          {
            name: $(el).text(),
            eleId: slug
          }
        )
      }
    )
    this.blogData.html_string = $.html()
  }

}
