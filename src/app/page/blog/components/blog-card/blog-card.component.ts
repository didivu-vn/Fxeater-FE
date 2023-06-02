import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import slugify from 'slugify';
import { IBlogData } from '../../interfaces/blog-reply.interface';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() blogData: IBlogData = {} as IBlogData

  blogSlug:string =''

  constructor() { }

  ngOnInit(): void {
    this.blogSlug = slugify(this.blogData.name, {locale: 'vi'}).toLowerCase()
  }

}
