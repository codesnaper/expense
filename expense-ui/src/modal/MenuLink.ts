import { SvgIconComponent } from "@mui/icons-material";
import { NavigateFunction } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import MoneyIcon from '@mui/icons-material/Money';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
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

export const MenuLinks: Array<MenuLink> = [
   new MenuLink('Expense','/expense', MoneyIcon),
    new MenuLink('Limit', '/limit', PermDataSettingIcon),
    new MenuLink('Category', '/category', CategoryIcon),
    new MenuLink('Account','/account', MoneyIcon),
    new MenuLink('Bank', '/bank', AccountBalanceIcon)
]