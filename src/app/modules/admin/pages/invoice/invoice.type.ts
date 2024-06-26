export interface Invoice {
    id: string;
    billTo: {
        name: string;
        address?: string;
        phoneNumber: {
            country: string;
            phoneNumber: string;
            label: string;
        },
        email: {
            email: string;
            label: string;
        }
    };
    carInfo?: {
        regNo: string;
        make: string;
        model: string; 
    },
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
    },
    discount:{
        unit: string;
        value: number
    },
    invoiceDate: string;
    dueDate: string;
}