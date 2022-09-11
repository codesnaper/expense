import { Divider, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import ContentLoader from "../ContentLoader";
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import LimitItem from "./LimitItem";
import { Limit, Priority, Recursively } from "../../modal/response/Limit";
export default function LimitComponent() {

    const [loader, setLoader] = useState<boolean>(false);

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const limit: Limit = {
        name: 'Sample Limit',
        description: 'Its a sample limit rule',
        maxAmount: 5000,
        minAmount: 3000,
        thresoldWarningAmount: 4000,
        priority: Priority.HIGH,
        resetRecursive: Recursively.MONTH,
        usedAmount: 1000
    }


    return (
        <>
            {loader &&
                <ContentLoader heading={`Loading Category`}>
                </ContentLoader>
            }
            <Box component={Container} sx={{ paddingTop: '40px' }} maxWidth={'false'}>
                <Paper elevation={6} sx={{ padding: '24px' }}>
                    <Typography variant="h5" component={'div'} sx={{ marginBottom: '12px' }}><RuleFolderIcon></RuleFolderIcon> Expense Limit</Typography>
                    <Divider></Divider>
                    <Grid container spacing={2} sx={{ marginTop: '12px' }}>
                        <List sx={{width: '100vw'}}>
                            <ListItem disablePadding>
                                <LimitItem limit={limit}></LimitItem>
                            </ListItem>
                        </List>
                    </Grid>
                    {/* <Pagination page={page} pageSize={pageSize} totalElement={totalElement} onPageEvent={pageEvent}></Pagination> */}
                </Paper>
            </Box>
        </>
    )
}