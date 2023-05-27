import { Component, OnInit, inject } from "@angular/core"
import { IHeaderData, LayoutService } from "../../service/layout.service"
import { IPageMetadata, MetadataService } from "src/app/service"

export interface IMetaData {
  layout: IHeaderData,
  breadcrumb: IBreadcrumbData[],
  page?: IPageMetadata
}

interface IBreadcrumbData {
  name: string
  url: string
}

@Component({template:''})
export class BaseComponent implements OnInit {
  
    protected layoutService = inject(LayoutService)
    protected metaDateService = inject(MetadataService)
    protected metaData: IMetaData = {} as IMetaData

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

  }
  