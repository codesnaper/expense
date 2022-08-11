import { TableBody, Tooltip, ButtonGroup, TableCell, TableHead, TableContainer, Paper, Table, TableRow, TablePagination, Toolbar, Typography, FormControl, InputLabel, Input, InputAdornment, Button, Checkbox, Chip } from "@mui/material";
import React from "react";
import MenuColumn from "./menu/menuColumn";
import MenuExport from "./menu/export/exportMenu";
import SearchIcon from '@mui/icons-material/Search';
import MenuFilter from "./menu/filter/filterMenu";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from "moment";
export default class ExpenseTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 5,
            page: 0,
            filterRows: [],
            rowsDisplay: [...this.props.dataset.keys()],
            id: 0,
            refresh: false,
        };

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.dataset && nextProps.dataset.length !== 0) {
            nextState.filterRows = nextProps.dataset;
            return true;
        }
        return false;
    }

    setId(id) {
        this.setState({ id: id })
    }

    setRefresh() {
        this.setState({ refresh: true })
    }

    setRowsPerPage(rowsPerPage) {
        this.setState({ rowsPerPage: rowsPerPage });
    }

    setRowsDisplayed(rowsDisplay) {
        this.setState({ rowsDisplay: rowsDisplay })
    }

    setPage(page) {
        this.setState({ page: page })
    }

    setFilterRows(filterRows) {
        this.setState({ filterRows: filterRows })
    }

    componentDidMount() {
        this.setFilterRows(Array.from(this.props.dataset));
    }

    handleChangePage(event, newPage) {
        this.setRowsPerPage(parseInt(event.target.value, 10));
        this.setPage(0);
    }

    handleChangeRowsPerPage(event) {
        this.setRowsPerPage(parseInt(event.target.value, 10));
        this.setPage(0);
    }

    handleSelectedColumn(selectedColumn, _self) {
        // _self.setSelectedColumns(selectedColumn);
        let arr = [];
        selectedColumn.forEach(col => {
            arr.push(_self.props.columns.indexOf(col));
        });
        _self.setRowsDisplayed(arr);
    }

    handleView(idx, row, _self) {
        _self.props.viewCallback(idx, row);
    }

    showButton(row, _self) {
        _self.props.showActionCallback(row);
    }

    editButton(row, _self) {
        _self.props.editActionCallback(row);
    }

    deleteButton(row, _self) {
        _self.props.deleteActionCallback(row);
    }

    renderSearch() {
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

    render() {
        return (
            <>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    {React.Children.map(this.props.children, (element, idx) => {
                        return <>
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                {element}
                            </Typography>
                        </>
                    })}
                </Toolbar>
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
                            <MenuColumn columns={this.props.headers} refresh={() => { this.setRefresh() }} ></MenuColumn>
                            <MenuFilter columns={this.props.headers} dataset={this.props.dataset} filterData={this.state.filterRows} refresh={() => { this.setRefresh() }}></MenuFilter>
                            <MenuExport columns={this.props.headers} rows={this.state.filterRows} heading='Accounts'></MenuExport>
                        </Typography>

                        <Typography
                            sx={{ flex: '1 1 100%', flex: 'initial' }}
                            variant="body"
                            id="tableTitle"
                            component="div"
                        >
                            {this.renderSearch()}

                        </Typography>
                        <Typography
                            sx={{ flex: '1 1 100%', flex: 'initial' }}
                            variant="body"
                            id="tableTitle"
                            component="div"
                        >
                            {this.props.addAction && <Button sx={{ marginLeft: '24px' }} onClick={() => this.props.addActionCallback()} variant="contained">Add</Button>}
                        </Typography>

                    </Toolbar>
                    <TableContainer component={Paper}>
                        <Table size="small" stickyHeader aria-label="simple table">
                            <TableHead>
                                {
                                    this.props.headers.
                                        filter(header => `${header.display}`.toUpperCase() !== 'HIDDEN' && header.isVisible).
                                        map(
                                            (header, idx) => <TableCell key={idx} align="center" >{header.alias}</TableCell>
                                        )
                                }
                                {this.props.action && <TableCell key={'action'} align="center">Action</TableCell>}
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.dataset &&
                                    this.state.filterRows.
                                        slice(this.state.page * this.state.rowsPerPage,
                                            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).
                                        map((data, index) => {
                                            return <>
                                                <TableRow>
                                                    {
                                                        this.props.headers.
                                                            filter(header => `${header.display}`.toUpperCase() !== 'HIDDEN' && header.isVisible).
                                                            map((header, idx) => {
                                                                if (data[header.mapName] !== null) {
                                                                    if (header.type && `${header.type}`.toUpperCase() === 'BOOLEAN') {
                                                                        return <>
                                                                            <TableCell key={`${index}-${idx}`} align="center">
                                                                                <Checkbox disabled checked={data[header.mapName]}></Checkbox>
                                                                            </TableCell>
                                                                        </>
                                                                    } else if (`${header.type}`.toUpperCase() === 'DATE') {
                                                                        return <>
                                                                            <TableCell key={`${index}-${idx}`} align="center">
                                                                                {moment(data[header.mapName]).format('dd, DD-MMM-YYYY')}
                                                                            </TableCell>
                                                                        </>
                                                                    } else if (`${header.type}`.toUpperCase() === 'TAG') {
                                                                        return <>
                                                                            <TableCell key={`${index}-${idx}`} align="center">
                                                                                {data[header.mapName].split(',').map(tag=>{
                                                                                    return <>
                                                                                      <Chip sx={{marginRight: '5px'}} label={`${tag}`.toUpperCase()} color="primary" />
                                                                                    </>
                                                                                })}
                                                                            </TableCell>
                                                                        </>
                                                                    } else {
                                                                        return <>
                                                                            <TableCell key={`${index}-${idx}`} align="center">{data[header.mapName]}
                                                                            </TableCell>
                                                                        </>
                                                                    }
                                                                }
                                                                return <></>
                                                            })
                                                    }
                                                    {
                                                        this.props.action &&
                                                        <TableCell align="center">
                                                            {this.props.showAction &&
                                                                <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                    <Tooltip title={`View Details`}>
                                                                        <Button variant="text" onClick={(() => this.showButton(data, this))}>
                                                                            <VisibilityIcon />
                                                                        </Button>
                                                                    </Tooltip>
                                                                </ButtonGroup>
                                                            }

                                                            {
                                                                this.props.editAction &&
                                                                <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                    <Tooltip title={`Edit Details`}>
                                                                        <Button variant="text" onClick={(() => this.editButton(data, this))}><EditIcon /></Button>
                                                                    </Tooltip>
                                                                </ButtonGroup>
                                                            }

                                                            {
                                                                this.props.deleteAction &&
                                                                <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                    <Tooltip title={`Delete Details`}>
                                                                        <Button variant="text" onClick={(() => this.deleteButton(data, this))}><DeleteForeverIcon /></Button>
                                                                    </Tooltip>
                                                                </ButtonGroup>
                                                            }
                                                        </TableCell>
                                                    }
                                                </TableRow>
                                            </>
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={this.state.filterRows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </>
        );
    }
}
