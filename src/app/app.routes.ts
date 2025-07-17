import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { InventoryPages } from './modules/inventory/pages/inventory-pages';


export const routes: Routes = [
    {
        path:'',
        component: Home,
    },
    {
        path:'inventory',
        loadChildren: () => import ('./modules/inventory/inventory.routes'),
    },
    {   
         path:'**',
         redirectTo:'',
    },
];
