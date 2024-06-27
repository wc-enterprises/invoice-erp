import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { CarsComponent } from './cars.component';
import { CarsListComponent } from './list/cars.component';

export default [
    {
        path     : '',
        component: CarsComponent,
        children : [
            {
                path     : '',
                component: CarsListComponent,
                resolve  : {
                    brands    : () => inject(InventoryService).getBrands(),
                    categories: () => inject(InventoryService).getCategories(),
                    products  : () => inject(InventoryService).getProducts(),
                    tags      : () => inject(InventoryService).getTags(),
                    vendors   : () => inject(InventoryService).getVendors(),
                },
            },
        ],
    },
] as Routes;
