import { Component, Input, OnInit } from '@angular/core';
import { SlugService } from 'src/app/service';
import { IBlogData } from 'src/app/shared/interface';


@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.scss']
})
export class HomeBlogComponent implements OnInit {

  @Input() blogsData = [] as IBlogData[]

  constructor( 
    private slugService: SlugService
  ) {}

  ngOnInit(): void {
    this.blogsData.map(
      (blog:IBlogData) => {
          blog.slug = this.slugService.gerateBlogUrl(blog)
      }
    )
  }

}
