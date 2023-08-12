import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/service';
import { END_POINT_URL_LIST } from 'src/app/util';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  endpoint = END_POINT_URL_LIST.RANDOM_QUOTE
  quote$ = this.apiService.getDataWithUrl(this.endpoint).pipe(
    map(data => data)
  )

  @Input() breadcrumb: any

  constructor(
    private apiService: ApiService
  ) { }

}
