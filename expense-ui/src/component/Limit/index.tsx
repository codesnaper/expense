import { Button, Card, CardContent, Divider, Grid, List, ListItem, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import ContentLoader from "../ContentLoader";
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import { EnhancedLimit, Limit } from "../../modal/response/Limit";
import LimitModal from "./Model";
import Pagination from "../Pagination";
import { ResponseList } from "../../modal/ResponseList";
import { ApiError } from "../../modal/response/Error";
import { AlertType } from "../../modal/ExpenseAlert";
import PlaceholderCard from "../PlaceholderCard";
import AddIcon from '@mui/icons-material/Add';
import { Category } from "../../modal/response/Category";
import { TableDataSet } from "../../modal/TableDataSet";
import limitDataSet from "../../Dataset/LimitDataSet";
import ExpenseTable from "../Table";
import { LimitMenuLink } from "../../modal/MenuLink";

export default function LimitComponent() {

    const [loader, setLoader] = useState<boolean>(false);

    const [deleteLoader, setDeleteLoader] = useState<boolean>(false);

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const [openModel, setOpenModel] = useState<boolean>(false);

    const [limits, setLimits] = useState<Array<Limit>>([]);

    const [page, setPage] = useState<number>(0);

    const [pageSize, setPageSize] = useState<number>(10);

    const [totalElement, setTotalElement] = useState<number>(0);

    const [categories, setCategories] = useState<Category[]>([]);

    const [limitTableDataset, setLimitTableDataset] = useState<TableDataSet<EnhancedLimit>>(limitDataSet([]));

    const onSaveLimit = (limit: Limit) => {
        if(totalElement <= 10){
            const limits: Limit[] = limitTableDataset.rows;
            limits.push(limit);
            // limitTableDataset.rows = limits;
            setLimitTableDataset(limitTableDataset);
            setTotalElement(totalElement + 1);
        }
        setOpenModel(false);
    }

    useEffect(() => {
        setLoader(true);
        service.limitService?.fetchLimits(page, pageSize)
            .then((res: ResponseList<EnhancedLimit>) => {
                setTotalElement(res.Count);
                setPage(res.pageNo);
                setPageSize(res.pageSize);
                setLimits(res.Items);
                const limitTableDataSet = limitDataSet(res.Items);
                limitTableDataSet.action = {
                    add: true,
                    show: false,
                    delete: true,
                    edit: true
                }
                setLimitTableDataset(limitTableDataSet);

                service.categoryService?.fetchAllCategory().then((categories: Category[]) => {
                    setCategories(categories);
                    setLoader(false);
                })
                    .catch((err: ApiError) => {
                        expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                    })
                    .finally(() => {
                        setLoader(false);
                    });
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
            });
    }, [service])

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setPageSize(pageSize);
    }

    const deleteLimit = (deletedLimit: Limit) => {
        setDeleteLoader(true);
        service.limitService?.deleteLimit(deletedLimit.id)
            .then(() => {
                let limits: Array<Limit> = limitTableDataset.rows;
                    const fetchIndex: number = limits.findIndex((limit: Limit) => limit.id === deletedLimit.id);
                    if (fetchIndex !== -1) {
                        limits.splice(fetchIndex, 1);
                    }
                    // limitTableDataset.rows = limits;
                    setLimitTableDataset(limitTableDataset)
                    expenseAlert.setAlert?.('Limit has been deleted successfully', AlertType.SUCCESS);
            }).
            catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setDeleteLoader(false);
            })
    }

    return (
        <>
            {loader &&
                <ContentLoader heading={`Loading Limits !!!`}>
                </ContentLoader>
            }
            {deleteLoader &&
                <ContentLoader heading={`Deleting Limits !!!`}>
                </ContentLoader>
            }
            {!loader &&
                <>
                   <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                   <Typography sx={{ marginBottom: '24px' }} variant="h4" letterSpacing={2}>
                    <Stack direction={'row'} spacing={2}>
                        <SvgIcon component={LimitMenuLink.icon} fontSize={'large'} />
                        <span>Limits</span>
                    </Stack>
                   </Typography>

                        {limitTableDataset.rows.length === 0 ?
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
                                
                                
                                    <Grid container spacing={2} sx={{ marginTop: '12px', width: '100%' }}>
                                        <Card raised sx={{ marginBottom: '40px', width: '100%' }}>
                                            <CardContent>
                                                <Typography variant="h5" component={'div'} ><RuleFolderIcon></RuleFolderIcon> Expense Limit</Typography>
                                                <Divider sx={{ marginBottom: '12px', marginTop: '12px' }}></Divider>
                                                <ExpenseTable
                                                    dataset={limitTableDataset}
                                                    // showActionCallback={(row) => viewAccounts(row)}
                                                    // editActionCallback={(row) => editBank(row)}
                                                    deleteActionCallback={deleteLimit}
                                                    addActionCallback={() => setOpenModel(true)}
                                                ></ExpenseTable>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Pagination page={page} pageSize={pageSize} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
                            </>
                        }
                    </Box>
                </>
            }
            <LimitModal
                categories={categories}
                openModal={openModel}
                onClose={(openModal: boolean) => setOpenModel(openModal)}
                onSave={onSaveLimit}
            ></LimitModal>
        </>
    )
}