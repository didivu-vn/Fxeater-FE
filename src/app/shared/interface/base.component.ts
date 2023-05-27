import { Component, OnInit, inject } from "@angular/core"
import { IHeaderData, LayoutService } from "../../service/layout.service"

export interface IMetaData {
  layout: IHeaderData,
  breadcrumb: IBreadcrumbData[]
}

interface IBreadcrumbData {
  name: string
  url: string
}

@Component({template:''})
export class BaseComponent implements OnInit {
  
    private layoutService = inject(LayoutService)
    protected metaData: IMetaData = {} as IMetaData
    
    constructor( ) {}
  
    ngOnInit(): void {
      this.updateLayout()
    }

    updateLayout(){
      this.metaData.breadcrumb && this.layoutService.setBreadbrumbData(this.metaData.breadcrumb)
      this.metaData.layout && this.layoutService.setHeaderData(this.metaData.layout)
    }
  }
  