import { AccountService } from "../service/AccountService"
import { BankService } from "../service/BankService"
import { CategoryService } from "../service/CategoryService"
import { LimitService } from "../service/LimitService"
import { ProfileService } from "../service/ProfileService"
import { TagService } from "../service/TagService"
import { UserService } from "../service/UserService"

export interface Service{
    bankService: BankService,
    accountService: AccountService,
    tagService: TagService,
    userService: UserService,
    profileService: ProfileService,
    categoryService: CategoryService,
    limitService: LimitService,
}