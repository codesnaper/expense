import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, Collapse, FormControl, FormGroup, InputLabel, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Slider, TextField } from "@mui/material";
import { useState } from "react";
import { Limit } from "../../modal/response/Limit";
import RuleIcon from '@mui/icons-material/Rule';
import { Box, Stack } from "@mui/system";
interface LimitItemProps {
    limit: Limit;
}
export default function LimitItem(props: LimitItemProps) {

    const [open, setOpen] = useState(true);

    const marks = [
        {
            value: 0,
            label: '0% Amount',
        },
        {
            value: 100,
            label: '100% Amount',
        },
    ];

    function valuetext(value: number) {
        return `${value}% Amount`;
    }

    const handleClick = () => {
        setOpen(!open);
    };

    return (<>
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <RuleIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.limit.name} secondary={props.limit.description} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box component={Paper} variant="elevation" sx={{ padding: '24px' }}>
                        <FormGroup row={true}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="account">Account</InputLabel>
                                <Select
                                    labelId="account"
                                    id="account-select"
                                    label="Account"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category-select"
                                    label="Category"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="recursive">Recursively</InputLabel>
                                <Select
                                    labelId="recursive"
                                    id="recursive-select"
                                    label="Recursively"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="priority">Priority</InputLabel>
                                <Select
                                    labelId="priority"
                                    id="priority-select"
                                    label="Priority"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="outlined-number"
                                    label="Min Amount"
                                    type="number"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    variant="standard"
                                    id="outlined-number"
                                    label="Max Amount"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </FormGroup>

                        <Stack spacing={2} direction="row" sx={{ margin: '12px' }} alignItems="center">

                            <Slider
                                track={false}
                                aria-labelledby="track-false-range-slider"
                                getAriaValueText={valuetext}
                                defaultValue={[20, 37, 50]}
                                marks={marks}
                                disabled={true}
                            />
                        </Stack>
                        <CardActionArea>
                            <Button variant="outlined">Edit</Button>
                        </CardActionArea>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    </>);


}