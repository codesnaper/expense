import { Button, ButtonGroup, FormControl, Input, InputAdornment, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Header } from "../../modal/Header";
import { Operator, TableDataSet } from "../../modal/TableDataSet";
import MenuFilter from "./menu/Filter";
import MenuColumn from "./menu/MenuColumn";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
interface ExpenseTableProps {
    dataset?: TableDataSet<Object>,
    showActionCallback?: (row: any) => void,
    editActionCallback?: (row: any) => void,
    deleteActionCallback?: (row: any) => void,
    addActionCallback?: () => void,
}

export default function ExpenseTable(props: ExpenseTableProps) {

    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const [page, setPage] = React.useState<number>(0);
    const [refresh, setRefresh] = React.useState<boolean>(false);

    const toggleHiddenColumn = (header: Header) => {
        props.dataset?.toggleHiddenColumn(header);
        setRefresh(!refresh);
    }

    const handleFilter = (column: string, operator: Operator, value: string) => {
        props.dataset?.applyFilter(column, operator, value);
        setRefresh(!refresh);
    }

    const showButton = (index: number) => {
        props.showActionCallback?.(props.dataset?.getIndexedData(index));
    }

    const editButton = (index: number) => {
        props.editActionCallback?.(props.dataset?.getIndexedData(index));
    }

    const deleteButton = (index: number) => {
        props.deleteActionCallback?.(props.dataset?.getIndexedData(index));
    }

    const renderSearch = () => {
        return (
            <>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Search
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </>
        );
    }

    return (
        <>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <Typography
                        key={'1'}
                        sx={{ flex: '1 1 100%' }}
                        variant="body1"
                        id="tableTitle"
                        component="div"
                    >
                        <MenuColumn toggleHiddenColumn={(header: Header) => toggleHiddenColumn(header)} columns={props.dataset?.getAllColumns()}></MenuColumn>
                        <MenuFilter handleFilter={(column: string, operator: Operator, value: string) => handleFilter(column, operator, value)} columns={props.dataset?.getColumns()}></MenuFilter>
                    </Typography>
                    <Typography
                        key={'2'}
                        sx={{ flex: 'initial' }}
                        variant="body1"
                        id="tableTitle"
                        component="div"
                    >
                        {renderSearch()}
                    </Typography>
                    <Typography
                        key={'3'}
                        sx={{ flex: 'initial' }}
                        variant="body1"
                        id="tableTitle"
                        component="div"
                    >
                        {(props.dataset?.action && props.dataset?.action.add) && <Button sx={{ marginLeft: '24px' }} onClick={() => props.addActionCallback?.()} variant="contained">Add</Button>}
                    </Typography>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table size="small" stickyHeader aria-label="simple table">
                        <TableHead key={'header-1'}>
                            <TableRow key={'header-1-row'}>
                                {
                                    props.dataset?.getColumns().
                                        map(
                                            (header: Header, idx: number) => <TableCell key={`header-1-row-${idx}`} align="center" >{header.alias}</TableCell>
                                        )
                                }
                                {props.dataset?.action && <TableCell key={'header-action'} align="center">Action</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.dataset?.getRows().
                                    map((rows: Array<string>, index: number) =>
                                        <TableRow key={`row-${index}`}>
                                            {
                                                rows.map((data: string, index: number) =>
                                                    <TableCell align="center" key={`cell-${index}`}>{data}</TableCell>
                                                )
                                            }
                                            {props.dataset?.action &&
                                                <>
                                                    <TableCell>
                                                        {props.dataset?.action.show &&
                                                            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                <Tooltip title={`View Details`}>
                                                                    <Button variant="text" onClick={() => showButton(index)}>
                                                                        <VisibilityIcon />
                                                                    </Button>
                                                                </Tooltip>
                                                            </ButtonGroup>
                                                        }

                                                        {
                                                            props.dataset?.action.edit &&
                                                            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                <Tooltip title={`Edit Details`}>
                                                                    <Button variant="text" onClick={() => editButton(index)}><EditIcon /></Button>
                                                                </Tooltip>
                                                            </ButtonGroup>
                                                        }

                                                        {
                                                            props.dataset?.action.delete &&
                                                            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                <Tooltip title={`Delete Details`}>
                                                                    <Button variant="text" onClick={() => deleteButton(index)}><DeleteForeverIcon /></Button>
                                                                </Tooltip>
                                                            </ButtonGroup>
                                                        }
                                                    </TableCell>
                                                </>
                                            }
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                        <TableFooter>
                            {/* <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                component="div"
                                count={props.dataset?.getRows().length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}