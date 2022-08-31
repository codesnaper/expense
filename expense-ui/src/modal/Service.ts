import { AccountService } from "../service/AccountService"
import { BankService } from "../service/BankService"
import { TagService } from "../service/TagService"

export interface Service{
    bankService: BankService,
    accountService: AccountService,
    tagService: TagService
}