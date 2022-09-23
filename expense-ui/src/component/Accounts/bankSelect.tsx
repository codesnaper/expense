import { ListItemButton, ListSubheader, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext, useEffect, useState } from "react";
import { BankModal, BankModalsResponse } from "../../modal/response/Bank";
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

interface BankSelectProps {
    show: boolean
    onChange?: (bank: BankModal) => void;
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

export default function BankSelect(props: BankSelectProps) {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [banks, setBanks] = useState<Array<BankModal>>([]);
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);

    useEffect(() => {
        fetchBank();
    },[])

    const handleClose = () => {
        props.onClose?.();
    };

    const fetchBank = () => {
        setLoader(true);
        service.bankService?.fetchBanks(page, size)
            .then((response: BankModalsResponse) => {
                setTotalElement(response.Count);
                setPage(response.pageNo);
                setSize(response.pageSize);
                setBanks(response.Items);
            }).catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            }).finally(() => {
                setLoader(false);
            })
    }

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setSize(pageSize);
        fetchBank();
    }

    return (<>
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
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Select Bank
                        </Typography>
                    </Toolbar>
                </AppBar>
                {loader &&
                    <>
                        <ContentLoader heading={`Loading Bank Data`}>
                        </ContentLoader>
                    </>
                }
                <List
                    subheader={
                        <ListSubheader>
                            <Pagination page={page} pageSize={size} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
                        </ListSubheader>
                    }
                >
                    {banks.map((bank: BankModal) => <>
                        <ListItemButton key={bank.ID} onClick={() => { props.onChange?.(bank) }}>
                            <ListItemText
                                primary={bank.name}
                                secondary={
                                    <>
                                        <Stack direction={'row'} spacing={2}>
                                            <Typography variant="caption">
                                                Location : {bank.location}
                                            </Typography>
                                            <Typography variant="caption">
                                                currencies : {bank.currency}
                                            </Typography>
                                        </Stack>
                                    </>
                                }
                                >
                            </ListItemText>
                        </ListItemButton>
                    </>)}
                </List>
            </Dialog>
        </div>
    </>)

}