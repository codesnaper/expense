import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, CircularProgress, Collapse, FormControl, FormGroup, InputLabel, LinearProgress, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Slider, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Limit } from "../../modal/response/Limit";
import RuleIcon from '@mui/icons-material/Rule';
import { Box, Stack } from "@mui/system";
import { AlertContext, ServiceContext } from "../../context";
import { AlertType } from "../../modal/ExpenseAlert";
import { ApiError } from "../../modal/response/Error";
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from "@mui/material/colors";
interface LimitItemProps {
    limit: Limit;
    onEdit?: (limit: Limit) => void;
    onDelete?: (limit: Limit) => void;
}
export default function LimitItem(props: LimitItemProps) {

    const [open, setOpen] = useState(true);

    const [loader, setLoader] = useState<boolean>(false);

    const [editLock, setEditLock] = useState<boolean>(true);

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

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

    const editLimit = () => {
        setLoader(true);
        service.limitService?.updateLimit(props.limit)
            .then((res: Limit) => {
                props.onEdit?.(res);
                expenseAlert.setAlert?.('Limit has been updated successfully', AlertType.SUCCESS);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
                setEditLock(true);
            })
    }

    const deleteLimit = () => {
        setLoader(true);
        service.limitService?.deleteLimit(props.limit.id)
            .then(() => {
                props.onDelete?.(props.limit);
                expenseAlert.setAlert?.('Limit has been deleted successfully', AlertType.SUCCESS);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
            })
    }

    return (<>
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <LinearProgress color='error' variant="buffer" value={100} valueBuffer={70} />
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <RuleIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.limit.name} secondary={props.limit.description} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box component={Paper} variant="elevation" sx={{ padding: '24px' }}>
                        <FormGroup row={true} sx={{ marginBottom: '24px' }}>
                            <FormControl sx={{ m: 1, minWidth: '15vw' }}>
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
                            <FormControl sx={{ m: 1, minWidth: '15vw' }}>
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
                            <FormControl sx={{ m: 1, minWidth: '15vw' }}>
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
                            <FormControl sx={{ m: 1, minWidth: '15vw' }}>
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
                        </FormGroup>
                        <FormGroup row={true} sx={{ marginBottom: '24px', marginLeft: '12px' }}>
                            <FormControl sx={{ marginRight: '24px' }}>
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
                            />
                        </Stack>
                        <CardActionArea>
                            <Stack direction={"row"} spacing={4}>
                                {
                                    !editLock &&
                                    <>
                                        <Button variant="outlined" startIcon={<EditIcon />} disabled={loader} onClick={editLimit}>
                                            {
                                                loader && <>
                                                    <CircularProgress
                                                        size={24}
                                                        sx={{
                                                            color: blue[200],
                                                        }}
                                                    />
                                                </>
                                            }
                                            Save
                                        </Button>
                                    </>
                                }
                                {
                                    editLock &&
                                    <>
                                        <Button variant="outlined" startIcon={<LockOpenIcon />} onClick={() => setEditLock(false)}>
                                            Edit
                                        </Button>
                                    </>
                                }
                                <Button variant="outlined" startIcon={<DeleteIcon />} disabled={loader} onClick={deleteLimit}>
                                    {
                                        loader && <>
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    color: blue[200],
                                                }}
                                            />
                                        </>
                                    }
                                    Delete
                                </Button>
                            </Stack>
                        </CardActionArea>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    </>);


}