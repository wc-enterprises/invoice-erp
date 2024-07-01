export interface IInvoice {
  id: string;
  date: string;
  dueDate?: string;

  billTo: {
    id?: string;
    name: string;
    phoneNumber: {
      code: string;
      number: string;
    };
    email?: string;
    address?: string;
  };

  carInfo: {
    id?: string;
    regNo: string;
    make: string;
    model: string;
    nextServiceDate?: string;
    motValidTill?: string;
    insuranceValidTill?: string;
    roadTaxValidTill?: string;
  };

  services: {
    id: string;
    item: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  tax: {
    unit: string;
    value: number;
  };
  discount: {
    unit: string;
    value: number;
  };
}