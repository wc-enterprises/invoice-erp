import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { InventoryComponent } from 'app/modules/admin/apps/spares-and-services/inventory.component';
import { InventoryService } from 'app/modules/admin/apps/spares-and-services/inventory.service';
import { InventoryListComponent } from 'app/modules/admin/apps/spares-and-services/list/inventory.component';

export default [
    {
        path     : '',
        component: InventoryComponent,
        children : [
            {
                path     : '',
                component: InventoryListComponent,
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
