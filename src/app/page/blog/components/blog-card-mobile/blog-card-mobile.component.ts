import { Component, Input, OnInit } from '@angular/core';
import { IBlogData } from 'src/app/shared/interface';
import slugify from 'slugify';

@Component({
  selector: 'app-blog-card-mobile',
  templateUrl: './blog-card-mobile.component.html',
  styleUrls: ['./blog-card-mobile.component.scss']
})
export class BlogCardMobileComponent implements OnInit {

  @Input() blogData: IBlogData = {} as IBlogData

  blogSlug:string =''

  constructor() { }

  ngOnInit(): void {
    this.blogSlug = slugify(this.blogData.name, {locale: 'vi'}).toLowerCase()
  }

}
