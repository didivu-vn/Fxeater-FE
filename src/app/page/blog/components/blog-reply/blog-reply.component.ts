import { Component, Input, OnInit } from '@angular/core';
import { IBlogReply } from 'src/app/shared/interface';

@Component({
  selector: 'app-blog-reply',
  templateUrl: './blog-reply.component.html',
  styleUrls: ['./blog-reply.component.scss']
})
export class BlogReplyComponent implements OnInit {

  @Input() input: IBlogReply[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
