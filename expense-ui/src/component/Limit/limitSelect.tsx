import { ListItemButton, ListSubheader, Slide } from "@mui/material";
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
import { ResponseList } from "../../modal/ResponseList";
import { Limit } from "../../modal/response/Limit";

interface LimitSelectProps {
    show: boolean
    disableMaxLimit?: boolean,
    onChange?: (limit: Limit) => void;
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

export default function LimitSelect(props: LimitSelectProps) {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [limits, setLimits] = useState<Array<Limit>>([]);
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);

    useEffect(() => {
        fetchLimits();
    }, [])

    const handleClose = () => {
        props.onClose?.();
    };

    const fetchLimits = () => {
        setLoader(true);
        service.limitService?.fetchLimits(page, size)
            .then((response: ResponseList<Limit>) => {
                setTotalElement(response.Count);
                setPage(response.pageNo);
                setSize(response.pageSize);
                setLimits(response.Items);
            }).catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            }).finally(() => {
                setLoader(false);
            })
    }

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setSize(pageSize);
        fetchLimits();
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
                            Select Limit
                        </Typography>
                    </Toolbar>
                </AppBar>
                {loader &&
                    <>
                        <ContentLoader heading={`Loading Limits`}>
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
                    {limits.map((limit: Limit) => <>
                        <ListItemButton key={limit.id} onClick={() => { props.onChange?.(limit) }}>
                            <ListItemText
                                primary={limit.name}
                                secondary={
                                    <>
                                        <Typography variant="caption">
                                            {limit.description}
                                        </Typography>
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