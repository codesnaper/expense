import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import React from "react";
import useAlert from "../alert/alertHook";
export default function ModalBank(props) {
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
            userId: '13232'
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
                    'user-id': '13232'
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
                <DialogTitle>{props.type === 'add' ? 'Add New Bank' : 'Edit Your Bank'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            required
                            id="standard-required"
                            label="Bank Name"
                            variant="standard"
                            defaultValue={props.bank.name}
                            onChange={handleBankName}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            required
                            id="standard-required"
                            label="Bank Location"
                            variant="standard"
                            defaultValue={props.bank.location}
                            onChange={handleLocation} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange={handleChange}
                            value={props.bank.currency}
                        >
                            {currencies.map((currency, index) => (
                                <MenuItem key={index} value={currency}>{currency}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField
                            required
                            id="standard-required"
                            label="Tag"
                            variant="standard"
                            defaultValue={props.bank.tags}
                            onChange={handleTag}
                        />
                    </FormControl>
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