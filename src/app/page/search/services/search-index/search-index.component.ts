import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { ApiService, SlugService, UserService } from 'src/app/service';
import { BasePage, IMetaData } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';

export interface IResult {
	id: number;
	name: string;
	detail: string;
	thumbnail_image: string;
	type: 1 | 2 | 3;
  style?: string
  type_name?: string
  url?: string
}

export interface ISearchData {
	kw: string;
	status: number;
	result: IResult[];
}

const metaData = {
  breadcrumb: [
    {
      name: 'Search',
      url: '/search'
    },
  ],
  layout:{
    title: 'Search Detail',
    subtitle: 'Everything you need to know about.'
  },
  page: {
    title: `FXeater | Search`,
    description: `Fxeater's content search page`
  }
}

const DATA_TYPE_MAP = {
  1: {
    style: 'magenta',
    type_name: 'blog',
    url: ''
  },
  2: {
    style: 'green',
    type_name: 'series',
    url: '/blog/series'
  },
  3: {
    style: 'volcano',
    type_name: 'learn chart',
    url: '/learn/learn-chart'
  },
}

@Component({
  selector: 'app-search-index',
  templateUrl: './search-index.component.html',
  styleUrls: ['./search-index.component.scss']
})
export class SearchIndexComponent extends BasePage {

  data: IResult[] = [];


  protected override metaData: IMetaData = metaData

  target_kw = ''

  query$ = this.route.queryParams.pipe(
    tap((params) => this.target_kw = params['kw'] || ''),
    switchMap(async () => this._getSearchResult()),
  )

  pageData$ = combineLatest([
    this.route$,
    this.query$
  ])

  constructor(
    private apiService:ApiService,
    private userSerivce: UserService,
    private router: Router,
  ) { 
    super();
  }

  private _getSearchResult() {
    this.target_kw &&
    this.apiService.postDataWithUrl(END_POINT_URL_LIST.SEARCH, {kw: this.target_kw}).pipe(
      tap((data: ISearchData) => {
        this.data = data.result
        this._processData()
      }),
      tap(_ => console.log(this.data))
    ).subscribe()
  }

  private _processData(){
    this.data.map(
      item => {
        item.style = DATA_TYPE_MAP[item.type].style
        item.type_name = DATA_TYPE_MAP[item.type].type_name
        item.url = [2,3].includes(item.type) ?  DATA_TYPE_MAP[item.type].url : `${DATA_TYPE_MAP[item.type].url}${this.slugService.gerateBlogUrl({id:item.id, name: item.name})}`
      }
    )
  }

  search():void {
    this.target_kw &&
    this.router.navigate(['/search'],
      { 
        queryParams: {kw:this.target_kw}
      });
  }

}
