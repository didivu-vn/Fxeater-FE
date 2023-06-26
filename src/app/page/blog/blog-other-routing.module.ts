import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogPageComponent } from "./pages/single-page/blog-page.component";
import { NewBlogComponent } from "./pages/new-blog/new-blog.component";
import { EditBlogComponent } from "./pages/edit-blog/edit-blog.component";
import { SeriesPage } from "./pages/series/series.page";


const routes: Routes = [
    {
        path: 'new',
        pathMatch: 'full',
        component: NewBlogComponent,
    },
    {
        path: 'series',
        pathMatch: 'full',
        component: SeriesPage,
    },
    {
        path: 'series/:lang',
        component: SeriesPage,
    },
    {
        path: ':id/edit',
        pathMatch: 'full',
        component: EditBlogComponent,
    },
    {
        path: ':id',
        component: BlogPageComponent,
    }, 
    {
        path: ':id/:lang',
        component: BlogPageComponent,
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogOtherRoutingModule { }

