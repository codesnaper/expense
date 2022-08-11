import { Button, FormControlLabel, Menu, MenuItem, TextField, Switch, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ExportCSVMenuItem from "./exportCSVMenuItem";
import { useState } from "react";
export default function MenuExport(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <Tooltip role='tooltip' aria-describedby='Tooltip helper for Export menu' title='Export menu for table' arrow>
            <Button
                variant="text"
                aria-label="Export Menu for Table"
                aria-controls={open ? 'export-column' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <DownloadIcon
                    size="large"
                ></DownloadIcon>
                Export
            </Button>
            </Tooltip>
            <Menu
                id="export-column"
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
                <MenuItem key={1} id="export-1">
                    <ExportCSVMenuItem id= "export-1" columns = {props.columns} rows={props.rows}></ExportCSVMenuItem>
                </MenuItem>
            </Menu>
        </>
    );
}