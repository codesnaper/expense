import { Button, FormControlLabel, Menu, MenuItem, TextField, Switch } from "@mui/material";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import React, { useEffect, useState } from "react";
import { Header } from "../../../modal/Header";

interface MenuColumnProps {
    // refresh: () => void,
    columns: Array<Header> | undefined,
    toggleHiddenColumn : (header: Header) => void;
}

export default function MenuColumn(props: MenuColumnProps) {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<Element>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColumn = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if(props.columns){
            props.columns[index].isVisible = event.target.checked;
            setRefresh(true);
            props.toggleHiddenColumn(props.columns[index]);
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
                {props.columns && props.columns.map((column, index) => (
                    <MenuItem key={index}>
                        {`${column.display}`.toUpperCase() === 'HIDDEN' ? <></> : <><FormControlLabel control={<Switch onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleColumn(event, index)} checked={column.isVisible} />} label={column.alias} /></>}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}