import { Injectable } from "@angular/core";
import { Database, onValue, ref, set } from "@angular/fire/database";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { Contact } from "app/modules/admin/apps/contacts/contacts.types";
import {
  contacts as contactsData,
  countries as countriesData,
} from "app/services/apps/contacts/data";
import { assign, cloneDeep } from "lodash-es";
import { from, map } from "rxjs";


@Injectable({ providedIn: "root" })
export class ContactsMockApi {
  private _contacts: any[] = contactsData;
  private _countries: any[] = countriesData;

  /**
   * Constructor
   */
  constructor(
    private _fuseMockApiService: FuseMockApiService,
    private db: Database
  ) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  getAllContacts() {
    const starCountRef = ref(this.db, "contacts");
    return onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Contacts consoled from service", data);
      return data;
    });
  }

  createContact(contactData: Omit<Contact, 'id'>) {
      const id =  FuseMockApiUtils.guid();
      set(ref(this.db, "contacts/" + id), { id, ...contactData});
  }


  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Contacts - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet("api/apps/contacts/all").reply(() => {
      // Clone the contacts
      const contacts = cloneDeep(this._contacts);

      // Sort the contacts by the name field by default
      contacts.sort((a, b) => a.name.localeCompare(b.name));

      // Return the response
      return [200, contacts];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Contacts Search - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet("api/apps/contacts/search")
      .reply(({ request }) => {
        // Get the search query
        const query = request.params.get("query");

        // Clone the contacts
        let contacts = cloneDeep(this._contacts);

        // If the query exists...
        if (query) {
          // Filter the contacts
          contacts = contacts.filter(
            (contact) =>
              contact.name &&
              contact.name.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Sort the contacts by the name field by default
        contacts.sort((a, b) => a.name.localeCompare(b.name));

        // Return the response
        return [200, contacts];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Contact - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet("api/apps/contacts/contact")
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get("id");

        // Clone the contacts
        const contacts = cloneDeep(this._contacts);

        // Find the contact
        const contact = contacts.find((item) => item.id === id);

        // Return the response
        return [200, contact];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Contact - POST
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onPost("api/apps/contacts/contact").reply(() => {
      // Generate a new contact
      const newContact = {
        id: FuseMockApiUtils.guid(),
        avatar: null,
        name: "New Contact",
        emails: [],
        phoneNumbers: [],
        job: {
          title: "",
          company: "",
        },
        birthday: null,
        address: null,
        notes: null,
        tags: [],
      };

      // Unshift the new contact
      this._contacts.unshift(newContact);

      // Return the response
      return [200, newContact];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Contact - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPatch("api/apps/contacts/contact")
      .reply(({ request }) => {
        // Get the id and contact
        const id = request.body.id;
        const contact = cloneDeep(request.body.contact);

        // Prepare the updated contact
        let updatedContact = null;

        // Find the contact and update it
        this._contacts.forEach((item, index, contacts) => {
          if (item.id === id) {
            // Update the contact
            contacts[index] = assign({}, contacts[index], contact);

            // Store the updated contact
            updatedContact = contacts[index];
          }
        });

        // Return the response
        return [200, updatedContact];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Contact - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onDelete("api/apps/contacts/contact")
      .reply(({ request }) => {
        // Get the id
        const id = request.params.get("id");

        // Find the contact and delete it
        this._contacts.forEach((item, index) => {
          if (item.id === id) {
            this._contacts.splice(index, 1);
          }
        });

        // Return the response
        return [200, true];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Countries - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet("api/apps/contacts/countries")
      .reply(() => [200, cloneDeep(this._countries)]);

    // -----------------------------------------------------------------------------------------------------
    // @ Avatar - POST
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read the given file as mock-api url
     *
     * @param file
     */
    const readAsDataURL = (file: File): Promise<any> =>
      // Return a new promise
      new Promise((resolve, reject) => {
        // Create a new reader
        const reader = new FileReader();

        // Resolve the promise on success
        reader.onload = (): void => {
          resolve(reader.result);
        };

        // Reject the promise on error
        reader.onerror = (e): void => {
          reject(e);
        };

        // Read the file as the
        reader.readAsDataURL(file);
      });
    this._fuseMockApiService
      .onPost("api/apps/contacts/avatar")
      .reply(({ request }) => {
        // Get the id and avatar
        const id = request.body.id;
        const avatar = request.body.avatar;

        // Prepare the updated contact
        let updatedContact: any = null;

        // In a real world application, this would return the path
        // of the saved image file (from host, S3 bucket, etc.) but,
        // for the sake of the demo, we encode the image to base64
        // and return it as the new path of the uploaded image since
        // the src attribute of the img tag works with both image urls
        // and encoded images.
        return from(readAsDataURL(avatar)).pipe(
          map((path) => {
            // Find the contact and update it
            this._contacts.forEach((item, index, contacts) => {
              if (item.id === id) {
                // Update the avatar
                contacts[index].avatar = path;

                // Store the updated contact
                updatedContact = contacts[index];
              }
            });

            // Return the response
            return [200, updatedContact];
          })
        );
      });
  }
}
