import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllBlogsComponent } from "./page/view-blog/view-blog.component";
import { BlogPageComponent } from "./page/single-page/blog-page.component";

const routes: Routes = [
    {
        path: '',
        component: AllBlogsComponent,
    },
    {
        path: ':id',
        component: BlogPageComponent,
    },
];

@NgModule({
    declarations:[],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class BlogRoutingModule { }