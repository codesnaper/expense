import { Alert, Card, CardContent, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import { AlertType } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { Category } from "../../modal/response/Category";
import { ApiError } from "../../modal/response/Error";
import { ResponseList } from "../../modal/ResponseList";
import ContentLoader from "../ContentLoader";
import Pagination from "../Pagination";
import CategoryCard from "./CategoryCard";

export default function CategoryComponent() {

    const [loader, setLoader] = useState<boolean>(false);

    const [categories, setCategories] = useState<Array<Category>>([]);

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const [page, setPage] = useState<number>(0);

    const [pageSize, setPageSize] = useState<number>(0);

    const [totalElement, setTotalElement] = useState<number>(0);

    useEffect(() => {
        setLoader(true);
        service.categoryService?.fetchCategory(page, pageSize)
            .then((res: ResponseList<Category>) => {
                setCategories(res.Items);
                setPage(res.pageNo);
                setPageSize(res.pageSize);
                setTotalElement(res.Count);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
            })
    }, [service])

    const operationEvent = (category: Category, operation: OperationType) => {
        if (operation === OperationType.ADD) {
            service.categoryService?.addCategory(category)
                .then((res: Category) => {
                    setCategories([...categories, res]);
                    expenseAlert.setAlert?.('Category Addedd Successfully', AlertType.SUCCESS);
                    setTotalElement(totalElement+1);
                })
                .catch((err: ApiError) => {
                    expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                })
        }
    }

    const pageEvent = (pageNo: number, pageSize: number) => {
        setPage(pageNo);
        setPageSize(pageSize);
    }

    return (<>
        {loader &&
            <ContentLoader heading={`Loading Category`}>
            </ContentLoader>
        }
        <Box component={Container} sx={{ paddingTop: '40px' }} maxWidth={'false'}>
            <Paper elevation={6} sx={{ padding: '24px' }}>
                <Typography variant="h5" component={'div'} sx={{ marginBottom: '12px' }}>Category</Typography>
                <Divider></Divider>
                <Grid container spacing={2} sx={{marginTop: '12px'}}>
                    {categories.map((category: Category, index: number) =>
                        <>
                            <Grid item key={index} xs={4}>
                                <CategoryCard
                                    categoryId={category.id}
                                    name={category.name}
                                    description={category.description}
                                    editable={false}
                                    onEvent={operationEvent}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item key={'new'} xs={4}>
                        <CategoryCard
                            categoryId={-1}
                            editable={true}
                            onEvent={operationEvent}
                        />
                    </Grid>
                </Grid>
                <Pagination page={page} pageSize={pageSize} totalElement={totalElement} onPageEvent={pageEvent}></Pagination>
            </Paper>
        </Box>

    </>);

}