import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import slugify from 'slugify';
import { IBlogRelatedData } from '../../interfaces/blog-reply.interface';

@Component({
  selector: 'app-related-post',
  templateUrl: './related-post.component.html',
  styleUrls: ['./related-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedPostComponent implements OnInit {

  @Input() relatedData: IBlogRelatedData[] = []

  relatedDataSlug: IBlogRelatedData[] = []

  constructor() { }

  ngOnInit(): void {
    this.relatedDataSlug = this.relatedData.map(data => {
      return {
        id: data.id,
        name: data.name,
        slug: slugify(data.name, {locale: 'vi'}).toLowerCase()
      }
    })
  }
}
