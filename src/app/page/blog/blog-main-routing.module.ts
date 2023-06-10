import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllBlogsComponent } from "./pages/view-blog/view-blog.component";

const routes: Routes = [
    {
        path: '',
        component: AllBlogsComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class BlogMainRoutingModule { }