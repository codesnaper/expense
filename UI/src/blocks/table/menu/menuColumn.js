import { Button, FormControlLabel, Menu, MenuItem, TextField, Switch } from "@mui/material";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import React, { useEffect, useState } from "react";
export default function MenuColumn(props) {
    const [refresh, setRefresh] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColumn = (event, index) => {
        if (props.columns.filter(column => column.isVisible).length === 1 && !event.target.checked) {
            event.target.checked = true;
        } else {
            props.columns[index].isVisible = event.target.checked;
            setRefresh(true);
            props.refresh();
        }

    }

    return (
        <>
            <Button
                variant="text"
                aria-label="Column Filter Menu for Table"
                aria-controls={open ? 'menu-column' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ViewColumnIcon
                    size="large"
                ></ViewColumnIcon>
                Columns
            </Button>
            <Menu
                id="menu-column"
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
                {props.columns.map((column, index) => (
                    <MenuItem key={index}>
                        {`${column.display}`.toUpperCase() === 'HIDDEN' ? <></> : <><FormControlLabel control={<Switch onClick={(event) => handleColumn(event, index)} checked={column.isVisible} />} label={column.alias} /></>}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}