import { ExpandMoreOutlined, SummarizeOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Fab, Grid, Typography } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertContext, LocalizationContext, ServiceContext } from "../../context";
import { BankModal } from "../../modal/response/Bank";
import InfoCardComponent from "../Card/InfoCard";
import ContentLoader from "../ContentLoader";
import AccountTab from "./accountTab";
import BankSelect from "./bankSelect";
import SavingsIcon from '@mui/icons-material/Savings';
import { Stack } from "@mui/system";

export default function AccountComponent() {

    const { bankId } = useParams();
    const [openBankModal, setOpenBankModal] = useState<boolean>(false);
    const [bank, setBank] = useState<BankModal>();
    const [bankSelectCloseDisable, setBankSelectDisable] = useState<boolean>(true);
    const [loader, setLoader] = useState<boolean>(false);
    const service = useContext(ServiceContext);
    const localization = useContext(LocalizationContext);

    useEffect(() => {
        if (bankId) {
            setLoader(true);
            service.bankService?.fetchBank(parseInt(bankId))
                .then((res: BankModal) => {
                    setBank(res);
                })
                .catch(() => {
                    setOpenBankModal(true);
                })
                .then(() => {
                    setLoader(false);
                })
        } else {
            setOpenBankModal(true);
        }
    }, [service]);

    const selectBank = (bank: BankModal) => {
        setBank(bank);
        setOpenBankModal(false);
    }

    const switchBank = () => {
        setOpenBankModal(true);
        setBankSelectDisable(false);
    }

    const bankSelectOnClose = () => {
        setOpenBankModal(false);
    }

    return (<>
        {
            loader ? <>
                <ContentLoader heading={`${localization.getString?.('Account.appLoading', localization.getLanguage?.(), true)}`}>
                </ContentLoader>
            </> : <>

                <BankSelect
                    closeDisabled={bankSelectCloseDisable}
                    show={openBankModal}
                    onChange={selectBank}
                    onClose={bankSelectOnClose}
                ></BankSelect>
                <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
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
                                <InfoCardComponent header="Credit Amount" value={`0`} secondaryText="Bank: XYZ" suffixCurrency="₹" color={green[700]}></InfoCardComponent>
                                <InfoCardComponent header="Debit Amount" value={`0`} secondaryText="Bank: XYZ" suffixCurrency="₹" color={red[700]}></InfoCardComponent>
                                <InfoCardComponent header="Hold Amount" value={`0`} secondaryText="Bank: XYZ" suffixCurrency="₹" color={blue[700]}></InfoCardComponent>
                                <InfoCardComponent header="Total Account" value={`0`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                <InfoCardComponent header="Total Saving Account" value={`0`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                <InfoCardComponent header="Total Loan Account" value={`0`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                <InfoCardComponent header="Total Money Lending Account" value={`0`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                <InfoCardComponent header="Total Saving Interest Account" value={`0`} secondaryText="Bank: XYZ"></InfoCardComponent>
                                <InfoCardComponent header="Total Saving Compound Interest Account" value={`0`} secondaryText="Bank: XYZ"></InfoCardComponent>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <AccountTab bank={bank}></AccountTab>
                    <Fab variant="extended" color="secondary" aria-label="add" onClick={() => switchBank()} sx={{ position: 'fixed', bottom: '40px', right: '24px' }}>
                        <SavingsIcon sx={{ mr: 1 }} />
                        Switch Bank
                    </Fab>
                </Box>
            </>
        }

    </>);


}