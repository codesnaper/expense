import { Button, Card, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import ContentLoader from "../ContentLoader";
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import LimitItem from "./LimitItem";
import { Limit } from "../../modal/response/Limit";
import LimitModal from "./Model";
import Pagination from "../Pagination";
import { ResponseList } from "../../modal/ResponseList";
import { ApiError } from "../../modal/response/Error";
import { AlertType } from "../../modal/ExpenseAlert";
import PlaceholderCard from "../PlaceholderCard";
import AddIcon from '@mui/icons-material/Add';

export default function LimitComponent() {

    const [loader, setLoader] = useState<boolean>(false);

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const [openModel, setOpenModel] = useState<boolean>(false);

    const [limits, setLimits] = useState<Array<Limit>>([]);

    const [page, setPage] = useState<number>(0);

    const [pageSize, setPageSize] = useState<number>(10);

    const [totalElement, setTotalElement] = useState<number>(0);

    const onSaveLimit = (limit: Limit) => {
        setLimits([...limits, limit]);
    }

    const onEditLimit = (limit: Limit) => {
        
    }

    const onDeleteLimit = (limit: Limit) => {
        
    }

    useEffect(() => {
        setLoader(true);
        service.limitService?.fetchLimits(page, pageSize)
            .then((res: ResponseList<Limit>) => {
                setTotalElement(res.Count);
                setPage(res.pageNo);
                setPageSize(res.pageSize);
                setLimits(res.Items);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
            })
    }, [service])

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setPageSize(pageSize);
    }

    return (
        <>
            {loader &&
                <ContentLoader heading={`Loading Limits !!!`}>
                </ContentLoader>
            }
            <Box component={Container} sx={{ paddingTop: '40px' }} maxWidth={'false'}>
                {totalElement === 0 ?
                    <>
                        <Card raised sx={{ marginTop: '40px' }}>
                            <PlaceholderCard heading='Limit'
                                info='Add your limit to manage your expenses.'
                            >
                                <RuleFolderIcon fontSize="inherit"></RuleFolderIcon>
                                <Button size="large" onClick={() => setOpenModel(true)} >
                                    <AddIcon sx={{ mr: 1 }} />
                                    Add Limit
                                </Button>
                            </PlaceholderCard>
                        </Card>
                    </> : <>
                        <Paper elevation={6} sx={{ padding: '24px' }}>
                            <Stack sx={{ marginBottom: '12px' }} direction='row'>
                                <Typography variant="h5" component={'div'} ><RuleFolderIcon></RuleFolderIcon> Expense Limit</Typography>
                                <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={() => setOpenModel(!openModel)}>Add Limit</Button>
                            </Stack>
                            <Divider></Divider>
                            <Grid container spacing={2} sx={{ marginTop: '12px' }}>
                                <List sx={{ width: '100vw' }}>
                                    {limits.map((limit: Limit) => <>
                                        <ListItem disablePadding>
                                            <LimitItem onEdit={onEditLimit} onDelete={onDeleteLimit} limit={limit}></LimitItem>
                                        </ListItem>
                                    </>)}
                                </List>
                            </Grid>
                            <Pagination page={page} pageSize={pageSize} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
                        </Paper>
                    </>
                }
            </Box>
            <LimitModal
                accounts={[]}
                categories={[]}
                openModal={openModel}
                onClose={(openModal: boolean) => setOpenModel(openModal)}
                onSave={onSaveLimit}
            ></LimitModal>
        </>
    )
}