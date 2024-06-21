import { countryAlpha2IsoCodes } from "./country-iso-codes";
import { languageIso_639_1_Code, languageIso_639_2T_Code } from "./language-iso-codes";
import { UNIT } from "./units-of-measurement";

export type VALID_COUNTRY_CODES = (typeof countryAlpha2IsoCodes)[number];

export type LANGUAGE_CODES = (typeof languageIso_639_1_Code)[number] | (typeof languageIso_639_2T_Code)[number];
export type SHORT_LANGUAGE_CODES = (typeof languageIso_639_1_Code)[number];
export type LONG_LANGUAGE_CODES = (typeof languageIso_639_2T_Code)[number];

export interface IPhoneNumber {
    code: string;
    number: number;
}

export interface IAddress {
    id: string;
    label: T_ADDRESS_LABEL;
    addressLine1: string;
    addressLine2: string;
    addressLine3?: string;
    city: string;
    state: string;
    postalCode: string;
    createdAt: Date;
  }

  export type T_ADDRESS_LABEL = 'HOME' | 'WORK' | 'OTHER';

  export const PossibleMerchantRiskClass = ['HIGH', 'LOW', 'NORMAL'] as const;
  export type  VALID_MERCHNAT_RISK_CLASS = (typeof PossibleMerchantRiskClass)[number];
  

export interface ICreateMerchant {
    merchantId: string;
    merchantName: string;
    email: string;
    countryCode: VALID_COUNTRY_CODES;
    merchantLogoUrl?: string;
    merchantType?: string;
    merchantLanguage?: SHORT_LANGUAGE_CODES;
    phoneNumber?: IPhoneNumber;
    companyId?: string;
    address?: IAddress;
    mccCode?: string;
    partnerId?: string;
    riskClass?: VALID_MERCHNAT_RISK_CLASS;
    priceOfMostExpensiveItemSold?: string;
    controlFields?: {};
}

const orderType = ['PURCHASE', 'RETURN'] as const;
export type ORDER_TYPE = (typeof orderType)[number];

export interface NewOrderDto {
    merchantId: string;
    orderType: ORDER_TYPE;
    orderDate?: string;
    receiptId?: string;
    memberEmail?: string;
    memberPhone?: IPhoneNumber;
    memberId?: string;
    billingAddress?: IAddress;
    shippingAddress?: IAddress;
    company?: {
        id: string;
        vatId?: string;
        poDetails: string;
    };
    referenceId?: string;
    purchaseOrderId?: string;
    orderLines?: LineItem[];
    adjustments?: {
        type: string;
        value: string;
        metaData?: Record<string, string>;
    }[];
    totalOrderPrice?: ITotalOrderPrice;
    controlField?: {
        includeAdjustments: boolean;
        orderLineLevelCalculation?: boolean;
    };
    metaData?: Record<string, string>;
}

export interface ITotalOrderPrice {
    value: string;
    currency?: string;
    regular?: string;
    campaign?: string;
    shipping?: string;
    vat: {
        vatValue: string;
        vatPercentage: string;
    }[];
}


export interface LineItem {
    itemId: string;
    externalItemId?: string;
    categoryId?: string;
    name?: string;
    description?: string;
    quantity: number;
    unit?: UNIT;
    gtin?: string;
    imageUrl?: string;
    brand?: string;
    itemPrice: {
        value: string;
        currency?: string;
        regular?: string;
        campaign?: string;
        shipping?: string;
        vat: {
            vatValue: string;
            vatPercentage: string;
        };
    };
}