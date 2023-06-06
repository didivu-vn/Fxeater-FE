import { Component, OnInit, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService, UserService } from 'src/app/service';
import { Meta } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { IPageMetadata, MetadataService } from 'src/app/service/metadata-service.service';
import * as cheerio from 'cheerio';
import slugify from 'slugify';
import { IUserInfo } from 'src/app/shared/interface';
import { IBlogRelatedData, IBlogReply } from '../../interfaces/blog-reply.interface';
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
export class BlogPageComponent implements OnInit {

  userData: IUserInfo = {} as IUserInfo
  userInfo$ = this.userService.userInfoStorage.pipe(
    tap(data => this.userData = data )
  ) 

  blogId?:number
  blogData: any
  replyData?: IBlogReply[]
  relatedPost?: IBlogRelatedData[]
  visibleSidebarRight = false
  visibleSidebarBottom = false
  
  currentTime = Date()

  cmtForm = new FormGroup({
    content: new FormControl(``, Validators.required),
  })

  isShowAuthError = false

  tocData = [] as IToCData[]

  constructor(
    private route: ActivatedRoute,
    private apiService:ApiService,
    private titleService: Title,    
    private meta: Meta,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    @Optional() private meadataService :MetadataService,
  ) {
    this.titleService.setTitle('blog')
  }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.blogId = data['id'].split('-')[0]
        this.getBlogData(true)
      }
    )
  }

  getBlogData(is_no_cache = false){
    const header = new HttpHeaders({'x-refresh':'true'})
    let data$ = is_no_cache 
      ? this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.BLOG}${this.blogId}/`,header) 
      : this.apiService.getDataWithUrl(`${END_POINT_URL_LIST.BLOG}${this.blogId}/`)

    data$.pipe(
      tap(
        data  => {
          this.blogData = data
          const metaData: IPageMetadata = {
            title: `FXeater | Blog | ${this.blogData.name}`,
            description: this.blogData.description,
            author: this.blogData.author,
            keywords: `FXeater|skill share|${this.blogData.name}`.split('|'),
            type: 'website'
          }
          this.meadataService.updateMetadata(metaData)
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

    if (this.userService.isHasUserInfo){
      const data = {
        content:this.cmtForm.value.content,
        target_blog:this.blogId
      }
      this.apiService.postDataWithUrl(END_POINT_URL_LIST.REPLY_BLOG,data).subscribe(
        data=> {
          this.getBlogData(true)
          this.cmtForm.reset()
        }
      )
      return
    }

    // do not have user info
    this.isShowAuthError = true

  }

  triggerSideBar(){
    this.breakpointObserver.isMatched('(max-width: 599px)') ?
    this.visibleSidebarBottom = true :
    this.visibleSidebarRight = true
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
