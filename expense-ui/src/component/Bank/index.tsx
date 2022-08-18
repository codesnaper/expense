import { useContext, useEffect, useState } from "react";
import { Container, Button, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import { Navigate } from "react-router-dom";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddIcon from '@mui/icons-material/Add';
import ContentLoader from "./../ContentLoader";
import PlaceholderCard from "./../PlaceholderCard";
import { UserContext, ServiceContext, LocalizationContext, AlertContext } from './../../context';
import { BankModal, BankModalsResponse, ResponseDelete } from "../../modal/bank";
import { AlertType } from "../../modal/ExpenseAlert";
import ModalBank from "./modal";
import { TableAction, TableDataSet } from "../../modal/TableDataSet";
import { HeaderDisplay, HeaderType } from "../../modal/Header";
import ExpenseTable from "../Table";
import { OperationType } from "../../modal/OperationType";
import InfoCardComponent from "../Card/InfoCard";
import { green, red } from "@mui/material/colors";
export default function BankComponent() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.ADD);
    const [bank, setBank] = useState<BankModal>();
    const [isAccountLinkActive, setIsAccountLinkActive] = useState<boolean>(false);
    const [accountId, setAccountId] = useState<string>('-1');
    const [bankDataSet, setBankDataSet] = useState<TableDataSet<BankModal>>();
    const [loader, setLoader] = useState<boolean>(true);
    const [totalBank, setTotalBank] = useState<number>(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState<number>(0);
    const [totalDebitAmount, setTotalDebitAmount] = useState<number>(0);
    const user = useContext(UserContext);
    const service = useContext(ServiceContext);
    const localization = useContext(LocalizationContext);
    const alert = useContext(AlertContext);

    const createBankDataSet = (banks: Array<BankModal>) => {
        const dataSet: TableDataSet<BankModal> = new TableDataSet<BankModal>(
            {
                name: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Bank Name',
                    type: HeaderType.string
                },
                location: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Loacations',
                    type: HeaderType.string
                },
                ID: {
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: true,
                    isVisible: false,
                    alias: 'ID',
                    type: HeaderType.string
                },
                tags: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: true,
                    isVisible: true,
                    alias: 'Tags',
                    type: HeaderType.tag
                },
                USERID: {
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: false,
                    isVisible: false,
                    alias: 'USERID',
                    type: HeaderType.string
                },
                currency: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Bank Currency',
                    type: HeaderType.string
                },
                accounts: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Accounts',
                    type: HeaderType.string
                },
                creditAmount: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Amounts',
                    type: HeaderType.string
                },
                debitAmount: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Debit Amounts',
                    type: HeaderType.string
                }
            }
            , banks);
        const action: TableAction = {
            add: true,
            delete: true,
            edit: true,
            show: true
        }
        dataSet.action = action;
        setBankDataSet(dataSet);
    }

    useEffect(() => {
        service.bankService?.fetchBanks(user.id)
            .then((response: BankModalsResponse) => {
                let banks: BankModal[] = [];
                let sumCreditAmount: number = 0;
                let sumDebitAmount: number = 0;
                response.Items.forEach((bank: BankModal) => {
                    banks.push(bank);
                    sumCreditAmount += Number(bank.creditAmount);
                    sumDebitAmount += Number(bank.debitAmount);
                });
                setTotalCreditAmount(sumCreditAmount);
                setTotalDebitAmount(sumDebitAmount);
                setTotalBank(response.Count);
                createBankDataSet(banks);
                setLoader(false);
            }).catch(err => {
                alert.setAlert?.('Failed to load bank data from server', AlertType.ERROR);
                console.error(err);
                setLoader(false);
            });
    }, [service])

    const addModalCallback = (bank: BankModal) => {
        if (bankDataSet) {
            createBankDataSet([...bankDataSet.rows, bank]);
        } else {
            const banks: Array<BankModal> = new Array();
            banks.push(bank)
            createBankDataSet(banks);
        }
    }

    const editModalCallback = (id: string, editedBank: BankModal) => {
        if (bankDataSet) {
            const banks: Array<BankModal> = bankDataSet.rows
                .map((bank: BankModal) => {
                    if (editedBank.ID === id) {
                        if (editedBank.currency) {
                            bank.currency = editedBank.currency;
                        }
                        if (editedBank.name) {
                            bank.name = editedBank.name;
                        }
                        if (editedBank.location) {
                            bank.location = editedBank.location;
                        }
                        if (editedBank.tags) {
                            bank.tags = editedBank.tags;
                        }
                    }
                    return bank;
                });
            createBankDataSet(banks);
        }

    }

    const closeModal = () => {
        setOpenModal(false);
        setOperationType(OperationType.ADD);
    }

    const viewAccounts = (bank: BankModal) => {
        setAccountId(bank.ID);
        setIsAccountLinkActive(true);
    }

    const editBank = (bank: BankModal) => {
        setOperationType(OperationType.EDIT);
        setOpenModal(true);
        setBank(bank);
    }

    const deleteBank = (bank: BankModal) => {
        service.bankService?.deleteBank(bank.ID, user.id)
            .then((res: ResponseDelete) => {
                if (bankDataSet) {
                    let bankModals: Array<BankModal> = bankDataSet.rows;
                    const fetchIndex: number = bankModals.map((bank: BankModal) => bank.ID).indexOf(bank.ID);
                    if (bankModals.length === 1) {
                        bankModals.pop();
                    } else {
                        //TODO: need to fix it 
                        if (fetchIndex !== -1) {
                            bankModals = bankModals.splice(fetchIndex, 1);
                        }
                    }
                    createBankDataSet(bankModals);
                    alert.setAlert?.(res.message, AlertType.SUCCESS);
                }
            }).
            catch(err => {
                console.error(err);
                alert.setAlert?.('Failed to delete Bank details.', AlertType.ERROR);
            })



    }

    return (
        <>
            <Container maxWidth={'lg'} sx={{ marginTop: '40px' }}>
                {loader ? <>
                    <ContentLoader heading={`${localization.getString?.('Bank.appLoading', localization.getLanguage?.(), true)}`}>
                    </ContentLoader>
                </> :
                    <>
                        {(bankDataSet?.rows.length === 0) ?
                            <>
                                <Card raised>
                                    <PlaceholderCard heading={`${localization.getString?.('Bank.emptyCardHeading', localization.getLanguage?.(), true)}`}
                                        info={`${localization.getString?.('Bank.emptyCardInfo', localization.getLanguage?.(), true)}`}
                                    >
                                        <AccountBalanceOutlinedIcon></AccountBalanceOutlinedIcon>
                                        <Button size="large" onClick={() => setOpenModal(true)} >
                                            <AddIcon sx={{ mr: 1 }} />
                                            {localization.getString?.('Bank.addPrimaryCtaText', localization.getLanguage?.(), true)}
                                        </Button>
                                    </PlaceholderCard>
                                </Card>
                            </> :
                            <>
                                <Grid container spacing={2}>
                                    <InfoCardComponent header="Total Bank" value={`${totalBank}`} ></InfoCardComponent>
                                    <InfoCardComponent header="Credit Amount" value={`${totalCreditAmount}`} suffixCurrency="₹" color={green[200]}></InfoCardComponent>
                                    <InfoCardComponent header="Debit Amount" value={`${totalDebitAmount}`} suffixCurrency="₹" color={red[200]}></InfoCardComponent>
                                </Grid>
                                <Card raised sx={{ marginTop: '40px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{marginBottom: '12px'}}>
                                            Banks Details
                                        </Typography>
                                        <Divider></Divider>
                                        <ExpenseTable
                                            dataset={bankDataSet}
                                            showActionCallback={(row) => viewAccounts(row)}
                                            editActionCallback={(row) => editBank(row)}
                                            deleteActionCallback={(row) => deleteBank(row)}
                                            addActionCallback={() => setOpenModal(true)}
                                        ></ExpenseTable>
                                    </CardContent>
                                </Card>

                            </>
                        }
                    </>}

                <ModalBank
                    openModal={openModal}
                    operationType={operationType}
                    bank={operationType === OperationType.ADD ? undefined : bank}
                    closeModalCallback={() => closeModal()}
                    addCallback={(data: BankModal) => addModalCallback(data)}
                    editCallback={(id: string, data: BankModal) => editModalCallback(id, data)}
                ></ModalBank>
                {isAccountLinkActive && <Navigate to={`/account/${accountId}`} replace={true} />}
            </Container>
        </>
    );
}