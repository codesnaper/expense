import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Skeleton, Typography, Toolbar } from "@mui/material";

export default function TableSkeleton(props) {

    const renderTableBody = (nCell, nRow) => {
        return (
            <>
                {
                    Array.from(Array(nCell).keys())
                        .map((val) => <>
                            <TableRow
                                key={val}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {Array.from(Array(nCell).keys()).map((val) => <>
                                    <TableCell key={val}>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    </TableCell>
                                </>)}
                            </TableRow>
                        </>)
                }
            </>
        )
    }

    const renderTableHeader = (nCell) => {
        return (<>
            <TableHead>
                <TableRow key={1}>
                    {Array.from(Array(nCell).keys()).map((val) => {
                        return (
                            <>
                                <TableCell key={val}>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </TableCell>
                            </>
                        )
                    })}
                </TableRow>
            </TableHead>
        </>)
    }
    return (<>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="body"
                    id="tableTitle"
                    component="div"
                >
                    <Skeleton width={50} variant="text" sx={{ fontSize: '1rem' }} />
                </Typography>

                <Typography
                    sx={{ flex: '1 1 100%', flex: 'initial' }}
                    variant="body"
                    id="tableTitle"
                    component="div"
                >
                    <Skeleton variant="rectangular" width={167} height={48} />

                </Typography>
                <Typography
                    sx={{ flex: '1 1 100%', flex: 'initial' }}
                    variant="body"
                    id="tableTitle"
                    component="div"
                >
                    <Skeleton variant="rectangular" width={70} height={48} />
                </Typography>
            </Toolbar>
            <TableContainer >
                <Table aria-label="simple table">
                    {renderTableHeader(6)}
                    <TableBody>
                        {renderTableBody(6, 3)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={0}
                page={0}
            />
        </Paper>
    </>)
}