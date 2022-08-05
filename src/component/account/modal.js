import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, Grid, Select, Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from "react";
export default function AccountModal(props) {
    const [name, setName] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [principal, setPrincipal] = React.useState('');
    const [rate, setRate] = React.useState('');
    const [tenure, setTenure] = React.useState('');
    const [loanType, setLoanType] = React.useState(false);
    const [isInterest, setIsInterest] = React.useState(false);
    const [isCompoundSaving, setIsCompoundSaving] = React.useState(false);
    const [compoundingYear, setCompoundingYear] = React.useState(0);
    const [value, setValue] = React.useState(null);
    const handleClose = () => { props.closeModalCallback() }
    const handleAccountName = (e) => setName(e.target.value);
    const handleTenure = (e) => setTenure(e.target.value);
    const handleAccountNumber = (e) => setAccountNumber(e.target.value);
    const handleAccountPrincipal = (e) => setPrincipal(e.target.value);
    const handleRate = (e) => setRate(e.target.value);
    const handleLoanType = (e) => setLoanType(e.target.checked);
    const handleInterestType = (e) => setIsInterest(e.target.checked);
    const handleSavingInterest = (e) => setIsCompoundSaving(false);
    const handleCompoundSavingInterest = (e) => setIsCompoundSaving(true);
    const handleCompoundingYear = (e) => setCompoundingYear(e.target.value);

    const addAccount = () => {
        const data = {
            name: name ? name : props.account.name,
            accountNo: accountNumber ? accountNumber : props.account.accountNo,
            principal: principal ? principal : props.account.principal,
            rate: rate ? rate : props.account.rate,
            tenure: tenure ? tenure : props.account.tenure,
            bankId: props.account.bankId,
            loanType: loanType ? loanType : props.account.loanType,
            interest: isInterest ? isInterest : props.account.isInterest,
            compoundSaving: isCompoundSaving ? isCompoundSaving : props.account.compoundSaving,
            compoundingYear: compoundingYear ? compoundingYear : props.account.compoundingYear,
            bank: {
                ID: props.bank.ID,
                accounts: parseInt(props.bank.accounts) + 1
            },
            openDate: value? value: props.account.openDate
        };
        if (isInterest) {
            data.bank.debitAmount = parseFloat(props.bank.debitAmount);
        } else {
            data.bank.creditAmount = parseFloat(props.bank.creditAmount) + parseFloat(data.principal);
        }
        if (props.type === 'add') {
            fetch('http://localhost:3000/account/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'user-id': '13232',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    handleClose();
                    props.addCallback(res);
                    props.bankModalCallback(res.bank)
                })
                .catch(err => console.error(err))
        } else {
            fetch(`http://localhost:3000/account/${props.account.ID}/${props.account.bankId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    handleClose();
                    props.editCallback(props.bank.ID, res);
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <>
            <Dialog open={props.openModal} onClose={handleClose}>
                <DialogTitle>{props.type === 'add' ? 'Add New Account' : 'Edit Your Account'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Account Name"
                                    variant="standard"
                                    defaultValue={props.account.name}
                                    onChange={handleAccountName}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Account Number"
                                    variant="standard"
                                    defaultValue={props.account.accountNo}
                                    onChange={handleAccountNumber} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl margin="normal">
                                <TextField
                                    required
                                    id="standard-required"
                                    type={'number'}
                                    label="Amount"
                                    variant="standard"
                                    defaultValue={props.account.principal}
                                    onChange={handleAccountPrincipal} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    label="Account Opening Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={handleInterestType} checked={props.account.loanAccount} />} label="Interest" />
                            </FormGroup>
                        </Grid>
                        {isInterest &&
                            <Grid item xs={12} sm={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch onChange={handleLoanType} checked={props.account.loanAccount} />} label="Loan Account" />
                                </FormGroup>
                            </Grid>
                        }
                        {(!loanType && isInterest) &&
                            <>
                                <Grid item xs={12}>
                                    <FormControl style={{ display: 'table' }}>
                                        <FormLabel component="legend">Interest Type</FormLabel>
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="Simple interest" />
                                            }
                                            checked={!isCompoundSaving}
                                            onChange={handleSavingInterest}
                                            label="Simple Interest"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="Compound Interest" />
                                            }
                                            onChange={handleCompoundSavingInterest}
                                            label="Compound Interest"
                                            checked={isCompoundSaving}
                                        />
                                    </FormControl>
                                </Grid>
                            </>
                        }
                        {isCompoundSaving && <>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Compounding Year"
                                        variant="standard"
                                        type="number"
                                        defaultValue={props.account.compoundingYear}
                                        onChange={handleCompoundingYear} />
                                </FormControl>
                            </Grid>
                        </>}
                        {(loanType || isInterest) && <>
                            <Grid item xs={12} sm={4}>
                                <FormControl margin="normal">
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Rate"
                                        variant="standard"
                                        type="number"
                                        defaultValue={props.account.rate}
                                        onChange={handleRate} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl margin="normal">
                                    <TextField
                                        required
                                        type={'number'}
                                        id="standard-required"
                                        label="Tenure (Year)"
                                        variant="standard"
                                        defaultValue={props.account.tenure}
                                        onChange={handleTenure} />
                                </FormControl></Grid></>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addAccount} >{props.type === 'add' ? 'Save' : 'Edit'}</Button>
                    <Button onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}