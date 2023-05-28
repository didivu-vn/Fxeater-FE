import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface IBreadcrumbData {
  name: string
  url: string
  icon?: string
}

export interface IHeaderData {
  title: string
  subtitle: string
  back_link?: string
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  breadcrumbData$ = new BehaviorSubject([] as IBreadcrumbData[])
  headerData$ = new BehaviorSubject({} as IHeaderData)
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  getBreadcrumbData(){
    return this.breadcrumbData$
  }

  setBreadbrumbData(data: IBreadcrumbData[]){
    this.breadcrumbData$.next(data)
  }

  getHeaderData() {
    return this.headerData$
  }

  setHeaderData(data: IHeaderData) {
    this.headerData$.next(data)
  }

  getIsHandset(){
    return this.isHandset$
  }

}
