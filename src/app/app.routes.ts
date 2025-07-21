import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home';
import { InventoryPages } from './modules/inventory/pages/inventory-pages';
import { SalesComponent } from './modules/sales/pages/sales.component';
import historyRoutes from './modules/history/history.route';


export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
    },
    {
        path:'sales',
        loadChildren: () => import ('./modules/sales/sales.routes')
        .then(m => m.salesRoutes)
    },
    {
        path:'inventory',
        loadChildren: () => import ('./modules/inventory/inventory.routes')
        .then(m => m.inventoryRoutes)
    },
    {
        path:'history',
        loadChildren: () => import ('./modules/history/history.route')
        .then(m=> m.historyRoutes)
    },
    {
        path:'statistics',
        loadChildren: () => import ('./modules/statistics/statistics.route')
        .then(m=> m.StatisticsRoutes)
    },
    {   
         path:'**',
         redirectTo:'',
    },
];
