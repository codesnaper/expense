import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Header } from '../../../../modal/Header';
import { Operator } from '../../../../modal/TableDataSet';

export interface FilterMenuItemProps {
    operatorCallback: (value: Operator, index: number) => void;
    headerNameCallback: (value: string, index: number) => void;
    valueCallback: (value: string, index: number) => void;
    closeCallback: (index: number) => void
    index: number;
    columns: Array<Header> | undefined;
}
export default function FilterMenuItem(props: FilterMenuItemProps) {

    const [operator, setOperator] = useState<any>(0);

    const handleOperator = (event: SelectChangeEvent<any>) => {
        setOperator(event.target.value);
        props.operatorCallback(event.target.value, props.index)
    }

    const renderFormField = (props: FilterMenuItemProps) => {
        return (<>
            {props.columns &&
                <Typography component={'div'}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="header">Header</InputLabel>
                        <Select
                            size='small'
                            labelId="header-name-select"
                            id="header"
                            label="Header"
                            onChange={(event: SelectChangeEvent<any>) => { return props.headerNameCallback(event.target.value, props.index); }}
                        >
                            {props.columns.
                                map((column: Header, index: number) => <MenuItem key={`headername - ${index}`} value={column.alias}>{`${column.alias}`.toUpperCase()}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="operator">Operator</InputLabel>
                        <Select
                            size='small'
                            labelId="Operator-select"
                            id="operator"
                            value={operator}
                            label="Operator"
                            onChange={handleOperator}
                        >
                            <MenuItem selected value={Operator.CONTAINS}>Contains</MenuItem>
                            <MenuItem value={Operator.EQUAL}>Equals</MenuItem>
                            <MenuItem value={Operator.NOT_NULL}>Not Empty</MenuItem>
                            <MenuItem value={Operator.IS_EMPTY}>is Empty</MenuItem>
                        </Select>
                    </FormControl>
                    {(operator !== Operator.IS_EMPTY && operator !== Operator.NOT_NULL) &&
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <TextField size='small' id="value" label="Value" variant="standard" onChange={(event) => { props.valueCallback(event.target.value, props.index) }} />
                        </FormControl>
                    }
                </Typography>
            }
        </>)
    }

    return (<>
        <List>
            <ListItem disablePadding disableGutters>
                <ListItemIcon>
                    <Button variant="text" onClick={() => props.closeCallback(props.index)}><CloseIcon /></Button>
                </ListItemIcon>
                {renderFormField(props)}
            </ListItem>
        </List>

    </>)
}