import { ExpandMoreOutlined, SummarizeOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Fab, Grid, SvgIcon, Typography } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AlertContext, ServiceContext, UserContext } from "../../context";
import { BankModal } from "../../modal/response/Bank";
import InfoCardComponent from "../Card/InfoCard";
import ContentLoader from "../ContentLoader";
import AccountTab from "./accountTab";
import BankSelect from "./bankSelect";
import SavingsIcon from '@mui/icons-material/Savings';
import { Stack } from "@mui/system";
import { AccountSummary } from "../../modal/response/AccountSummary";
import { ApiError } from "../../modal/response/Error";
import { AlertType } from "../../modal/ExpenseAlert";
import { AccountMenuLink, BankMenuLink } from "../../modal/MenuLink";
import { getSymbol } from "../../modal/CurrencyType";

export default function AccountComponent() {
    const { bankId } = useParams();
    const [redirectToBank, setRedirectToBank] = useState<boolean>(false);
    const [openBankModal, setOpenBankModal] = useState<boolean>(false);
    const [bank, setBank] = useState<BankModal>();
    const [bankSelectCloseDisable, setBankSelectDisable] = useState<boolean>(true);
    const [loader, setLoader] = useState<boolean>(false);
    const [accountSummary, setAccountSummary] = useState<AccountSummary[]>([]);
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);
    const user = useContext(UserContext);

    useEffect(() => {
        if (bankId) {
            setLoader(true);
            loadSummaryData(bankId);
        } else {
            setOpenBankModal(true);
        }
    }, [service]);

    const loadSummaryData = (bankId: string) => {
        service.bankService?.fetchBank(parseInt(bankId))
            .then((res: BankModal) => {
                setBank(res);
            })
            .catch(() => {
                setOpenBankModal(true);
            })
            .then(() => {
                setLoader(false);
            });
        service.accountService?.fetchAccountSummary(bankId)
            .then((res: AccountSummary[]) => {
                setAccountSummary(res);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .then(() => {
                setLoader(false);
            });
    }

    const selectBank = (bank: BankModal) => {
        setBank(bank);
        setOpenBankModal(false);
        service.accountService?.fetchAccountSummary(bank.ID)
            .then((res: AccountSummary[]) => {
                setAccountSummary(res);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .then(() => {
                setLoader(false);
            });
    }

    const switchBank = () => {
        setOpenBankModal(true);
        setBankSelectDisable(false);
    }

    const bankSelectOnClose = () => {
        setOpenBankModal(false);
    }

    const handleAccountChange = () => {
        if (bank?.ID) {
            loadSummaryData(bank?.ID);
        }
    }

    return (<>
        {
            loader ? <>
                <ContentLoader heading={`Setting Account Page !!!`}>
                </ContentLoader>
            </> : <>
                <BankSelect
                    onNoData={() => { setRedirectToBank(true) }}
                    closeDisabled={bankSelectCloseDisable}
                    show={openBankModal}
                    onChange={selectBank}
                    onClose={bankSelectOnClose}
                ></BankSelect>
                <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                    <Typography sx={{ marginBottom: '24px' }} variant="h4" letterSpacing={2}>
                        <Stack direction={'row'} spacing={2}>
                            <SvgIcon component={AccountMenuLink.icon} fontSize={'large'} />
                            <span>{AccountMenuLink.title}</span>
                        </Stack>
                    </Typography>
                    <Accordion sx={{ marginBottom: '40px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            aria-controls="panel1a-summary"
                            id="panel1a-summary"
                        >
                            <Stack direction={'row'} spacing={2}>
                                <SummarizeOutlined fontSize="large"></SummarizeOutlined>
                                <Typography variant="h5" letterSpacing={2}>Account Summary for {bank?.name}</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} marginBottom="40px">
                                <InfoCardComponent header="Credit Amount" value={bank && bank.creditAmount ? new Number(bank.creditAmount).toPrecision() : '0'} suffixCurrency={getSymbol(bank?.currency)} color={green[700]}></InfoCardComponent>
                                <InfoCardComponent header="Debit Amount" value={bank && bank.debitAmount ? new Number(bank.debitAmount).toPrecision() : '0'} suffixCurrency={getSymbol(bank?.currency)} color={red[700]}></InfoCardComponent>
                                <InfoCardComponent header="Hold Amount" value={bank && bank.holdAmount ? new Number(bank.holdAmount).toPrecision() : '0'} suffixCurrency={getSymbol(bank?.currency)} color={blue[700]}></InfoCardComponent>
                                <InfoCardComponent header="Total Account" value={bank && bank.totalAccounts ? new Number(bank.totalAccounts).toPrecision() : '0'} ></InfoCardComponent>
                                {accountSummary.map((summary: AccountSummary) =>
                                    <>
                                        <InfoCardComponent header={`Total ${summary.accountType}`} value={`${summary.count}`} secondaryText={`Bank: ${bank?.name}`}></InfoCardComponent>
                                    </>
                                )}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <AccountTab onChangeBank={(bank) => setBank(bank)} onAccountChange={handleAccountChange} bank={bank}></AccountTab>
                    <Fab variant="extended" color="secondary" aria-label="add" onClick={() => switchBank()} sx={{ position: 'fixed', bottom: '40px', right: '24px' }}>
                        <SavingsIcon sx={{ mr: 1 }} />
                        Switch Bank
                    </Fab>
                </Box>
            </>
        }
        {redirectToBank && <Navigate to={BankMenuLink.link} replace={true} />}
    </>);
}