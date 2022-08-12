import ModalBank from "./modal";
import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, CardContent, Typography, Card, CardActionArea, Button } from "@mui/material";
import ExpenseTable from "../../blocks/table/table";
import { Navigate } from "react-router-dom";
import { BANK_HEADER } from "../../modal/bankHeader";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddIcon from '@mui/icons-material/Add';
import ContentLoader from "../../blocks/contentLoader";
import PlaceholderCard from "../../blocks/placeholderCard";
import { UserContext } from "../../providers/userContext";
import { ServiceContext } from "../../providers/serviceContext";
import { LocalizationContext } from "../../providers/localizationContext";

export default function Bank(props) {
    const [banks, setBanks] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('add');
    const [bank, setBank] = useState({});
    const [accountNavigate, setAccountNavigate] = useState(false);
    const [accountNavigateId, setAccountNavigateId] = useState(-1);
    const [loader, setLoader] = useState(true);
    const user = useContext(UserContext);
    const service = useContext(ServiceContext);
    const localization = useContext(LocalizationContext);

    useEffect(() => {
        if(service.bankService){
            service.bankService.fetchBanks(user.id)
            .then(res => {
                let data = [];
                res.Items.forEach(item => {
                    data.push(item);
                });
                setBanks(data);
                setLoader(false);

            }).catch(err => {
                console.error(err);
                setLoader(false);
            });
        }
        
    }, [service])

    const handleEditCallback = (id, data) => {
        for (let inc = 0; inc < banks.length; ++inc) {
            if (banks[inc].ID === id) {
                let keys = Object.keys(data);
                keys.forEach(key => {
                    banks[inc][key] = data[key];
                });
            }
        }
        setBanks(banks);
    }

    const handleCloseModal = () => {
        setOpen(false);
        setType('add');
        setBank({});
    }

    const showAction = (data) => {
        setAccountNavigateId(data.ID);
        setAccountNavigate(true);
    }

    const handleEditBank = (data) => {
        setType('edit');
        setOpen(true);
        setBank(data);
    }

    const handleDeleteBank = (bank) => {
        let fetchIndex = banks.map(bank => bank.ID).indexOf(bank.ID);
        if (fetchIndex) {
            banks.splice(fetchIndex, 1);
        }
        setBanks(banks)
    }

    return (
        <>
            <Container maxWidth sx={{ 'margin-top': '40px' }}>
                {loader ? <>
                    <ContentLoader heading={localization.getString('Bank.appLoading',localization.getLanguage(),true)}>
                    </ContentLoader>
                </> :
                    <>
                        {(banks.length === 0) ?
                            <>
                                <PlaceholderCard heading= {localization.getString('Bank.emptyCardHeading',localization.getLanguage(),true)}
                                    info={localization.getString('Bank.emptyCardInfo','en',true)}
                                >
                                    <AccountBalanceOutlinedIcon fontSize="30"></AccountBalanceOutlinedIcon>
                                    <Button size="large" onClick={() => setOpen(true)} >
                                        <AddIcon sx={{ mr: 1 }} />
                                        {localization.getString('Bank.addPrimaryCtaText',localization.getLanguage(),true)}
                                    </Button>
                                </PlaceholderCard>
                            </> :
                            <>
                                <ExpenseTable
                                    action
                                    showAction
                                    editAction
                                    deleteAction
                                    addAction
                                    loader={loader}
                                    dataset={banks}
                                    headers={BANK_HEADER}
                                    showActionCallback={(row) => showAction(row)}
                                    editActionCallback={(row) => handleEditBank(row)}
                                    deleteActionCallback={(row) => handleDeleteBank(row)}
                                    addActionCallback={() => setOpen(true)}
                                >
                                    <span>{localization.getString('Bank.tableHeading',localization.getLanguage(),true)}</span>
                                    <span>{localization.getString('Bank.tableAmountCountHeading',localization.getLanguage(),true)} {10}</span>
                                </ExpenseTable>
                            </>

                        }
                    </>}

                <ModalBank openModal={open} type={type}
                    bank={bank}
                    closeModalCallback={() => handleCloseModal()}
                    addCallback={(data) => setBanks([...banks, data])}
                    editCallback={(id, data) => handleEditCallback(id, data)}
                ></ModalBank>
                {accountNavigate && <Navigate to={`/account?bankId=${accountNavigateId}`} replace={true} />}
            </Container>
        </>
    );
}


