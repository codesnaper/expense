import { Button, FormControlLabel, Menu, MenuItem, TextField, Switch, FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterMenuItem from "./FilterItem";
import React, { SetStateAction } from "react";
import { Header } from "../../../../modal/Header";
import { Operator } from "../../../../modal/TableDataSet";

interface MenuFilterProps{
    columns: Array<Header> | undefined,
    handleFilter: (column: string, operator: Operator, value: string ) => void
}

export default function MenuFilter(props: MenuFilterProps) {

    const [anchorEl, setAnchorEl] = React.useState<Element| null>(null);
    const open = Boolean(anchorEl);
    const [condition, setCondition] = React.useState<string>('or')
    const [filterCondition, setFilterCondition] = React.useState([{ value: "", operator: Operator.CONTAINS, header: "" }]);
    const handleClick = (event: React.MouseEvent<Element>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCondition = (event: SelectChangeEvent<string> ) => setCondition(event.target.value);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddFilter = () => {
        setFilterCondition([...filterCondition, { value: "", operator: Operator.CONTAINS, header: "" }]);
    }

    const handleHeaderName = (headerName: string, index: number) => {
        filterCondition[index].header = headerName;
    }

    const handleOperator = (operator: Operator, index: number) => {
        filterCondition[index].operator = operator;
    }

    const handleValue = (value: string, index: number) => {
        filterCondition[index].value = value;
    }

    const handleCloseFilter = (index: number) => {
        setFilterCondition(filterCondition.filter((filter, idx) => idx !== index));
    }

    const handleFilter = () => {
        filterCondition.forEach(fCondition => {
            props.handleFilter(fCondition.header, fCondition.operator, fCondition.value);
        })
    }

    return (
        <>
            <Button
                variant="text"
                aria-label="Filter Menu for Table"
                aria-controls={open ? 'menu-filter' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FilterListIcon
                ></FilterListIcon>
                Filter
            </Button>
            <Menu
                id="menu-filter"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {filterCondition.map(
                    (fCondition, index) =>
                        <FilterMenuItem
                            key={index}
                            index={index}
                            // data={fCondition}
                            columns={props.columns}
                            headerNameCallback={handleHeaderName}
                            operatorCallback={handleOperator}
                            valueCallback={handleValue}
                            closeCallback={handleCloseFilter}
                        ></FilterMenuItem>
                )}
                {(props.columns && props.columns.length > 0) &&
                    <MenuItem key={'menu-item'}>
                        <Button variant="text" onClick={handleAddFilter}>Apply Filter</Button>
                        <Button variant="text" onClick={handleFilter}>Add Filter</Button>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Condition</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={condition}
                                label="Operator"
                                onChange={handleCondition}
                            >
                                <MenuItem value={'or'}>OR</MenuItem>
                                <MenuItem value={'and'}>AND</MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                }
            </Menu>
        </>
    );
}