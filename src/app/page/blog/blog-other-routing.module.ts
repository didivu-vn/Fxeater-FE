import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogPageComponent } from "./pages/single-page/blog-page.component";
import { NewBlogComponent } from "./pages/new-blog/new-blog.component";


const routes: Routes = [
    {
        path: 'new',
        component: NewBlogComponent,
    },
    {
        path: ':id',
        component: BlogPageComponent,
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogOtherRoutingModule { }

