import React, { useEffect, useState } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination, Tooltip } from "@mui/material";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import moment from "moment";
import { Link } from "react-router-dom";

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
export default function EmiList(props) {
    const [page, setPage] = React.useState(0);
    const [rows, setRow] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const totalMonth = window.parseInt(props.month);
        const row = rows;
        for (let inc = 0; inc < totalMonth; ++inc) {
            row.push({
                date: moment(props.openDate).add(inc, 'M').format('DD - MMM - YYYY'),
                amount: props.emi
            });
        }
        setRow(row);
    })
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell align="center">Emi Date</TableCell>
                        <TableCell align="center">Emi Amount</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * 4, page * 4 + 4)
                        .map((row, idx)  => (
                                <TableRow
                                    key={row.idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.amount}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title={`Paid full EMI`}>
                                            <Button variant="text"><Link underline="hover" color="inherit" to={`/`}>
                                                <CreditScoreIcon />
                                            </Link></Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[4]}
            component="div"
            count={rows.length}
            rowsPerPage={4}
            page={page}
            onPageChange={handleChangePage}
        />
    </>);
}