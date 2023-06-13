import { Component, Input, OnInit } from '@angular/core';
import { SlugService } from 'src/app/service';
import { LayoutService } from 'src/app/service/layout.service';
import { IBlogData } from 'src/app/shared/interface';


@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.scss']
})
export class HomeBlogComponent implements OnInit {

  @Input() blogsData = [] as IBlogData[]

  isHandset$ = this.layoutService.getIsHandset()

  constructor( 
    private slugService: SlugService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.blogsData.map(
      (blog:IBlogData) => {
          blog.slug = this.slugService.gerateBlogUrl(blog)
      }
    )
  }

}
