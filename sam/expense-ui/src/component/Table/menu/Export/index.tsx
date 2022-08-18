import { Button, FormControlLabel, Menu, MenuItem, TextField, Switch, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ExportCSVMenuItem from "./ExportCSV";
import { useState } from "react";
import { Header } from "../../../../modal/Header";

export interface MenuExportProps{
    columns: Header[],
    rows: string[][],
    heading: string,
}

export default function MenuExport(props: MenuExportProps) {

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<Element>) => {
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
                    <ExportCSVMenuItem heading={props.heading} id= "export-1" columns = {props.columns} rows={props.rows}></ExportCSVMenuItem>
                </MenuItem>
            </Menu>
        </>
    );
}