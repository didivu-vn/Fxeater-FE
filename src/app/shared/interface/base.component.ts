import { Component, OnInit, inject } from "@angular/core"
import { IHeaderData, LayoutService } from "../../service/layout.service"
import { IPageMetadata, LanguageService, MetadataService } from "src/app/service"
import { ViewportScroller } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { tap } from "rxjs"

export interface IMetaData {
  layout: IHeaderData,
  breadcrumb: IBreadcrumbData[],
  page?: IPageMetadata
}

interface IBreadcrumbData {
  name: string
  url?: string
}

const sample_metaData: IMetaData = {
  breadcrumb: [
    {
      name: 'Products',
      url: '/product'
    },
    {
      name: 'Detail ' ,
      url: '/product/'
    }
  ],
  layout:{
    title: 'Product Detail',
    subtitle: 'Everything you need to know about.'
  },
  page: {
    title: `FXeater | productname`,
    description: 'Everything you need to know about.'
  }
}

@Component({template:''})
export class BasePage implements OnInit {
  
  protected layoutService = inject(LayoutService)
  protected langService = inject(LanguageService)
  protected metaDateService = inject(MetadataService)
  protected viewPortScroller = inject(ViewportScroller)
  protected route = inject(ActivatedRoute)
  protected metaData: IMetaData = {} as IMetaData

  route$ = this.route.params.pipe(
    tap(data => this.routeChange(data)),
    tap(data => this.checkLang(data))
  )

  lang$ = this.langService.lang$

  constructor( ) {}

  ngOnInit(): void {
    this.updateLayout()
    this.updateSEO()
  }

  updateLayout(){
    this.metaData.breadcrumb && this.layoutService.setBreadbrumbData(this.metaData.breadcrumb)
    this.metaData.layout && this.layoutService.setHeaderData(this.metaData.layout)
  }

  updateSEO(){
    this.metaDateService.updateMetadata(this.metaData.page || {})
  }

  scrollTop(){
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  routeChange(data:any){
    
  }

  checkLang(data:any) {
    const lang = data.lang ? data.lang : '';
    this.langService.langArray.includes(lang) && lang !== this.lang$.value.lang && this.langService.setLangToStorage(lang)
  }

}
  