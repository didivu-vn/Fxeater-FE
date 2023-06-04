import { Component, Input, OnInit } from '@angular/core';
import { IBlogReply } from '../../interfaces/blog-reply.interface';

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
