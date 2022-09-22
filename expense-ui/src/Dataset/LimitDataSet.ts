import { HeaderDisplay, HeaderType } from "../modal/Header";
import { Limit } from "../modal/response/Limit";
import { TableDataSet } from "../modal/TableDataSet";

export default function limitDataSet(limits: Limit[]){
    return new TableDataSet<Limit>(
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
            }
        }, limits
    )
}