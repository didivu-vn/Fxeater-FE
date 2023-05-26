import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  constructor() { }

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

}
