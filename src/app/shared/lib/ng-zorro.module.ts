import { NgModule } from "@angular/core";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

const TARGET_COMPONENTS = [
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzMenuModule,
    NzPageHeaderModule
]

@NgModule({
    imports:[
        TARGET_COMPONENTS
    ],
    exports:[
        TARGET_COMPONENTS
    ]
})
export class ZorroModule{}