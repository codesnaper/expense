import { useEffect, useState } from "react";
import { BankService } from "../service/BankService";
import * as React from "react";
import { ServiceContext } from "../context";
import { AccountService } from "../service/AccountService";
import { TagService } from "../service/TagService";
import { UserService } from "../service/UserService";
import { ProfileService } from "../service/ProfileService";
import { CategoryService } from "../service/CategoryService";
import { LimitService } from "../service/LimitService";
import { NotificationService } from "../service/NotificationService";
import { Service } from "../modal/Service";

interface ServiceContextProps  { 
    children: React.ReactNode
 }


const ServiceContextProvider = (props: ServiceContextProps) => {
    const [service] = useState<Service>({
        bankService: new BankService(),
        accountService: new AccountService(),
        tagService: new TagService(),
        userService: new UserService(),
        profileService: new ProfileService(),
        categoryService: new CategoryService(),
        limitService: new LimitService(),
        notificationService: new NotificationService()
    });

    return (
        <ServiceContext.Provider value={service}>
            {props.children}
        </ServiceContext.Provider>
    );
};


export { ServiceContextProvider };