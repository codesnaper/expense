import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Account, AccountType, LoanAccount, SCIAccount, SIAccount, LoanAccountType } from '../../modal/response/Account';
import AccountPannel from './accountPanel';
import AccountForm from './form/accountForm';
import { FormValidation, useFormValidation } from '../../hooks/FormValidation';
import { OperationType } from '../../modal/OperationType';
import { BankModal } from '../../modal/response/Bank';
import LoanAccountForm from './form/loanAccountForm';
import SIAccountForm from './form/sIAccountForm';
import SCIAccountForm from './form/sCIAccountForm';
import { AlertContext, ServiceContext } from '../../context';
import { AlertType } from '../../modal/ExpenseAlert';
import { ApiError } from '../../modal/response/Error';
import ContentLoader from '../ContentLoader';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface AccountTabProps {
    bank?: BankModal;
    onChangeBank?: (bank: BankModal) => void;
    accountIntFlag?: (counter: number) => void;
    onAccountChange?: () => void
}


export default function AccountTab(props: AccountTabProps) {

    const [value, setValue] = React.useState(0);
    const [accountModal, setAccountModal] = React.useState<boolean>(false);
    const [loanAccountModal, setLoanAccountModal] = React.useState<boolean>(false);
    const [loader, setLoader] = React.useState<boolean>(false);
    const [deleteLoader, setDeleteLoader] = React.useState<boolean>(false);
    const [operationType, setOperationType] = React.useState<OperationType>(OperationType.ADD);
    const [account, setAccount] = React.useState<Account>();
    const [loanAccount, setLoanAccount] = React.useState<LoanAccount>();
    const service = React.useContext(ServiceContext);
    const expenseAlert = React.useContext(AlertContext);
    const accountFormData = useFormValidation<Account>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: `Account Name is required`,
                },

            },
            accountNumber: {
                required: {
                    value: true,
                    message: 'Account Number is required'
                },
            },
            openDate: {
                required: {
                    value: true,
                    message: 'Open Date is required.'
                }
            },
            tags: {
                required: {
                    value: true,
                    message: 'Tag is required'
                },
            }
        },
        initialValues: {
            bank: props.bank
        },
        onSubmit: () => {
            setLoader(true);
            if (props.bank && props.bank.ID) {
                if (operationType === OperationType.ADD) {
                    service.accountService?.saveAccount<Account>(parseInt(props.bank?.ID), AccountType.ACCOUNT, accountFormData.data)
                        .then((res: Account) => {
                            //add in table.
                            expenseAlert.setAlert?.(`${res.name} has been added successfully !!!`, AlertType.SUCCESS);
                            accountFormData.refreshError();
                            setAccountModal(false);
                            props.onAccountChange?.();
                        })
                        .catch((err: ApiError) => {
                            expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                        })
                        .finally(() => {
                            setLoader(false);
                        })
                } else {
                    service.accountService?.updateAccount<Account>(parseInt(props.bank?.ID), AccountType.ACCOUNT, accountFormData.data)
                        .then((res: Account) => {
                            //add in table.
                            expenseAlert.setAlert?.(`${res.name} has been updated successfully !!!`, AlertType.SUCCESS);
                            accountFormData.refreshError();
                            setAccountModal(false);
                            props.onAccountChange?.();
                        })
                        .catch((err: ApiError) => {
                            expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                        })
                        .finally(() => {
                            setLoader(false);
                        })
                }

            }
        },
    });

    const loanAccountFormData: FormValidation<LoanAccount> = useFormValidation<LoanAccount>(
        {
            validations: {
                name: {
                    required: {
                        value: true,
                        message: `Account Name is required`,
                    },

                },
                accountNumber: {
                    required: {
                        value: true,
                        message: 'Account Number is required'
                    },
                },
                openDate: {
                    required: {
                        value: true,
                        message: 'Open Date is required.'
                    }
                },
                tags: {
                    required: {
                        value: true,
                        message: 'Tag is required'
                    },
                },
                endDate: {
                    required: {
                        value: true,
                        message: 'Account Closing date is required.'
                    }
                },
                rate: {
                    required: {
                        value: true,
                        message: 'Interest Rate is required.'
                    }
                }
            },
            initialValues: {
                bank: props.bank
            },
            onSubmit: () => {
                setLoader(true);
                if (props.bank && props.bank.ID) {
                    if (operationType === OperationType.ADD) {
                        service.accountService?.saveAccount<LoanAccount>(parseInt(props.bank?.ID), AccountType.LOAN, loanAccountFormData.data)
                            .then((res: Account) => {
                                //add in table.
                                expenseAlert.setAlert?.(`${res.name} has been added successfully !!!`, AlertType.SUCCESS);
                                loanAccountFormData.refreshError();
                                setLoanAccountModal(false);
                                props.onAccountChange?.();
                            })
                            .catch((err: ApiError) => {
                                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                            })
                            .finally(() => {
                                setLoader(false);
                            })
                    } else {
                        service.accountService?.updateAccount<LoanAccount>(parseInt(props.bank?.ID), AccountType.LOAN, loanAccountFormData.data)
                            .then((res: Account) => {
                                //add in table.
                                expenseAlert.setAlert?.(`${res.name} has been updated successfully !!!`, AlertType.SUCCESS);
                                loanAccountFormData.refreshError();
                                setLoanAccountModal(false);
                                props.onAccountChange?.();
                            })
                            .catch((err: ApiError) => {
                                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                            })
                            .finally(() => {
                                setLoader(false);
                            })
                    }
    
                }
            }
        }
    );

    const moneyLendingAccountFormData: FormValidation<LoanAccount> = useFormValidation<LoanAccount>(
        {
            initialValues: {
                isLendType: true
            },
            onSubmit() {
                setLoader(true);
                if (props.bank && props.bank.ID) {
                    if (operationType === OperationType.ADD) {
                        service.accountService?.saveAccount<LoanAccount>(parseInt(props.bank?.ID), AccountType.MONEY_LENDING, loanAccountFormData.data)
                            .then((res: Account) => {
                                //add in table.
                                expenseAlert.setAlert?.(`${res.name} has been added successfully !!!`, AlertType.SUCCESS);
                                loanAccountFormData.refreshError();
                                setLoanAccountModal(false);
                                props.onAccountChange?.();
                            })
                            .catch((err: ApiError) => {
                                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                            })
                            .finally(() => {
                                setLoader(false);
                            })
                    } else {
                        service.accountService?.updateAccount<LoanAccount>(parseInt(props.bank?.ID), AccountType.MONEY_LENDING, loanAccountFormData.data)
                            .then((res: Account) => {
                                //add in table.
                                expenseAlert.setAlert?.(`${res.name} has been updated successfully !!!`, AlertType.SUCCESS);
                                loanAccountFormData.refreshError();
                                setLoanAccountModal(false);
                                props.onAccountChange?.();
                            })
                            .catch((err: ApiError) => {
                                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                            })
                            .finally(() => {
                                setLoader(false);
                            })
                    }
    
                }
            },
        }
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const accountOperation = (operationType: OperationType, account: Account | LoanAccount | undefined, accountType: AccountType) => {
        if (operationType === OperationType.EDIT) {
            if (accountType === AccountType.ACCOUNT) {
                setAccount(account);
                setAccountModal(true);
            } else if (accountType === AccountType.LOAN) {
                setLoanAccount(account as LoanAccount);
                setLoanAccountModal(true);
            }
            setOperationType(OperationType.EDIT);
        }
        else if (operationType === OperationType.DELETE) {
            setDeleteLoader(true);
            service.accountService?.deleteAccount(props.bank ? props.bank.ID : '-1', account ? account.id : -1)
                .then(() => {
                    expenseAlert.setAlert?.('Account has been deleted successfully !!!', AlertType.SUCCESS);
                    props.onAccountChange?.();
                })
                .catch((err: ApiError) => {
                    expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                })
                .finally(() => {
                    setDeleteLoader(false);
                })
        } else {
            setOperationType(OperationType.ADD);
            if (accountType === AccountType.ACCOUNT) {
                setAccountModal(true);
            } else if (accountType === AccountType.LOAN) {
                setLoanAccountModal(true);
            }
        }
    }

    const closeAccountModal = () => {
        setAccountModal(false);
    }

    const closeLoanAccountModal = () => {
        setLoanAccountModal(false);
    }

    return (
        <>
            {deleteLoader && <>
                <ContentLoader heading={`Deleting Account`}>
                </ContentLoader></>}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={'ACCOUNT'} {...a11yProps(0)} />
                    <Tab label={'LOAN ACCOUNT'} {...a11yProps(1)} />
                    <Tab label={'MONEY LENDING'} {...a11yProps(2)} />
                    <Tab label={'ALL'} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AccountPannel
                    title='Saving Account Detail'
                    intro='Add account to manage your expense'
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.ACCOUNT}
                    onOperation={(operationType, account) => accountOperation(operationType, account, AccountType.ACCOUNT)}
                ></AccountPannel>
                <AccountForm form={accountFormData}
                    loader={loader}
                    open={accountModal}
                    onClose={closeAccountModal}
                    operationType={operationType}
                    defaultValue={account}
                    title={'Account'}
                ></AccountForm>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AccountPannel
                    title='Loan Account '
                    intro='Add your loan account. Based on intrest it will calculate total payment to be paid.'
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.LOAN}
                    onOperation={(operationType, account) => accountOperation(operationType, account, AccountType.LOAN)}
                ></AccountPannel>
                <LoanAccountForm form={loanAccountFormData}
                    loader={loader}
                    open={loanAccountModal}
                    onClose={closeLoanAccountModal}
                    operationType={operationType}
                    defaultValue={loanAccount}
                    title={'Loan Account'}
                ></LoanAccountForm>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AccountPannel
                    title='Money Lending Account '
                    intro='Add your account which you lend your money to friend or relative with some interest.'
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.MONEY_LENDING}
                    onOperation={(operationType, account) => accountOperation(operationType, account, AccountType.LOAN)}
                ></AccountPannel>
                <LoanAccountForm form={moneyLendingAccountFormData}
                    loader={loader}
                    open={loanAccountModal}
                    onClose={closeLoanAccountModal}
                    operationType={operationType}
                    defaultValue={loanAccount}
                    title={'Money Lending Account'}
                ></LoanAccountForm>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AccountPannel
                    title='Money Lending Account '
                    intro='Add your account which you lend your money to friend or relative with some interest.'
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.ALL}
                    onOperation={(operationType, account) => accountOperation(operationType, account, AccountType.LOAN)}
                ></AccountPannel>
                <LoanAccountForm form={moneyLendingAccountFormData}
                    loader={loader}
                    open={loanAccountModal}
                    onClose={closeLoanAccountModal}
                    operationType={operationType}
                    defaultValue={loanAccount}
                    title={'Money Lending Account'}
                ></LoanAccountForm>
            </TabPanel>
        </>
    );
}