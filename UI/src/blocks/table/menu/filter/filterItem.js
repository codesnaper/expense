import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, InputLabel, ListItem, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
export default function FilterMenuItem(props) {

    const [operator, setOperator] = useState(0);

    const handleOperator = (event) => {
        setOperator(event.target.value);
        props.operatorCallback(event.target.value, props.index)
    }

    const renderFormField = (props) => {
        return (<>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Header</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Header"
                    onChange={(event) => { props.headerNameCallback(event.target.value, props.index) }}
                >
                    {props.columns.
                        filter(column => `${column.display}`.toUpperCase() !== 'HIDDEN' && column.isVisible).
                        map(column => <MenuItem value={column.mapName}>{`${column.alias}`.toUpperCase()}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Operator</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={operator}
                    label="Operator"
                    onChange={handleOperator}
                >
                    <MenuItem value={0}>Contains</MenuItem>
                    <MenuItem value={1}>Equals</MenuItem>
                    <MenuItem value={2}>Not Empty</MenuItem>
                    <MenuItem value={3}>is Empty</MenuItem>
                </Select>
            </FormControl>
            {(operator !== 2 && operator !== 3) &&
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <TextField id="standard-basic" label="Value" variant="standard" onChange={(event) => { props.valueCallback(event.target.value, props.index) }} />
                </FormControl>
            }
        </>)
    }

    return (<>
        <MenuItem>
            <ListItem disablePadding>
                <ListItemIcon>
                    <Button variant="text" onClick={() => props.closeCallback(props.index)}><CloseIcon /></Button>
                </ListItemIcon>
                {renderFormField(props)}
            </ListItem>
        </MenuItem>
    </>)
}