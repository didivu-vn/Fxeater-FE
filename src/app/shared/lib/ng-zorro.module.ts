import { NgModule } from "@angular/core";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

const TARGET_COMPONENTS = [
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzCardModule,
    NzTabsModule,
    NzAvatarModule,
    NzRateModule,
    NzDividerModule,
    NzCarouselModule,
    NzBackTopModule,
    NzStatisticModule,
    NzGridModule,
    NzCollapseModule,
    NzSpaceModule,
    NzTagModule,
    NzDescriptionsModule,
    NzSegmentedModule
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