export type VALID_COUNTRY_CODES = (typeof countryAlpha2IsoCodes)[number];

export interface ICreateMerchant {
    merchantId: string;
    merchantName: string;
    email: string;
    countryCode: CountryAlphabeticCode;
    merchantLogoUrl?: ImageURL;
    groupId?: GroupId;
    merchantType?: MerchantType;
    merchantLanguage?: LanguageAlphabeticCode;
    modelName?: ModelName;
    phoneNumber?: PhoneNumber;
    swishNumber?: SwishNumber;
    companyId?: CorporateIdGeneric;
    address?: ISbAddress;
    deviceId?: DeviceId;
    mccCode?: MccCode;
    acquirer?: Acquirer;
    pfAccountId?: AcquirerMID;
    partnerId?: PartnerId;
    dynamicMerchantId?: MerchantID;
    riskClass?: MerchantRiskClass;
    priceOfMostExpensiveItemSold?: SurfboardNumber;
    ctMID?: SurfboardString;
    controlFields?: {
        storeLevelPaymentSegregation: SurfboardBoolean;
    };
}


export interface NewOrderDto {
    merchantId: string;
    
    groupId?: string;
    orderType: ORDER_TYPE;
    orderDate?: string;
    receiptId?: string;
    memberEmail?: string;
    memberPhone?: IPhoneNumber;
    memberId?: string;
    billingAddress?: TCreateAddresses;
    companyPurchase?: boolean;
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
    controlField?: TControlField;
    metaData?: Record<string, string>;
}