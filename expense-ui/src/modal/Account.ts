import { BankModal } from "./bank";

export class Account {
    ID = '';
    name = '' ;
    accountNo = '';
    principal = 0;
    BANKID= '';
    loanType=false;
    isInterest=false;
    openDate = '';
}

export class LoanAccount extends Account {
    rate = 0;
    tenure = 0;
    interestAmount = 0;
    totalPayment = 0;
    totalInterest =0;
    emiPaid = 0;
}

export class SavingInterestAccount extends Account{
    compoundSaving = false;
    compoundingYear = 0;
    maturityAmount = 0;
}

export class AccountResponse{
    Items!: Array<AccountResponseItem>;
    Count!: number;
    ScannedCount!: number;
}

export class AccountResponseItem extends Account{
    rate = 0;
    tenure = 0;
    interestAmount = 0;
    totalPayment = 0;
    totalInterest =0;
    emiPaid = 0;
    compoundSaving = false;
    compoundingYear = 0;
    maturityAmount = 0;
}

