import { Component } from '@angular/core';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { ApiService } from 'src/app/service';
import { BasePage, IMetaData } from 'src/app/shared/interface';
import { END_POINT_URL_LIST } from 'src/app/util';
import { IChartPattern } from '../../interface/interface';
import { BreakpointObserver } from '@angular/cdk/layout';


const _metaData: IMetaData = {
  breadcrumb: [
    {
      name: 'Chart pattern',
      url: '/learn-chart'
    },
  ],
  layout:{
    title: 'Chart pattern',
    subtitle: 'Find good entry manually by mastering Chart patterns.'
  },
  page: {
    title: `FXeater | Chart pattern`,
    description: 'Find good entry manually by mastering Chart patterns.'
  }
}

@Component({
  selector: 'app-read-chart',
  templateUrl: './read-chart.page.html',
  styleUrls: ['./read-chart.page.scss']
})
export class ReadChartPage extends BasePage {

  protected override metaData: IMetaData = _metaData;

  isShowChartInfoModal = false
  modalPlacement: 'right' | 'bottom' = 'right'
  modelSize: number = 640

  currentPageData = {} as {patternData:IChartPattern[]}

  selectedChart = {} as IChartPattern

  patternData$: Observable<IChartPattern[]>  = this.apiService.getDataWithUrl(END_POINT_URL_LIST.CHART_PATTERN).pipe(
    map(data => data['results'])
  )

  pageData$ = combineLatest([
    this.patternData$,
    this.route$,
  ]).pipe(
    map(data => {
      return {
        patternData: data[0],
      }
    }),
    tap(data => 
      this.currentPageData = data
    )
  )


  constructor(
    private apiService: ApiService,
    private breakpointObserver: BreakpointObserver,
  ) {
    super()
  }

  viewChartInfo(inID: number) {
    this.modalPlacement = this.breakpointObserver.isMatched('(max-width: 599px)') ? 'bottom' : 'right'

    this.modelSize = this.breakpointObserver.isMatched('(min-width: 1024px)') ? 800 : 640

    this.isShowChartInfoModal = true
    this.selectedChart = this.currentPageData.patternData.find(_ => _.id == inID) || {} as IChartPattern
  }
}

