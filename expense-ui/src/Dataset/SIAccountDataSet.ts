import { HeaderDisplay, HeaderType } from "../modal/Header";
import { SIAccount } from "../modal/response/Account";
import { TableDataSet } from "../modal/TableDataSet";

export default function SIAccountDataSet(accounts: Array<SIAccount>) : TableDataSet<SIAccount> {
    return new TableDataSet<SIAccount>(
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
                display: HeaderDisplay.HIDDEN,
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
            },
            rate: {
                alias: 'Rate',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.number
            },
            maturityAmount: {
                alias: 'Maturity Amount',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.number
            },
            tenure: {
                alias: 'Tenure',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.number
            },
            accountEndDate: {
                alias: 'Close Date',
                display: HeaderDisplay.NONE,
                isPrimaryKey: false,
                isVisible: true,
                type: HeaderType.date
            }
        },
        accounts
    );
}