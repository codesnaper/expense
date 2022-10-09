import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Container, Button, Grid, Card, CardContent, Typography, Divider, Box, Stack, SvgIcon } from "@mui/material";
import { Navigate } from "react-router-dom";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddIcon from '@mui/icons-material/Add';
import ContentLoader from "./../ContentLoader";
import PlaceholderCard from "./../PlaceholderCard";
import { UserContext, ServiceContext, LocalizationContext, AlertContext } from './../../context';
import { BankModal, BankModalsResponse, ResponseDelete } from "../../modal/response/Bank";
import { AlertType } from "../../modal/ExpenseAlert";
import ModalBank from "./modal";
import { TableAction, TableDataSet } from "../../modal/TableDataSet";
import { HeaderDisplay, HeaderType } from "../../modal/Header";
import ExpenseTable from "../Table";
import { OperationType } from "../../modal/OperationType";
import InfoCardComponent from "../Card/InfoCard";
import { green, red } from "@mui/material/colors";
import { Tag } from "../../modal/response/Tag";
import { CurrencyType, getSymbol } from "../../modal/CurrencyType";
import { ApiError } from "../../modal/response/Error";
import { FxRate } from "../../modal/response/FxRate";
import { AccountMenuLink, BankMenuLink } from "../../modal/MenuLink";
import Pagination from "../Pagination";

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
    const [summaryLoader, setSummaryLoader] = useState<boolean>(true);
    const user = useContext(UserContext);
    const service = useContext(ServiceContext);
    const localization = useContext(LocalizationContext);
    const expenseAlert = useContext(AlertContext);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [currencySymbol, setCurrencySymbol] = useState(getSymbol(user.profile?.selectedCurrency));
    const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
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
                tagNames: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: true,
                    isVisible: true,
                    alias: 'Tags',
                    type: HeaderType.tag
                },
                tags: {
                    display: HeaderDisplay.HIDDEN,
                    isPrimaryKey: true,
                    isVisible: false,
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
                    type: HeaderType.custom,
                    customDisplay(value) {
                        const bankModal: BankModal = value as BankModal;
                        return `${getSymbol(bankModal.currency)}`;
                    },
                },
                accounts: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Accounts',
                    type: HeaderType.number
                },
                creditAmount: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Amounts',
                    type: HeaderType.custom,
                    customDisplay(value) {
                        const bankModal: BankModal = value as BankModal;
                        return `${Number(bankModal.creditAmount)} ${getSymbol(bankModal.currency)}`;
                    },
                },
                debitAmount: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Debit Amounts',
                    type: HeaderType.custom,
                    customDisplay(value) {
                        const bankModal: BankModal = value as BankModal;
                        return `${Number(bankModal.debitAmount)} ${getSymbol(bankModal.currency)}`;
                    },
                },
                holdAmount: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Hold Amount',
                    type: HeaderType.custom,
                    customDisplay(value) {
                        const bankModal: BankModal = value as BankModal;
                        return `${Number(bankModal.holdAmount)} ${getSymbol(bankModal.currency)}`;
                    },
                },
                totalAccounts: {
                    display: HeaderDisplay.NONE,
                    isPrimaryKey: false,
                    isVisible: true,
                    alias: 'Total Account',
                    type: HeaderType.number
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

    const fetchBank = () => {
        service.bankService?.fetchBanks(page, size)
            .then((response: BankModalsResponse) => {
                let banks: BankModal[] = [];
                let sumCreditAmount: number = 0;
                let sumDebitAmount: number = 0;
                response.Items.forEach((bank: BankModal) => {
                    const tagNames: Array<string> = [];
                    bank.tags.forEach((tag: Tag) => {
                        tagNames.push(tag.name);
                    })
                    bank.tagNames = tagNames.join(',')
                    banks.push(bank);
                    sumCreditAmount += Number(bank.creditAmount);
                    sumDebitAmount += Number(bank.debitAmount);
                });
                setTotalBank(response.Count);
                createBankDataSet(banks);
                updateSummary(banks);
                setLoader(false);
            }).catch(err => {
                expenseAlert.setAlert?.(`${localization.getString?.('Bank.error.404', localization.getLanguage?.())}`, AlertType.ERROR);
                setLoader(false);
            });
    }

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setSize(pageSize);
        fetchBank();
    }

    const updateSummary = (banks: BankModal[] | undefined = bankDataSet?.rows) => {
        setSummaryLoader(true);
        service.fxRateService?.getRates(user.profile?.selectedCurrency)
            .then((fxRates: FxRate[]) => {
                let totalDebitAmount = 0;
                let totalCreditAmount = 0;
                banks?.forEach((bankModel: BankModal) => {
                    if (bankModel.currency === user.profile?.selectedCurrency) {
                        totalDebitAmount += bankModel.debitAmount;
                        totalCreditAmount += bankModel.creditAmount;
                    } else {
                        const rate = fxRates.find((fxRate: FxRate) => fxRate.code as CurrencyType === bankModel.currency);
                        if (rate) {
                            totalCreditAmount += rate?.inverseRate * bankModel.creditAmount;
                            totalDebitAmount += rate?.inverseRate * bankModel.debitAmount;
                        }
                    }
                });
                setTotalCreditAmount(totalCreditAmount);
                setTotalDebitAmount(totalDebitAmount);
            })
            .catch((err: ApiError) => expenseAlert.setAlert?.(err.message, AlertType.ERROR))
            .finally(() => setSummaryLoader(false));
    }

    useEffect(() => {
        fetchBank();
    }, [service])

    useMemo(() => {
        updateSummary();
        setCurrencySymbol(getSymbol(user.profile?.selectedCurrency));
    }, [user.profile?.selectedCurrency]);

    const addModalCallback = (bank: BankModal) => {
        bank.tagNames = bank.tags.map((tag: Tag) => tag.name).join(',');
        if (bankDataSet) {
            createBankDataSet([...bankDataSet.rows, bank]);
        } else {
            const banks: Array<BankModal> = new Array();
            banks.push(bank)
            createBankDataSet(banks);
        }
        setTotalBank(totalBank + 1);
    }

    const editModalCallback = (id: string, editedBank: BankModal) => {
        editedBank.tagNames = editedBank.tags.map((tag: Tag) => tag.name).join(',');
        if (bankDataSet) {
            const banks: Array<BankModal> = bankDataSet.rows
                .map((bank: BankModal) => {
                    if (bank.ID === id) {
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
        setDeleteLoader(true);
        service.bankService?.deleteBank(bank.ID)
            .then((res: ResponseDelete) => {
                if (bankDataSet) {
                    let bankModals: Array<BankModal> = bankDataSet.rows;
                    const fetchIndex: number = bankModals.findIndex((sBank: BankModal) => sBank.ID === bank.ID);
                    if (fetchIndex !== -1) {
                        bankModals.splice(fetchIndex, 1);
                    }
                    createBankDataSet(bankModals);
                    setTotalBank(totalBank - 1);
                    setTotalCreditAmount(totalCreditAmount - Number(bank.creditAmount));
                    setTotalDebitAmount(totalDebitAmount - Number(bank.debitAmount));
                    expenseAlert.setAlert?.('Bank has been deleted successfully', AlertType.SUCCESS);
                }
            }).
            catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => { setDeleteLoader(false) });
    }

    return (
        <>
            {deleteLoader && <ContentLoader heading={`Deleting Bank Item`}>
            </ContentLoader>}
            <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                <Typography sx={{ marginBottom: '24px' }} variant="h4" letterSpacing={2}>
                    <Stack direction={'row'} spacing={2}>
                        <SvgIcon component={BankMenuLink.icon} fontSize={'large'} />
                        <span>{BankMenuLink.title}</span>
                    </Stack>
                </Typography>
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
                                        <AccountBalanceOutlinedIcon fontSize="inherit"></AccountBalanceOutlinedIcon>
                                        <Button size="large" onClick={() => setOpenModal(true)} >
                                            <AddIcon sx={{ mr: 1 }} />
                                            {localization.getString?.('Bank.addPrimaryCtaText', localization.getLanguage?.(), true)}
                                        </Button>
                                    </PlaceholderCard>
                                </Card>
                            </> :
                            <>
                                <Grid container spacing={2}>
                                    <InfoCardComponent loader={summaryLoader} header="Total Bank" value={`${totalBank}`} ></InfoCardComponent>
                                    <InfoCardComponent loader={summaryLoader} header="Credit Amount" value={`${totalCreditAmount.toFixed(2)}`} suffixCurrency={currencySymbol} color={green[700]}></InfoCardComponent>
                                    <InfoCardComponent loader={summaryLoader} header="Debit Amount" value={`${totalDebitAmount.toFixed(2)}`} suffixCurrency={currencySymbol} color={red[700]}></InfoCardComponent>
                                </Grid>
                                <Card raised sx={{ marginTop: '40px', marginBottom: '18px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ marginBottom: '12px' }}>
                                            {localization.getString?.('Bank.tableHeading', localization.getLanguage?.(), true)}
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
                                <Pagination page={page} pageSize={size} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
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
                {isAccountLinkActive && <Navigate to={`${AccountMenuLink.link}/${accountId}`} replace={true} />}
            </Box>
        </>
    );
}