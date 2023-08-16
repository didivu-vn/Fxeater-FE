import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchIndexComponent } from "./pages/search-index/search-index.component";

const routes: Routes = [
    {
        path: '',
        component: SearchIndexComponent,
    },
];

// no need to touch anything here
@NgModule({

    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})

// rename the class
export class SearchPageModule { }
