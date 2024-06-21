export const units = [
    // length
    'm',
    'mm',
    'cm',
    'km',
    'in',
    'ft',
    'mi',
    // weight/mass
    'kg',
    'g',
    'mg',
    'lb',
    'oz',
    // volume
    'l',
    'ml',
    'cu. m',
    'gal',
    'pt',
    'fl oz',
    // power
    'W',
    'kW',
    'kWh',
    // area
    'sq m',
    'sq km',
    'sq ft',
    // time
    'h',
    'min',
    's',
    'days',
    'wk',
    'mn',
    'yr',
    // number of
    'nos',
    'st',
] as const;
export type UNIT = (typeof units)[number];
