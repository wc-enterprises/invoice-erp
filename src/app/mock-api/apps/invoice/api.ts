import { Injectable } from '@angular/core';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { assign, cloneDeep } from 'lodash-es';
import { from, map } from 'rxjs';
import { invoicesData } from './data';
import { Invoice } from 'app/modules/admin/pages/invoice/invoice.type';

@Injectable({providedIn: 'root'})
export class InvoicesMockApi
{
    private _invoices: Invoice[] = invoicesData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Contacts - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/invoices/all')
            .reply(() =>
            {
                // Clone the invoices
                const invoices = cloneDeep(this._invoices);

                // Return the response
                return [200, invoices];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/inoices/invoice')
            .reply(({request}) =>
            {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the contacts
                const contacts = cloneDeep(this._invoices);

                // Find the contact
                const contact = contacts.find(item => item.id === id);

                // Return the response
                return [200, contact];
            });
    }
}
