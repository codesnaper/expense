import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import React from "react";
import useAlert from "../alert/alertHook";
export default function ModalBank(props) {
    const [loader, setLoader] = React.useState(false);

    const [currency, setCurrency] = React.useState(false);
    const [name, setName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [addLoader, setAddLoader] = React.useState(false);
    const handleClose = () => { props.closeModalCallback() }
    const handleChange = (event) => {
        setCurrency(event.target.value);
    }
    const { setAlert } = useAlert();
    const currencies = [
        'INR',
        'EURO',
        'DOLLAR',
        'PLN'
    ];
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleBankName = (e) => setName(e.target.value);
    const handleLocation = (e) => setLocation(e.target.value);
    const handleTag = (e) => setTag(e.target.value);

    const addBank = () => {
        const data = {
            name: name ? name : props.name,
            location: location ? location : props.location,
            currency: currency ? currency : props.currency,
            tags: tag ? tag : props.tag,
            userId: JSON.parse(sessionStorage.getItem('user')).username
        };
        if (props.type === 'add') {
            setAddLoader(true);
            fetch('http://localhost:3000/bank/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    setAddLoader(false);
                    handleClose();
                    props.addCallback(res);
                    setAlert(`${res.name} have been added successfully`, 'success')
                })
                .catch(err => {
                    setAlert(`Error while adding the ${data.name}. Message: ${err}`, 'error')
                })
        } else {
            setAddLoader(true);
            fetch(`http://localhost:3000/bank/${props.bank.ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'user-id': JSON.parse(sessionStorage.getItem('user')).username
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    setAddLoader(false);
                    handleClose();
                    props.editCallback(props.bank.ID, res);
                    setAlert(`${props.bank.name} have been updated successfully`, 'success')
                })
                .catch(err => setAlert(`Error while adding the ${props.bank.name}. Message: ${err}`, 'error'))
        }

    }

    return (
        <>
            <Dialog open={props.openModal} onClose={handleClose}>
                <DialogTitle>{props.type === 'add' ? 'Add New Expenses' : 'Edit Your Expenses'}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Expense Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Max Amount per Month"
                                    name="lastName"
                                    type={'number'}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                                <Select
                                    fullWidth={'false'}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button disabled={addLoader} onClick={addBank} >{props.type === 'add' ? 'Save' : 'Edit'}</Button>
                    {addLoader && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: blue[200],
                            }}
                        />
                    )}
                    <Button onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}