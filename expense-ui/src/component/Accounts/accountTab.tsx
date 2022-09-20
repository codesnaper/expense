import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Account, AccountType, LoanAccount, SCIAccount, SIAccount } from '../../modal/response/Account';
import AccountPannel from './accountPanel';
import AccountForm from './form/accountForm';
import { FormValidation, useFormValidation } from '../../hooks/FormValidation';
import { OperationType } from '../../modal/OperationType';
import { BankModal } from '../../modal/response/Bank';
import LoanAccountForm from './form/loanAccountForm';
import SIAccountForm from './form/sIAccountForm';
import SCIAccountForm from './form/sCIAccountForm';

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
    bank?: BankModal
}


export default function AccountTab(props: AccountTabProps) {

    const [value, setValue] = React.useState(0);

    const [accountModal, setAccountModal] = React.useState<boolean>(false);

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
                    message: 'Select the account opening date'
                },
            },
        },
        initialValues: {
            bank: props.bank
        },
        onSubmit() {
            alert(JSON.stringify(accountFormData.data));
        },
    });

    const loanAccountFormData: FormValidation<LoanAccount> = useFormValidation<LoanAccount>();

    const moneyLendingAccountFormData: FormValidation<LoanAccount> = useFormValidation<LoanAccount>(
        {
            initialValues: {
                isLendType: true
            }
        }
    );

    const siAccountFormData: FormValidation<SIAccount> = useFormValidation<SIAccount>();

    const sciAccountFormData: FormValidation<SCIAccount> = useFormValidation<SCIAccount>();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const accountOperation = (operationType: OperationType, account?: Account) => {
        setAccountModal(true);
        if (operationType === OperationType.EDIT) {
            accountFormData.setValue('name', account?.name);
            accountFormData.setValue('accountNumber', account?.accountNumber);
            accountFormData.setValue('amount', account?.amount);
            accountFormData.setValue('openDate', account?.openDate);
            accountFormData.setValue('tags', account?.tags);
            accountFormData.setValue('id', account?.id);
        }
    }

    const closeAccountModal = () => {
        setAccountModal(false);
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={'ACCOUNT'} {...a11yProps(0)} />
                    <Tab label={'LOAN ACCOUNT'} {...a11yProps(1)} />
                    <Tab label={'MONEY LENDING'} {...a11yProps(2)} />
                    <Tab label={'SAVING INTEREST ACCOUNT'} {...a11yProps(3)} />
                    <Tab label={'SAVING COMPOUND INTEREST'} {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AccountPannel
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.ACCOUNT}
                    onOperation={accountOperation}
                ></AccountPannel>
                <AccountForm form={accountFormData}
                    open={accountModal}
                    onClose={closeAccountModal}
                    operationType={OperationType.ADD}
                ></AccountForm>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AccountPannel
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.LOAN}
                    onOperation={accountOperation}
                ></AccountPannel>
                <LoanAccountForm form={loanAccountFormData}
                    open={accountModal}
                    onClose={closeAccountModal}
                    operationType={OperationType.ADD}
                ></LoanAccountForm>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AccountPannel
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.MONEY_LENDING}
                    onOperation={accountOperation}
                ></AccountPannel>
                <LoanAccountForm form={moneyLendingAccountFormData}
                    open={accountModal}
                    onClose={closeAccountModal}
                    operationType={OperationType.ADD}
                ></LoanAccountForm>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AccountPannel
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.SAVING_INTEREST}
                    onOperation={accountOperation}
                ></AccountPannel>
                <SIAccountForm form={siAccountFormData}
                    open={accountModal}
                    onClose={closeAccountModal}
                    operationType={OperationType.ADD}
                ></SIAccountForm>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <AccountPannel
                    bankId={props.bank ? props.bank.ID : ''}
                    accountType={AccountType.SAVING_COMPOUND_INTEREST}
                    onOperation={accountOperation}
                ></AccountPannel>
                <SCIAccountForm form={sciAccountFormData}
                    open={accountModal}
                    onClose={closeAccountModal}
                    operationType={OperationType.ADD}
                ></SCIAccountForm>
            </TabPanel>
        </>
    );
}