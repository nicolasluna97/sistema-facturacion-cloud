import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home';
import { InventoryPages } from './modules/inventory/pages/inventory-pages';
import { SalesComponent } from './modules/sales/pages/sales.component';
import { historyRoutes } from './modules/history/history.route';
import { NotFoundPage } from './modules/pages/not-found-page/not-found-page/not-found-page';


export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import ('./modules/auth/auth.routes')
    },
    {
        path:'',
        component: HomeComponent,
    },
    {
        path:'ventas',
        loadChildren: () => import ('./modules/sales/sales.routes')
        .then(m => m.salesRoutes)
    },
    {
        path:'inventario',
        loadChildren: () => import ('./modules/inventory/inventory.routes')
        .then(m => m.inventoryRoutes)
    },
    {
        path:'historial',
        loadChildren: () => import ('./modules/history/history.route')
        .then(m=> m.historyRoutes)
    },
    {
        path:'estadisticas',
        loadChildren: () => import ('./modules/statistics/statistics.route')
        .then(m=> m.StatisticsRoutes)
    },
    {   
        path:'**',
        component: NotFoundPage,
    },
];
