import { HeaderDisplay, HeaderType } from "../modal/Header";
import { Account } from "../modal/response/Account";
import { TableDataSet } from "../modal/TableDataSet";

export default function accountTableDataSet(accounts: Array<Account>) : TableDataSet<Account> {
    return new TableDataSet<Account>(
        {
            id: {
                alias: 'Account Id',
                display: HeaderDisplay.HIDDEN,
                isPrimaryKey: true,
                isVisible: false,
                type: HeaderType.string
            },
            accountNumber: {
                alias: 'Account Number',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.string
            },
            name: {
                alias: 'Account Name',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.string
            },
            bank: {
                alias: 'Bank Id',
                display: HeaderDisplay.HIDDEN,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.string
            },
            amount: {
                alias: 'Amount',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.string
            },
            openDate: {
                alias: 'Open Date',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.date
            },
            createdDate: {
                alias: 'Created Date',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: false,
                type: HeaderType.date
            },
            endDate: {
                alias: 'End Date',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.date
            },
            tags:{
                alias: 'Tags',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.tag
            }
        },
        accounts
    );
}