import { useContext, useEffect, useState } from "react";
import { Container, Button, Card, CardContent, Tabs, Tab, Grid, List, ListItemText, ListItem, ListItemButton, ListItemIcon, Collapse, Divider } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddIcon from '@mui/icons-material/Add';
import ContentLoader from "../ContentLoader";
import PlaceholderCard from "../PlaceholderCard";
import { UserContext, ServiceContext, LocalizationContext, AlertContext } from '../../context';
import { AlertType } from "../../modal/ExpenseAlert";
import { TableAction, TableDataSet } from "../../modal/TableDataSet";
import { HeaderDisplay, HeaderType } from "../../modal/Header";
import ExpenseTable from "../Table";
import { OperationType } from "../../modal/OperationType";
import { Account, AccountResponse, AccountResponseItem, LoanAccount, SavingInterestAccount } from "../../modal/Account";
import { Box } from "@mui/system";
import InfoCardComponent from "../Card/InfoCard";
import { green, red } from "@mui/material/colors";
import { CalendarMonth, ExpandLess, ExpandMore } from "@mui/icons-material";
import PaymentIcon from '@mui/icons-material/Payment';
import { BankModal } from "../../modal/bank";
import ModalAccount from "./modal";

export default function AccountComponent() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.ADD);
    const [account, setAccount] = useState<AccountResponseItem>();
    const [bank, setBank] = useState<BankModal>();
    const [isAccountLinkActive, setIsAccountLinkActive] = useState<boolean>(false);
    const [accountId, setAccountId] = useState<string>('-1');
    const [loanAccountDataSet, setLoanAccountDataSet] = useState<TableDataSet<LoanAccount>>();
    const [savingInterestAccountDataset, setSavingInterestAccountDataset] = useState<TableDataSet<SavingInterestAccount>>();
    const [savingAccountDataSet, setSavingAccountDataSet] = useState<TableDataSet<Account>>();
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(true);
    const [totalAccount, setTotalAccount] = useState<number>(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState<number>(0);
    const [totalDebitAmount, setTotalDebitAmount] = useState<number>(0);
    const [upcomingPaymentExpand, setUpcomingPaymentExpand] = useState<boolean>(true);
    const [bankNavigate, setBankNavigate] = useState<boolean>(false);
    const user = useContext(UserContext);
    const service = useContext(ServiceContext);
    const localization = useContext(LocalizationContext);
    const alert = useContext(AlertContext);
    const { bankId } = useParams();

    const createLoanAccountDataSet = (loanAccounts: Array<LoanAccount>) => {
        const loanDataSet: TableDataSet<LoanAccount> = new TableDataSet<LoanAccount>(
            {
                ID: {
                    alias: 'Account Id',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: true,
                    isVisible: false,
                    type: HeaderType.string
                },
                accountNo: {
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
                BANKID: {
                    alias: 'Bank Id',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                principal: {
                    alias: 'Amount',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                isInterest: {
                    alias: 'Interest Account',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.boolean
                },
                rate: {
                    alias: 'Rate',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                tenure: {
                    alias: 'Tenure',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                openDate: {
                    alias: 'Account Opening Date',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.date
                },
                loanType: {
                    alias: 'Is Loan Account',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                interestAmount: {
                    alias: 'Interest Amount',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                totalInterest: {
                    alias: 'Total Interest Amount',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                totalPayment: {
                    alias: 'Total Amount Paid',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                emiPaid: {
                    alias: 'Paid EMI',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                }
            }
            , loanAccounts);
        const action: TableAction = {
            add: true,
            delete: true,
            edit: true,
            show: true
        }
        loanDataSet.action = action;
        setLoanAccountDataSet(loanDataSet);
    }

    const createSavingInterestDataSet = (savingInterestAccounts: Array<SavingInterestAccount>) => {
        const savingInterestDataSet: TableDataSet<SavingInterestAccount> = new TableDataSet<SavingInterestAccount>(
            {
                ID: {
                    alias: 'Account Id',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: true,
                    isVisible: false,
                    type: HeaderType.string
                },
                accountNo: {
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
                BANKID: {
                    alias: 'Bank Id',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                principal: {
                    alias: 'Amount',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                isInterest: {
                    alias: 'Interest Account',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: false,
                    type: HeaderType.string
                },
                loanType: {
                    alias: 'Interest Account',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: false,
                    type: HeaderType.string
                },
                openDate: {
                    alias: 'Open Date',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.date
                },
                compoundingYear: {
                    alias: 'Compounding Year',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                compoundSaving: {
                    alias: 'Compound Saving',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                maturityAmount: {
                    alias: 'Maturity Amount',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                }
            }, savingInterestAccounts
        )
        setSavingAccountDataSet(savingInterestAccountDataset);
    }

    const createAccountDataSet = (accounts: Array<Account>) => {
        const accountsDataSet: TableDataSet<Account> = new TableDataSet<Account>(
            {
                ID: {
                    alias: 'Account Id',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: true,
                    isVisible: false,
                    type: HeaderType.string
                },
                accountNo: {
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
                BANKID: {
                    alias: 'Bank Id',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                principal: {
                    alias: 'Amount',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    type: HeaderType.string
                },
                isInterest: {
                    alias: 'Interest Account',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: false,
                    type: HeaderType.string
                },
                loanType: {
                    alias: 'Interest Account',
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: false,
                    type: HeaderType.string
                },
                openDate: {
                    alias: 'Open Date',
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: false,
                    type: HeaderType.date
                }
            },
            accounts
        );
        setSavingAccountDataSet(accountsDataSet);
    }

    useEffect(() => {
        if (bankId) {
            service.accountService?.fetchAccounts(bankId)
                .then((response: AccountResponse) => {
                    service.bankService?.getBankById(bankId)
                        .then((bankResponse: BankModal) => {
                            setBank(bankResponse);
                            const loanAccounts: Array<LoanAccount> = new Array();
                            const savingInterestAccounts: Array<SavingInterestAccount> = new Array();
                            const savingAccounts: Array<Account> = new Array();
                            response.Items.forEach((account: AccountResponseItem) => {
                                if (account.isInterest && account.loanType) {
                                    loanAccounts.push(account as LoanAccount);
                                } else if (account.isInterest && !account.loanType) {
                                    savingInterestAccounts.push(account as SavingInterestAccount);
                                } else {
                                    savingAccounts.push(account as Account);
                                }
                            });
                            createLoanAccountDataSet(loanAccounts);
                            createSavingInterestDataSet(savingInterestAccounts);
                            createAccountDataSet(savingAccounts);
                            setTotalAccount(response.Count);
                            setLoader(false);
                        })
                        .catch(err => {
                            console.error(err);
                            setLoader(false);
                            alert.setAlert?.('There are no bank tag to account. Redirecting to bank', AlertType.INFO);
                            setBankNavigate(true);
                        });
                })
                .catch((err: any) => {
                    alert.setAlert?.('Failed to load Account data from server', AlertType.ERROR);
                    console.error(err);
                    setLoader(false);
                });
        }
    }, [service])

    const addModalCallback = (account: Account) => {
        // if (bankDataSet) {
        //     createBankDataSet([...bankDataSet.rows, bank]);
        // } else {
        //     const banks: Array<BankModal> = new Array();
        //     banks.push(bank)
        //     createBankDataSet(banks);
        // }
    }

    const editModalCallback = (id: string, editedAccount: Account) => {
        // if (bankDataSet) {
        //     const banks: Array<BankModal> = bankDataSet.rows
        //         .map((bank: BankModal) => {
        //             if (editedBank.ID === id) {
        //                 if (editedBank.currency) {
        //                     bank.currency = editedBank.currency;
        //                 }
        //                 if (editedBank.name) {
        //                     bank.name = editedBank.name;
        //                 }
        //                 if (editedBank.location) {
        //                     bank.location = editedBank.location;
        //                 }
        //                 if (editedBank.tags) {
        //                     bank.tags = editedBank.tags;
        //                 }
        //             }
        //             return bank;
        //         });
        //     createBankDataSet(banks);
    }

    const closeModal = () => {
        setOpenModal(false);
        setOperationType(OperationType.ADD);
    }

    const viewAccounts = (account: Account) => {
        setAccountId(account.ID);
        setIsAccountLinkActive(true);
    }

    const editBank = (account: Account) => {
        setOperationType(OperationType.EDIT);
        setOpenModal(true);
        // setBank(bank);
    }

    const deleteBank = (bank: Account) => {
        // service.bankService?.deleteBank(bank.ID, user.id)
        //     .then((res: ResponseDelete) => {
        //         if (bankDataSet) {
        //             let bankModals: Array<BankModal> = bankDataSet.rows;
        //             const fetchIndex: number = bankModals.map((bank: BankModal) => bank.ID).indexOf(bank.ID);
        //             if (bankModals.length === 1) {
        //                 bankModals.pop();
        //             } else {
        //                 //TODO: need to fix it 
        //                 if (fetchIndex !== -1) {
        //                     bankModals = bankModals.splice(fetchIndex, 1);
        //                 }
        //             }
        //             createBankDataSet(bankModals);
        //             alert.setAlert?.(res.message, AlertType.SUCCESS);
        //         }
        //     }).
        //     catch(err => {
        //         console.error(err);
        //         alert.setAlert?.('Failed to delete Bank details.', AlertType.ERROR);
        //     })
    }

    return (
        <>
            {bankNavigate && <>
                <Navigate to="/bank" replace={true} />
            </>}
            <Container maxWidth={'lg'} sx={{ marginTop: '40px' }}>
                {loader ? <>
                    <ContentLoader heading={`${localization.getString?.('Account.appLoading', localization.getLanguage?.(), true)}`}>
                    </ContentLoader>
                </> :
                    <>
                        {(totalAccount === 0) ?
                            <>
                                <Card raised>
                                    <PlaceholderCard heading={`${localization.formatString?.(localization.getString ? localization.getString('Account.emptyCardHeading', localization.getLanguage?.(), true) : '{0}', bank ? bank.name : '')}`}
                                        info={`${localization.getString?.('Account.emptyCardInfo', localization.getLanguage?.(), true)}`}
                                    >
                                        <AccountBalanceOutlinedIcon fontSize="inherit"></AccountBalanceOutlinedIcon>
                                        <Button size="large" onClick={() => setOpenModal(true)} >
                                            <AddIcon sx={{ mr: 1 }} />
                                            {localization.getString?.('Account.addPrimaryCtaText', localization.getLanguage?.(), true)}
                                        </Button>
                                    </PlaceholderCard>
                                </Card>
                            </> :
                            <>
                                <Grid container spacing={2} marginBottom="40px">
                                    <InfoCardComponent header="Total Account" value={`${totalAccount}`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                    <InfoCardComponent header="Total Loan Account" value={`${totalAccount}`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                    <InfoCardComponent header="Saving Amount" value={`${totalCreditAmount}`} secondaryText="Bank: XYZ" suffixCurrency="₹" color={green[700]}></InfoCardComponent>
                                    <InfoCardComponent header="Borrowed Amount" value={`${totalDebitAmount}`} secondaryText="Bank: XYZ" suffixCurrency="₹" color={red[700]}></InfoCardComponent>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item lg={8}>
                                        <Card raised>
                                            <CardContent>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs value={selectedTabIndex} onChange={(_event: React.SyntheticEvent, tabIndex: number) => setSelectedTabIndex(tabIndex)} aria-label="Account Tabs">
                                                        <Tab value={0} label="Saving Account" />
                                                        <Tab value={1} label="Loan Account" />
                                                        <Tab value={2} label="Saving Interest Account" />
                                                    </Tabs>
                                                    <ExpenseTable
                                                        dataset={selectedTabIndex === 0 ? savingAccountDataSet : selectedTabIndex === 1 ? loanAccountDataSet : savingInterestAccountDataset}
                                                        showActionCallback={(row) => viewAccounts(row)}
                                                        editActionCallback={(row) => editBank(row)}
                                                        deleteActionCallback={(row) => deleteBank(row)}
                                                        addActionCallback={() => setOpenModal(true)}
                                                    ></ExpenseTable>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <Card raised>
                                            <CardContent>
                                                <List>
                                                    <ListItemButton onClick={() => setUpcomingPaymentExpand(!upcomingPaymentExpand)}>
                                                        <ListItemIcon>
                                                            <PaymentIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary='Upcoming Payments'></ListItemText>
                                                        {upcomingPaymentExpand ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItemButton>
                                                    <Divider></Divider>
                                                    <Collapse in={upcomingPaymentExpand} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItemButton dense sx={{ pl: 4 }}>
                                                                <ListItemText primary="Account1 : 25000" />
                                                                <ListItemIcon>
                                                                    <CalendarMonth />
                                                                    <span>October, 3</span>
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                            <ListItemButton dense sx={{ pl: 4 }}>
                                                                <ListItemText primary="Account1 : 25000" />
                                                                <ListItemIcon>
                                                                    <CalendarMonth />
                                                                    <span>October, 3</span>
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                            <ListItemButton dense sx={{ pl: 4 }}>
                                                                <ListItemText primary="Account1 : 25000" />
                                                                <ListItemIcon>
                                                                    <CalendarMonth />
                                                                    <span>October, 3</span>
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                        </List>
                                                    </Collapse>
                                                </List>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>


                            </>
                        }
                    </>}

                <ModalAccount
                    openModal={openModal}
                    bank={bank}
                    account={account}
                    operationType={operationType}
                    closeModalCallback={() => closeModal()}
                ></ModalAccount>
                {isAccountLinkActive && <Navigate to={`/account?bankId=${accountId}`} replace={true} />}
            </Container>
        </>
    );
}

