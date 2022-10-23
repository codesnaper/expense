import { AccountBalanceOutlined, AddCircleOutlined } from "@mui/icons-material";
import { Button, Card, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import accountTableDataSet from "../../Dataset/AccountDataSet";
import loanAccountDataSet from "../../Dataset/LoanAccountDataSet";
import { AlertType } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { Account, AccountResponse, AccountType, LoanAccount } from "../../modal/response/Account";
import { ApiError } from "../../modal/response/Error";
import { Tag } from "../../modal/response/Tag";
import { TableDataSet } from "../../modal/TableDataSet";
import Pagination from "../Pagination";
import PlaceholderCard from "../PlaceholderCard";
import ExpenseTable from "../Table";

interface AccountPannelProps {
    title?: string;
    intro?: string;
    accountType: AccountType,
    bankId?: string,
    onOperation?: (operationType: OperationType, account?: Account | LoanAccount) => void
    tableDataSet?: TableDataSet<Account>;
}

export default function AccountPannel(props: AccountPannelProps) {

    const [loader, setLoader] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [tableDataSet, setTableDataSet] = useState<TableDataSet<Account>>(accountTableDataSet([]));
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);

    const fetchAccount = (pageNo: number = page, size : number = pageSize) => {
        setLoader(true);
        switch (props.accountType) {
            case AccountType.ACCOUNT:
            case AccountType.ALL:
                service.accountService?.fetchAccounts<Account>(props.bankId ? props.bankId : '', props.accountType, pageNo, size)
                    .then((res: AccountResponse<Account>) => {
                        setTotalElement(res.Count);
                        setPage(res.pageNo);
                        setPageSize(res.pageSize === 0 ? 10 : res.pageSize);
                        const newtableDataSet = accountTableDataSet(res.Items.map((account: Account) => {
                            const tagNames: Array<string> = [];
                            account.tags.forEach((tag: Tag) => {
                                tagNames.push(tag.name);
                            })
                            account.tagName = tagNames.join(',');
                            return account;
                        }));
                        if (props.accountType === AccountType.ACCOUNT) {
                            newtableDataSet.action = {
                                add: true,
                                delete: true,
                                edit: true,
                                show: false
                            }
                        }
                        setTableDataSet(newtableDataSet);
                    })
                    .catch((err: ApiError) => {
                        expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                    })
                    .finally(() => {
                        setLoader(false);
                    })
                break;

            case AccountType.LOAN:
            case AccountType.MONEY_LENDING:
                service.accountService?.fetchAccounts<LoanAccount>(props.bankId ? props.bankId : '', props.accountType, page, pageSize)
                    .then((res: AccountResponse<LoanAccount>) => {
                        setTotalElement(res.Count);
                        setPage(res.pageNo);
                        setPageSize(res.pageSize === 0 ? 10 : res.pageSize);
                        const newtableDataSet = loanAccountDataSet(res.Items.map((account: LoanAccount) => {
                            const tagNames: Array<string> = [];
                            account.tags.forEach((tag: Tag) => {
                                tagNames.push(tag.name);
                            })
                            account.tagName = tagNames.join(',');
                            return account;
                        }));
                        newtableDataSet.action = {
                            add: true,
                            delete: true,
                            edit: true,
                            show: false
                        }
                        setTableDataSet(newtableDataSet);
                    })
                    .catch((err: ApiError) => {
                        expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                    })
                    .finally(() => {
                        setLoader(false);
                    })
                break;

            case AccountType.ALL:
                service.accountService?.fetchAccounts<Account>(props.bankId ? props.bankId : '', props.accountType, page, pageSize)
                    .then((res: AccountResponse<Account>) => {
                        setTotalElement(res.Count);
                        setPage(res.pageNo);
                        setPageSize(res.pageSize === 0 ? 10 : res.pageSize);
                        const newtableDataSet = accountTableDataSet(res.Items.map((account: Account) => {
                            const tagNames: Array<string> = [];
                            account.tags.forEach((tag: Tag) => {
                                tagNames.push(tag.name);
                            })
                            account.tagName = tagNames.join(',');
                            return account;
                        }));
                        setTableDataSet(newtableDataSet);
                    })
                    .catch((err: ApiError) => {
                        expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                    })
                    .finally(() => {
                        setLoader(false);
                    })
                break;

        }

    };

    useEffect(() => {
        if (props.bankId) {
            fetchAccount();
        }
    }, [service, props.bankId]);

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setPageSize(pageSize);
        fetchAccount(pageNo, pageSize);
    }

    const sendOperation = (row: any, operationType: OperationType) => {
        if (props.accountType === AccountType.ACCOUNT) {
            props.onOperation?.(operationType, row);
        } else if (props.accountType === AccountType.LOAN) {
            props.onOperation?.(operationType, row);
        }
    }

    return (
        <>
            {!loader &&
                <>
                    {(tableDataSet?.rows.length === 0) ?
                        <>
                            <Card raised>
                                <PlaceholderCard heading={`${props.title}`}
                                    info={`${props.intro}`}
                                >
                                    <AccountBalanceOutlined fontSize="inherit"></AccountBalanceOutlined>
                                    <Button size="large" onClick={() => props.onOperation?.(OperationType.ADD)} >
                                        <AddCircleOutlined sx={{ mr: 1 }} />
                                        Add Account
                                    </Button>
                                </PlaceholderCard>
                            </Card>
                        </> :
                        <>
                            <ExpenseTable
                                dataset={tableDataSet}
                                addActionCallback={() => sendOperation(undefined, OperationType.ADD)}
                                editActionCallback={(row) => sendOperation(row, OperationType.EDIT)}
                                deleteActionCallback={(row) => sendOperation(row, OperationType.DELETE)}
                            ></ExpenseTable>
                            <Pagination page={page} pageSize={pageSize} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
                        </>
                    }
                </>
            }

            {loader && <>
                <Card raised>
                    <PlaceholderCard heading={`Loading Details`}
                        info={``}
                    >
                        <CircularProgress />
                        <></>
                    </PlaceholderCard>
                </Card>
            </>}
        </>
    );
}