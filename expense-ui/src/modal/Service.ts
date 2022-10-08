import { AccountService } from "../service/AccountService"
import { BankService } from "../service/BankService"
import { CategoryService } from "../service/CategoryService"
import { ExpenditureService } from "../service/ExpenditureService"
import { FXRateService } from "../service/FXRateService"
import { LimitService } from "../service/LimitService"
import { NotificationService } from "../service/NotificationService"
import { ProfileService } from "../service/ProfileService"
import { TagService } from "../service/TagService"
import { UserService } from "../service/UserService"
import { Expenditure } from "./response/Expenditure"

export interface Service{
    bankService: BankService,
    accountService: AccountService,
    tagService: TagService,
    userService: UserService,
    profileService: ProfileService,
    categoryService: CategoryService,
    limitService: LimitService,
    notificationService: NotificationService,
    expenditureService: ExpenditureService,
    fxRateService: FXRateService,
}