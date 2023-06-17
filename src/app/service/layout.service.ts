import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface IBreadcrumbData {
  name: string
  url?: string
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

  private displayNameMap = new Map([
    [Breakpoints.XSmall, 'xsm'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);


  breakPoint$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ])
  .pipe(
    map(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          return this.displayNameMap.get(query) ?? 'Unknown';
        }
      }
      return 'Unknown'
    })
  )


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
