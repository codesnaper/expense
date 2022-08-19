import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, Grid, Select, Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { useContext } from "react";
import { AlertContext, ServiceContext, UserContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { AccountResponseItem } from "../../modal/Account";
import { BankModal } from "../../modal/bank";
import { AlertType, ExpenseAlertModal } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { Service } from "../../modal/Service";
import { User } from "../../modal/User";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface ModalAccountProps{
    openModal: boolean
    bank: BankModal | undefined,
    account: AccountResponseItem | undefined,
    operationType: OperationType,
    closeModalCallback: () => void;
    // addCallback: (data: AccountResponseItem) => void;
    // editCallback: (id: string, data: AccountResponseItem) => void;
    // bankUpdateCallback: (bank: BankModal) => void
}
export default function ModalAccount(props: ModalAccountProps) {
    const user = useContext(UserContext)
    const expenseAlertModal: ExpenseAlertModal = useContext(AlertContext);
    const service = useContext(ServiceContext);
    const { handleSubmit, handleChange, handleSelectChange, data, errors } = useFormValidation<AccountResponseItem>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: `Account Name is required`,
                },
                custom: {
                    isValid(value) {
                        return value && value.length > 3 ? true : false;
                    },
                    message: `At Least 3 characters required.`,
                },
            },
            accountNo: {
                required: {
                    value: true,
                    message: 'Account Number is required'
                },
                pattern:{
                    value: '(0-9)+',
                    message: 'Number should only be entered.'
                }
            },
        },
        initialValues: {
        },
        onSubmit: () => { addAccount() }
    });

    const addAccount = () => {
        // props.bank.accounts = Number(props.bank.accounts) + 1;
        // if (data.isInterest) {
        //     props.bank.debitAmount = Number(props.bank.debitAmount);
        // } else {
        //     props.bank.creditAmount = Number(props.bank.creditAmount) + Number(data.principal);
        // }
        // if (props.operationType === OperationType.ADD) {
        //     if(user && user.id){
        //         service.accountService?.addAccount(user.id, data)
        //         .then((account: AccountResponseItem) => {
        //             props.closeModalCallback();
        //             props.addCallback(data);
        //             props.bankUpdateCallback(props.bank);
        //         })
        //         .catch((err)=>{
        //             expenseAlertModal.setAlert?.('Unable to add Account', AlertType.ERROR);
        //             console.error(err);
        //         })
        //     } else{
        //         expenseAlertModal.setAlert?.('Illegal Operation perform.', AlertType.ERROR);
        //     }         
        // } else {
        //     service.accountService?.updateAccount(props.account.ID, props.bank.ID, data)
        //         .then(res => {
        //             // handleClose();
        //             // props.editCallback(props.bank.ID, res);
        //             expenseAlertModal.setAlert?.('Account Updated successfully', AlertType.SUCCESS);
        //         })
        //         .catch(err => {
        //             expenseAlertModal.setAlert?.('Failed to update account', AlertType.ERROR);
        //             console.error(err);
        //         });
        // }
    }

    const handleClose = () => { props.closeModalCallback() }

    return (
        <>
            <Dialog open={props.openModal} onClose={() => props.closeModalCallback()}>
                <DialogTitle>{props.operationType === OperationType.ADD ? 'Add New Account' : 'Edit Your Account'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Account Name"
                                    variant="standard"
                                    onChange={handleChange('name')}
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
                                    onChange={handleChange('accountNo')} />
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
                                    onChange={handleChange('principal')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                {/* <DateTimePicker
                                    label="Account Opening Date"
                                    // onChange={handleChange('openDate')}
                                    renderInput={(params) => <TextField {...params} />}
                                /> */}
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={handleSelectChange('isInterest')} checked={data.isInterest} />} label="Interest" />
                            </FormGroup>
                        </Grid>
                        {data.isInterest &&
                            <Grid item xs={12} sm={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch onChange={handleSelectChange("loanType")} checked={data.loanType} />} label="Loan Account" />
                                </FormGroup>
                            </Grid>
                        }
                        {(!data.loanType && data.isInterest) &&
                            <>
                                <Grid item xs={12}>
                                    <FormControl style={{ display: 'table' }}>
                                        <FormLabel component="legend">Interest Type</FormLabel>
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="Simple interest" />
                                            }
                                            checked={!data.compoundSaving}
                                            // onChange={handleChange('compoundSaving')}
                                            label="Simple Interest"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="Compound Interest" />
                                            }
                                            // onChange={handleSelectChange('compoundSaving')}
                                            label="Compound Interest"
                                            checked={data.compoundSaving}
                                        />
                                    </FormControl>
                                </Grid>
                            </>
                        }
                        {data.compoundSaving && <>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Compounding Year"
                                        variant="standard"
                                        type="number"
                                        defaultValue={data.compoundingYear}
                                        onChange={handleChange('compoundingYear')} />
                                </FormControl>
                            </Grid>
                        </>}
                        {(data.loanType || data.isInterest) && <>
                            <Grid item xs={12} sm={4}>
                                <FormControl margin="normal">
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Rate"
                                        variant="standard"
                                        type="number"
                                        defaultValue={data.rate}
                                        onChange={handleChange('rate')} />
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
                                        defaultValue={data.tenure}
                                        onChange={handleChange('tenure')} />
                                </FormControl></Grid></>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addAccount} >{props.operationType === OperationType.ADD ? 'Save' : 'Edit'}</Button>
                    <Button onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}