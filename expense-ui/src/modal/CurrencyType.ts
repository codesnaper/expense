export enum CurrencyType{
    INR='INR',
    EUR= 'EUR',
    USD = 'USD',
    PLN = 'PLN',
}

export function getSymbol(currencyType?: CurrencyType){
    switch(currencyType) {
        case CurrencyType.INR:
            return "₹";

        case CurrencyType.USD:
            return "$";

        case CurrencyType.EUR:
            return 'Є';

        case CurrencyType.PLN:
            return 'zł';

        default:
            return currencyType;
    }
}
