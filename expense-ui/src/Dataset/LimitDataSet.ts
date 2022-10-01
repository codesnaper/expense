import { green, red, yellow } from "@mui/material/colors";
import { HeaderDisplay, HeaderType } from "../modal/Header";
import { Account } from "../modal/response/Account";
import { EnhancedLimit, Limit } from "../modal/response/Limit";
import { TableDataSet } from "../modal/TableDataSet";

export default function limitDataSet(limits: EnhancedLimit[]){
    return new TableDataSet<EnhancedLimit>(
        {
            accountId: {
                display: HeaderDisplay.HIDDEN,
            },
            categoryId: {
                display: HeaderDisplay.HIDDEN
            },
            id: {
                display: HeaderDisplay.HIDDEN,
                isPrimaryKey: true
            },
            name: {
                display: HeaderDisplay.NONE,
                alias: 'Name',
                isVisible: true,
                type: HeaderType.string
            },
            description: {
                display: HeaderDisplay.NONE,
                alias: 'Description',
                isVisible: true,
                type: HeaderType.string
            },
            minAmount: {
                display: HeaderDisplay.NONE,
                alias: 'Min Amount',
                isVisible: true,
                type: HeaderType.number
            },
            maxAmount: {
                display: HeaderDisplay.NONE,
                alias: 'Max AMount',
                isVisible: true,
                type: HeaderType.number
            },
            usedAmount: {
                display: HeaderDisplay.NONE,
                alias: 'Used Amount',
                isVisible: true,
                type: HeaderType.number
            },
            thresoldWarningAmount: {
                display: HeaderDisplay.NONE,
                alias: 'Thresold Amount',
                isVisible: true,
                type: HeaderType.number
            },
            priority: {
                display: HeaderDisplay.NONE,
                alias: 'Priority',
                isVisible: true,
                type: HeaderType.string
            },
            resetRecursively: {
                display: HeaderDisplay.NONE,
                alias: 'Reset',
                isVisible: true,
                type: HeaderType.string
            },
            category: {
                display: HeaderDisplay.NONE,
                alias: 'Category',
                isVisible: true,
                type: HeaderType.custom,
                customDisplay(value) {
                    const limit = value as EnhancedLimit;
                    return limit.category.name;
                },
            },
            account: {
                display: HeaderDisplay.NONE,
                alias: 'Account',
                isVisible: true,
                type: HeaderType.custom,
                customDisplay(value) {
                    const limit = value as EnhancedLimit;
                    return `${limit.account.name}(${limit.account.accountNumber})`
                },
            }
        }, limits,
        (row: object): string => {
            const limit: Limit = row as Limit;
            if(limit.usedAmount < limit.thresoldWarningAmount){
                return green['100'];
            } else if (limit.usedAmount >= limit.thresoldWarningAmount && limit.usedAmount < limit.maxAmount){
                return yellow['100'];
            } else {
                return red['100'];
            }
        }
    )
}