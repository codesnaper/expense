import { AccountBox, NotificationAdd, SvgIconComponent } from "@mui/icons-material";
import { NavigateFunction } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import MoneyIcon from '@mui/icons-material/Money';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useRadioGroup } from "@mui/material";
class MenuLink {
    title: string;
    link: string;
    icon: SvgIconComponent;

    constructor(title: string, link: string, icon: SvgIconComponent){
        this.title = title;
        this.link = link;
        this.icon = icon;
    }

    public navigateLink(){  
        window.location.href = this.link;
    }

    public isActive(): boolean{
        const location = window.location.pathname;
        return location === this.link;
    }
}

const bankMenuLink:MenuLink =  new MenuLink('Bank', '/em/bank', AccountBalanceIcon);

const accountMenuLink: MenuLink = new MenuLink('Account','/em/account', MoneyIcon);

const limitMenuLink: MenuLink = new MenuLink('Limit','/em/limit', PermDataSettingIcon);

const categoryMenuLink: MenuLink = new MenuLink('Category', '/em/category', CategoryIcon);

const expenseMenuLink: MenuLink = new MenuLink('Expenditure','/em/expense', MoneyIcon);
export const MenuLinks: Array<MenuLink> = [
    expenseMenuLink,
    limitMenuLink,
    categoryMenuLink,
    accountMenuLink,
    bankMenuLink
];

export const NotificationMenuLink:MenuLink =  new MenuLink('Notification', '/em/notification', NotificationAdd);
export const ProfileMenuLink:MenuLink =  new MenuLink('Profile', '/em/profile', AccountBox);
export const BankMenuLink = bankMenuLink; 
export const AccountMenuLink = accountMenuLink;
export const LimitMenuLink= limitMenuLink;
export const ExpenseMenuLink= expenseMenuLink;
export const CategoryMenuLink= categoryMenuLink;