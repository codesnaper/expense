import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { Button, ButtonGroup, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useAlert from "../alert/alertHook";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: true,
        disablePadding: true,
        label: 'Bank Name',
    },
    {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: 'Bank Location',
    },
    {
        id: 'currency',
        numeric: true,
        disablePadding: false,
        label: 'Currency',
    },
    {
        id: 'tags',
        numeric: true,
        disablePadding: false,
        label: 'Tags',
    },
    {
        id: 'creditAmount',
        numeric: true,
        disablePadding: false,
        label: 'Total Credit Amount',
    },
    {
        id: 'debitAmount',
        numeric: true,
        disablePadding: false,
        label: 'Total Debit Amount',
    },
    {
        id: 'accounts',
        numeric: true,
        disablePadding: false,
        label: 'Total Accounts',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            {props.loading ?
                <>
                    <TableRow>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="div" key={'body1'} variant={'body1'}>
                                <Skeleton />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </> :
                <>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </>
            }

        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    const openModal = () => {
        props.openModalCallback();
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Bank Accounts
            </Typography>


            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {props.loading ? <Skeleton /> : <>{`Total Amount: 0`}</>}
            </Typography>

            {!props.loading && <>
                <Tooltip title="Add new Bank">
                    <Button onClick={openModal} variant="contained"><AddIcon /> Add</Button>
                </Tooltip>
            </>}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function BankView(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { setAlert } = useAlert();
    const deleteBank = function (id, bank) {
        if (bank.accounts !== 0) {
            setAlert(`Can't delete ${bank.name}. We found ${bank.accounts} account. Close the account first.`, 'error')
        } else {
            fetch(`http://localhost:3000/bank/${id}`, {
                method: "DELETE",
                headers: {
                    'user-id': JSON.parse(sessionStorage.getItem('user')).username
                }
            })
                .then(res => res.json())
                .then(res => {
                    props.deleteCallback(id);
                    setAlert(`${bank.name} has been deleted successfully!!`, 'success');
                }).catch(err => setAlert(`${bank.name} unable to delete dur to error ${err}!!`, 'error'));
        }

    }

    const editBank = function (bank) {
        props.editModalCallback(bank);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked && props.data) {
            const newSelected = props.data.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

    const openModal = () => { props.openModalCallback() }

    return (

        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar loading={props.loading} openModalCallback={() => openModal()} numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            loading={props.loading}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.data.length}
                        />
                        <TableBody>
                            {stableSort(props.data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.ID}
                                        >
                                            <TableCell align="center" >{row.name}</TableCell>
                                            <TableCell align="right">{row.location}</TableCell>
                                            <TableCell align="right">{row.currency}</TableCell>
                                            <TableCell align="right">{row.tags}</TableCell>
                                            <TableCell align="right"><span>{row.creditAmount}</span></TableCell>
                                            <TableCell align="right"><span>{row.debitAmount} </span></TableCell>
                                            <TableCell align="right"><span>{row.accounts}</span></TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                    <Tooltip title={`View Accounts for ${row.name}`}>
                                                        <Button variant="text"><Link underline="hover" color="inherit" to={`/account?bankId=${row.ID}`}>
                                                            <VisibilityIcon />
                                                        </Link></Button>
                                                    </Tooltip>
                                                    <Tooltip title={`Edit ${row.name} bank details.`}>
                                                        <Button onClick={() => editBank(row)} variant="text"><EditIcon /></Button>
                                                    </Tooltip>
                                                    <Tooltip title={`Delete ${row.name} bank details.`}>
                                                        <Button onClick={() => deleteBank(row.ID, row)} variant="text"><DeleteForeverIcon /></Button>
                                                    </Tooltip>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} >
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {props.loading && <>
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="div" key={'body1'} variant={'body1'}>
                                            <Skeleton />
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                            </>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
