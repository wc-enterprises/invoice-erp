import { Routes } from "@angular/router";
import { InvoicesComponent } from "./invoices.component";
import { InvoicesListComponent } from "./list/invoices-list.component";

export default [
  {
    path: "",
    component: InvoicesComponent,
    children: [
      {
        path: "",
        component: InvoicesListComponent,
        resolve: {},
      },
    ],
  },
] as Routes;
