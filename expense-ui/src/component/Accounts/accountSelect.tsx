import { Accordion, AccordionDetails, AccordionSummary, Button, ListItemButton, ListSubheader, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { ServiceContext, AlertContext } from '../../context';
import { ApiError } from "../../modal/response/Error";
import { AlertType } from "../../modal/ExpenseAlert";
import ContentLoader from "../ContentLoader";
import Pagination from "../Pagination";
import { Stack } from "@mui/system";
import { Account, AccountResponse, AccountType } from "../../modal/response/Account";
import { ExpandMore } from "@mui/icons-material";
import BankSelect from "./bankSelect";
import { BankModal } from "../../modal/response/Bank";

interface AccountSelectProps {
    show: boolean
    bankId?: number;
    onChange?: (account: Account) => void;
    closeDisabled?: boolean;
    onClose?: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountSelect(props: AccountSelectProps) {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [bankId, setBankId] = useState(props.bankId);
    const [bankModal, setBankModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<BankModal>(new BankModal());
    const [accounts, setAccounts] = useState<Array<Account>>();
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);

    useEffect(() => {
        if (!bankId) {
            setBankModal(true);
        } else {
            setBankId(bankId);
        }
    }, [])

    const handleClose = () => {
        props.onClose?.();
    };

    const fetchAccount = (accountType: AccountType) => {
        setLoader(true);
        service.accountService?.fetchAccounts<Account>(`${bankId}`, accountType, page, size)
            .then((response: AccountResponse<Account>) => {
                setTotalElement(response.Count);
                setPage(response.pageNo);
                if(response.pageSize === 0){
                    setSize(10);
                } else{
                    setSize(response.pageSize);
                }
                setAccounts(response.Items);
            }).catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            }).finally(() => {
                setLoader(false);
            })
    }

    const handleOnChange = (event: React.SyntheticEvent, expanded: boolean, accountType: AccountType) => {
        if (expanded) {
            fetchAccount(accountType);
        }
    }

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setSize(pageSize);
        // fetchBank();
    }

    const selectBank = (bank: BankModal) => {
        setBankId(parseInt(bank.ID));
        setBankModal(false);
        setSelectedBank(bank);
    }

    const goToBankModal = () => {
        setBankModal(true);
    }

    const renderAccordion = (accountType: AccountType) => {
        return (
            <>
                <Accordion onChange={(event, expanded) => handleOnChange(event, expanded, accountType)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography letterSpacing={2} textTransform={'capitalize'}>{`${accountType} Account`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List
                            subheader={
                                <ListSubheader>
                                    <Pagination page={page} pageSize={size} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
                                </ListSubheader>
                            }
                        >
                            {accounts?.map((account: Account) => <>
                                <ListItemButton key={account.id} onClick={() => { account.bank = selectedBank;props.onChange?.(account) }}>
                                    <ListItemText
                                        primary={account.name}
                                        secondary={
                                            <>
                                                <Stack direction={'row'} spacing={2}>
                                                    <Typography variant="caption">
                                                        Account Number : {account.accountNumber}
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        Account Amount : {account.amount}
                                                    </Typography>
                                                </Stack>
                                            </>
                                        }
                                    >
                                    </ListItemText>
                                </ListItemButton>
                            </>)}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    }

    return (<>
        <BankSelect
            closeDisabled={false}
            show={bankModal && props.show}
            onChange={selectBank}
            onClose={() => props.onClose?.()}
        ></BankSelect>
        {(!bankModal && props.show) &&
            <>
                <div>
                    <Dialog
                        fullScreen
                        open={props.show}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                    disabled={props.closeDisabled}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Stack direction={'row'} sx={{display: 'flex', width: '100%'}}>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Select Account
                                    </Typography>
                                    <Button onClick={goToBankModal} variant="text" sx={{color: "white"}}>
                                        Go To Bank
                                    </Button>
                                </Stack>
                            </Toolbar>
                        </AppBar>
                        {loader &&
                            <>
                                <ContentLoader heading={`Loading Account Data`}>
                                </ContentLoader>
                            </>
                        }
                        {renderAccordion(AccountType.ACCOUNT)}
                        {renderAccordion(AccountType.LOAN)}
                        {renderAccordion(AccountType.MONEY_LENDING)}
                    </Dialog>
                </div>
            </>
        }
    </>)

}