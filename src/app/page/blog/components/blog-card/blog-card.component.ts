import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import slugify from 'slugify';
import { IBlogData } from 'src/app/shared/interface';
import { ZorroModule } from 'src/app/shared/lib';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ZorroModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() blogData: IBlogData = {} as IBlogData

  blogSlug:string =''

  blogHagtag:string[] = []

  constructor() { }

  ngOnInit(): void {
    this.transformData()
  }

  transformData(){
    let hagtag = this.blogData.sub_title
    this.blogHagtag = hagtag.split(' ')

    this.blogSlug = slugify(this.blogData.name, {locale: 'vi'}).toLowerCase()
  }

}
