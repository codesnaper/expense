import { AccountService } from "../service/AccountService"
import { BankService } from "../service/BankService"

export interface Service{
    bankService: BankService,
    accountService: AccountService
}