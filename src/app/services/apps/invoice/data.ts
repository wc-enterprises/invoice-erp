/* eslint-disable */
export const invoicesData = [
  {
    id: "INV-001",
    billTo: {
      name: "John Doe",
      address: "123 Main St, Anytown USA",
      phoneNumber: {
        country: "USA",
        phoneNumber: "(555) 123-4567",
        label: "Work",
      },
      email: {
        email: "john.doe@example.com",
        label: "Work",
      },
    },
    carInfo: {
      regNo: "ABC-1234",
      make: "Toyota",
      model: "Corolla",
    },
    services: [
      {
        id: "SERV-001",
        name: "Oil Change",
        quantity: 1,
        price: 29.99,
        total: 29.99,
      },
      {
        id: "SERV-002",
        name: "Tire Rotation",
        quantity: 2,
        price: 19.99,
        total: 39.98,
      },
    ],
    tax: {
      unit: "%",
      value: 8.25,
    },
    discount: {
      unit: "%",
      value: 5.0,
    },
    invoiceDate: "2024-06-21T10:59:51.414Z",
    dueDate: "2024-07-21T10:59:51.414Z",
  },
  {
    id: "INV-002",
    billTo: {
      name: "Jane Smith",
      address: "456 Elm St, Othertown USA",
      phoneNumber: {
        country: "Canada",
        phoneNumber: "(514) 987-6543",
        label: "Work",
      },
      email: {
        email: "jane.smith@example.ca",
        label: "Work",
      },
    },
    carInfo: undefined,
    services: [
      {
        id: "SERV-003",
        name: "Brake Pad Replacement",
        quantity: 1,
        price: 99.99,
        total: 99.99,
      },
    ],
    tax: {
      unit: "$",
      value: 12.5,
    },
    discount: {
      unit: "%",
      value: 10.0,
    },
    invoiceDate: "2024-06-21T10:59:51.414Z",
    dueDate: "2024-07-21T10:59:51.414Z",
  },
];
