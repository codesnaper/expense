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
import { Category } from "../../modal/response/Category";
import { ResponseList } from "../../modal/ResponseList";

interface CategorySelectProps {
    show: boolean
    onChange?: (category: Category) => void;
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

export default function CategorySelect(props: CategorySelectProps) {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);

    useEffect(() => {
        fetchCategory();
    }, [])

    const handleClose = () => {
        props.onClose?.();
    };

    const fetchCategory = (pageNo: number= page, pageSize: number= size) => {
        setLoader(true);
        service.categoryService?.fetchCategory(pageNo, pageSize)
            .then((response: ResponseList<Category>) => {
                setTotalElement(response.Count);
                setPage(response.pageNo);
                setSize(response.pageSize);
                setCategories(response.Items);
            }).catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            }).finally(() => {
                setLoader(false);
            })
    }

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setSize(pageSize);
        fetchCategory(pageNo, pageSize);
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
                            Select Category
                        </Typography>
                    </Toolbar>
                </AppBar>
                {loader &&
                    <>
                        <ContentLoader heading={`Loading Categories`}>
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
                    {categories.map((category: Category) => <>
                        <ListItemButton key={category.id} onClick={() => { props.onChange?.(category) }}>
                            <ListItemText
                                primary={category.name}
                                secondary={
                                    <>
                                        <Typography variant="caption">
                                            {category.description}
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