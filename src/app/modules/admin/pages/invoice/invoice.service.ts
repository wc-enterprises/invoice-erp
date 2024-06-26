import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  tap,
  take,
  map,
  switchMap,
  throwError,
  of
} from "rxjs";
import { Invoice } from "./invoice.type";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class InvoicesService {
  // Private
  private _invoices: BehaviorSubject<Invoice[] | null> = new BehaviorSubject(
    null
  );
  private _invoice: BehaviorSubject<Invoice | null> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // --------------------------------------------------------------------------------------------------
  // @ Accessors
  // --------------------------------------------------------------------------------------------------

  /**
   * Getter for invoices
   */
  get invoices$(): Observable<Invoice[]> {
    return this._invoices.asObservable();
  }

  /**
   * Getter for invoice
   */
  get invoice$(): Observable<Invoice> {
    return this._invoice.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get invoices
   */
  getInvoices(): Observable<Invoice[]> {
    return this._httpClient.get<Invoice[]>("app/apps/invoices/all").pipe(
      tap((invoices) => {
        this._invoices.next(invoices);
      })
    );
  }

  /**
   * Get contact by id
   */
  getInvoiceById(id: string): Observable<Invoice> {
    return this._invoices.pipe(
      take(1),
      map((invoices) => {
        const invoice = invoices.find((item) => item.id === id) || null;

        this._invoice.next(invoice);

        return invoice;
      }),
      switchMap((invoice) => {
        if (!invoice) {
          return throwError("Could not find invoice with id of " + id + "!");
        }
        return of(invoice);
      })
    );
  }
}
