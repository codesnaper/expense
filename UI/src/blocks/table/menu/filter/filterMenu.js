import { Button, FormControlLabel, Menu, MenuItem, TextField, Switch, FormControl, InputLabel, Select } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterMenuItem from "./filterItem";
import React from "react";
export default function MenuFilter(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const operator = ['Contains', 'equals', 'not empty', 'is empty'];
    const [condition, setCondition] = React.useState('or')
    const [filterCondition, setFilterCondition] = React.useState([{ value: "", operator: 0, header: "" }]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCondition = (event) => setCondition(event.target.value);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddFilter = () => {
        setFilterCondition([...filterCondition, { value: "", operator: 0, header: "" }]);
    }

    const handleHeaderName = (headerName, index) => {
        filterCondition[index].header = headerName;
    }

    const handleOperator = (operator, index) => {
        filterCondition[index].operator = operator;
    }

    const handleValue = (value, index) => {
        filterCondition[index].value = value;
    }

    const handleCloseFilter = (index) => {
        setFilterCondition(filterCondition.filter((filter, idx) => idx !== index));
    }

    const handleFilter = () => {
        let result =[];
        filterCondition.forEach(filter => {
            switch (filter.operator) {
                case 0:
                    if (condition === 'or') {
                        result = [...result, Array.from(props.dataset).filter(data => data[filter.header].indexOf(filter.value) !== -1)];
                    } else {
                        result = result.filter(data => data[filter.header].indexOf(filter.value) !== -1);
                    }
            }
        })
        alert(JSON.stringify(result))

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
                    size="large"
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
                            keys={index}
                            index={index}
                            data={fCondition}
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