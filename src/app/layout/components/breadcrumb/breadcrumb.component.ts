import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map, tap } from 'rxjs';
import { ApiService } from 'src/app/service';
import { END_POINT_URL_LIST } from 'src/app/util';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  endpoint = END_POINT_URL_LIST.RANDOM_QUOTE
  quoteData: any
  header = new HttpHeaders({'x-refresh':'true', 'x-none-loader':'true'})
  quote$ = this.apiService.getDataWithUrl(this.endpoint, this.header).pipe(
    tap(data => this.quoteData = data),
  )

  @Input() breadcrumb: any

  constructor(
    private apiService: ApiService
  ) { }

  changeQuote(): void{
    this.quote$.subscribe()
  }

}
