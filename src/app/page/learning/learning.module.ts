import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReadChartPage } from "./pages/read-chart/read-chart.page";

// list your feature routes here, then go
// src\app\app-routing.module.ts
// list your route as lazy-load module there
const routes: Routes = [
    {
        path: 'learn-chart',
        component: ReadChartPage,
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
export class LearningPageModule { }

// src\app\app.module.ts
// then in the imports, add the module