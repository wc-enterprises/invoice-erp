import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from "rxjs";
import { ICar } from "./cars.types";
import {
  child,
  Database,
  get,
  onValue,
  ref,
  set,
  Unsubscribe,
} from "@angular/fire/database";
import { FuseMockApiUtils } from "@fuse/lib/mock-api";

@Injectable({ providedIn: "root" })
export class CarsService {
//   private _pagination: BehaviorSubject<InventoryPagination | null> =
//     new BehaviorSubject(null);
  private _car: BehaviorSubject<ICar | null> = new BehaviorSubject(null);
  private _cars: BehaviorSubject<ICar[] | null> = new BehaviorSubject(null);

  private _unsubscribers: Unsubscribe[] = [];

  /**
   * Constructor
   */
  constructor(private db: Database) {
    this.getCars();
  }
  destructor() {
    this._unsubscribers.forEach((item) => {
      item();
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for pagination
   */
//   get pagination$(): Observable<InventoryPagination> {
//     return this._pagination.asObservable();
//   }

  /**
   * Getter for product
   */
  get car$(): Observable<ICar> {
    return this._car.asObservable();
  }

  /**
   * Getter for products
   */
  get cars$(): Observable<ICar[]> {
    return this._cars.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get cars
   */
  getCars(
    page: number = 0,
    size: number = 10,
    sort: string = "name",
    order: "asc" | "desc" | "" = "asc",
    search: string = ""
  ) {
    // TODO: Include pagination to this function.

    const carsRef = ref(this.db, "cars");
    const unsubsriber = onValue(carsRef, (snapshot) => {
      const data = snapshot.val();

      // Frame cars for component
      const cars = [];
      Object.keys(data).forEach((key) => {
        const val = data[key];
        cars.push(val);
      });

      this._cars.next(cars);
    });

    this._unsubscribers.push(unsubsriber);
  }

  /**
   * Get product by id
   */
  getCarById(id: string): Observable<ICar> {
    return this._cars.pipe(
      take(1),
      map((products) => {
        // Find the product
        const product = products.find((item) => item.id === id) || null;

        // Update the product
        this._car.next(product);

        // Return the product
        return product;
      }),
      switchMap((product) => {
        if (!product) {
          return throwError("Could not found product with id of " + id + "!");
        }

        return of(product);
      })
    );
  }

  /**
   * Create car
   */
  createNoopCar(): Observable<ICar> {
    return this.cars$.pipe(
      take(1),
      switchMap((cars) => {
        const newCar: ICar = {
          id: FuseMockApiUtils.guid(),
          customerId: "",
          regNo: "",
          make: "",
          model: "",
        };

        this._cars.next([newCar, ...cars]);

        return of(newCar);
      })
    );
  }

  /**
   * Update car
   *
   * @param id
   * @param car
   */
  async updateCar(id: string, updatedCar: ICar): Promise<ICar> {
    await set(ref(this.db, "cars/" + id), updatedCar);

    this._car.next(updatedCar);

    return updatedCar;
  }

  /**
   * Delete the product
   *
   * @param id
   */
  async deleteProduct(id: string): Promise<boolean> {
    try {
      await set(ref(this.db, "cars/" + id), null);
      return true;
    } catch (err) {
      console.log("An error occured while deleting the car", err.message);
      return false;
    }
  }

  searchCars(query: string) {
    const dbRef = ref(this.db);

    return get(child(dbRef, "cars"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dbCars = snapshot.val();

          // Frame cars for component
          let cars: ICar[] = [];
          Object.keys(dbCars).forEach((key) => {
            const val = dbCars[key];
            cars.push(val);
          });

          cars = cars.filter((car) => {
            if (
              (car.regNo &&
                car.regNo
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(query.toLowerCase().replace(/\s/g, ""))) ||
              (car.make &&
                car.make.toLowerCase().includes(query.toLowerCase())) ||
              (car.model &&
                car.model.toLowerCase().includes(query.toLowerCase())) ||
              (car.customerId && car.customerId === query) ||
              (car.id && car.id === query)
            ) {
              return true;
            }
            return false;
          });

          this._cars.next(cars);
          return true;
        } else {
          console.log("No data available");
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
