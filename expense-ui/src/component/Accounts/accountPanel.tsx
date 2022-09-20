import { AccountBalanceOutlined, AddCircleOutlined } from "@mui/icons-material";
import { Button, Card, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import accountTableDataSet from "../../Dataset/AccountDataSet";
import { AlertType } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { Account, AccountResponse, AccountType } from "../../modal/response/Account";
import { ApiError } from "../../modal/response/Error";
import { TableDataSet } from "../../modal/TableDataSet";
import Pagination from "../Pagination";
import PlaceholderCard from "../PlaceholderCard";
import ExpenseTable from "../Table";

interface AccountPannelProps {
    accountType: AccountType,
    bankId?: string,
    onOperation?:(operationType: OperationType, account?: Account) => void
}

export default function AccountPannel(props: AccountPannelProps) {

    const [loader, setLoader] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Array<Account>>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [tableDataSet, setTableDataSet] = useState<TableDataSet<Account>>(accountTableDataSet(accounts));
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);

    const fetchAccount = () => {
        setLoader(true);
        service.accountService?.fetchAccounts<Account>(props.bankId ? props.bankId : '', props.accountType, page, pageSize)
            .then((res: AccountResponse<Account>) => {
                setTotalElement(res.Count);
                setPage(res.pageNo);
                setPageSize(res.pageSize === 0? 10: res.pageSize);
                setAccounts(res.Items);
                setTableDataSet(accountTableDataSet(accounts));
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
            })
    };

    useEffect(() => {
        if (props.bankId) {
            fetchAccount();
        }
    }, [service, props.bankId]);

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setPageSize(pageSize);
        fetchAccount();
    }

    return (
        <>
            {!loader &&
                <>
                    {(tableDataSet?.rows.length === 0) ?
                        <>
                            <Card raised>
                                <PlaceholderCard heading={`Account Details`}
                                    info={`Add Account for your bank to manage expense.`}
                                >
                                    <AccountBalanceOutlined fontSize="inherit"></AccountBalanceOutlined>
                                    <Button size="large" onClick={()=> props.onOperation?.(OperationType.ADD)} >
                                        <AddCircleOutlined sx={{ mr: 1 }} />
                                        Add Account
                                    </Button>
                                </PlaceholderCard>
                            </Card>
                        </> :
                        <>
                            <ExpenseTable
                                dataset={tableDataSet}
                            // showActionCallback={(row) => viewAccounts(row)}
                            // editActionCallback={(row) => editBank(row)}
                            // deleteActionCallback={(row) => deleteBank(row)} addActionCallback={() => setOpenModal(true)}
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