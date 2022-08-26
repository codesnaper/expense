import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, Grid, Select, Switch, TextField, Divider, Typography, RadioGroup, Radio, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { useContext, useState } from "react";
import { AlertContext, LocalizationContext, ServiceContext, UserContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { AccountResponseItem } from "../../modal/Account";
import { BankModal } from "../../modal/bank";
import { AlertType, ExpenseAlertModal } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from "@mui/system";
import { blue, red } from "@mui/material/colors";

interface ModalAccountProps {
    openModal: boolean
    bank: BankModal | undefined,
    account: AccountResponseItem | undefined,
    operationType: OperationType,
    closeModalCallback: () => void;
    // addCallback: (formData: AccountResponseItem) => void;
    // editCallback: (id: string, formData: AccountResponseItem) => void;
    // bankUpdateCallback: (bank: BankModal) => void
}
export default function ModalAccount(props: ModalAccountProps) {
    const user = useContext(UserContext)
    const expenseAlertModal: ExpenseAlertModal = useContext(AlertContext);
    const service = useContext(ServiceContext);
    const localization = useContext(LocalizationContext)
    const expenseAlert = useContext(AlertContext);
    const [loader, setLoader] = useState<boolean>(false);
    const { handleSubmit, handleChange, setValue, data: formData, errors } = useFormValidation<AccountResponseItem>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: `Account Name is required`,
                },

            },
            accountNo: {
                required: {
                    value: true,
                    message: 'Account Number is required'
                },
            },
            openDate: {
                required: {
                    value: true,
                    message: 'Select the account opening date'
                },
            },
            compoundingYear: {
                custom: {
                    isValid(value) {
                        if ((!value || value === undefined) && formData.compoundSaving && formData.loanType) {
                            return false;
                        }
                        return true;
                    },
                    message: 'Compounding Year is required.'
                }
            },
            rate: {
                custom: {
                    isValid(value) {
                        if ((!value || value === undefined) && formData.isInterest) {
                            return false;
                        }
                        return true;
                    },
                    message: 'Rate is required.'
                }
            },
            tenure: {
                custom: {
                    isValid(value) {
                        if ((!value || value === undefined) && formData.isInterest) {
                            return false;
                        }
                        return true;
                    },
                    message: 'Tenure is required.'
                }
            }
        },
        initialValues: {
            
        },
        onSubmit: () => { addAccount() }
    });

    const addAccount = () => {
        if (props.bank) {
            setLoader(true);
            if (formData.isInterest) {
                props.bank.debitAmount = Number(props.bank.debitAmount) + + Number(formData.principal);
            } else {
                props.bank.creditAmount = Number(props.bank.creditAmount) + Number(formData.principal);
            }
            if (props.operationType === OperationType.ADD) {
                if (user.id) {
                    formData.BANKID = props.bank.ID;
                    service.accountService?.addAccount(user.id, {account: formData, bank: props.bank})
                        .then((account: AccountResponseItem) => {
                            setLoader(false);
                            expenseAlert.setAlert?.(`New Account added successfully`, AlertType.SUCCESS);
                            props.closeModalCallback();
                            // props.addCallback(formData);
                            //             props.bankUpdateCallback(props.bank);
                            
                        })
                        .catch(err => {
                            setLoader(false);
                            expenseAlert.setAlert?.(`Failed to add account`, AlertType.ERROR);
                            console.error(err);
                        })
                }
            }
            setLoader(false);
        }

        // props.bank.accounts = Number(props.bank.accounts) + 1;
        // if (formData.isInterest) {
        //     props.bank.debitAmount = Number(props.bank.debitAmount);
        // } else {
        //     props.bank.creditAmount = Number(props.bank.creditAmount) + Number(formData.principal);
        // }
        // if (props.operationType === OperationType.ADD) {
        //     if(user && user.id){
        //         service.accountService?.addAccount(user.id, formData)
        //         .then((account: AccountResponseItem) => {
        //             props.closeModalCallback();
        //             props.addCallback(formData);
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
        //     service.accountService?.updateAccount(props.account.ID, props.bank.ID, formData)
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
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <DialogTitle>{props.operationType === OperationType.ADD ? `Tag new Account for ${props.bank?.name} bank` : 'Edit Your Account'}</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        required
                                        id="name"
                                        label="Account Name"
                                        variant="standard"
                                        onChange={handleChange('name')}
                                        error={errors.name ? true : false}
                                        helperText={errors.name}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        required
                                        id="accountNo"
                                        type={'number'}
                                        label="Account Number"
                                        variant="standard"
                                        error={errors.accountNo ? true : false}
                                        helperText={errors.accountNo}
                                        onChange={handleChange('accountNo')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl margin="normal">
                                    <TextField
                                        required
                                        id="principal"
                                        type={'number'}
                                        label="Amount"
                                        variant="standard"
                                        defaultValue={0}
                                        onChange={handleChange('principal')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl error={errors.openDate ? true : false} margin="normal">
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            label="Account Opening Date"
                                            value={null}
                                            onChange={(newValue) => {
                                                setValue('openDate', newValue)
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                    {errors.openDate &&
                                        <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{errors.openDate}</Typography>
                                    }
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch onChange={(event) => setValue('isInterest', event.target.checked)}  />} label="Interest" />
                                </FormGroup>
                            </Grid>
                            {formData.isInterest &&
                                <Grid item xs={12} sm={6}>
                                    <FormGroup>
                                        <FormControlLabel control={<Switch onChange={(event) => setValue('loanType', event.target.checked)} />} label="Loan Account" />
                                    </FormGroup>
                                </Grid>
                            }
                            {(!formData.loanType && formData.isInterest) &&
                                <>
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel id="interestType-radio-group">Saving Interest Type</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="interestType-radio-group"
                                                name="interestType-radio-buttons-group"
                                                value={formData.compoundSaving ? 'true' : 'false'}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setValue('compoundSaving', (event.target as HTMLInputElement).value === 'true' ? true : false) }}
                                            >
                                                <FormControlLabel value="true" control={<Radio />} label="Compounding Interest" />
                                                <FormControlLabel value="false" control={<Radio />} label="Simple Interest" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </>
                            }
                            {formData.compoundSaving && <>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            required
                                            error={errors.compoundingYear ? true : false}
                                            helperText={errors.compoundingYear}
                                            id="compoundingYear"
                                            label="Compounding Year"
                                            variant="standard"
                                            type="number"
                                            defaultValue={formData.compoundingYear}
                                            onChange={handleChange('compoundingYear')} />
                                    </FormControl>
                                </Grid>
                            </>}
                            {(formData.loanType || formData.isInterest) && <>
                                <Grid item xs={12} sm={4}>
                                    <FormControl margin="normal">
                                        <TextField
                                            error={errors.rate ? true : false}
                                            helperText={errors.rate}
                                            required
                                            id="rate"
                                            label="Rate"
                                            variant="standard"
                                            type="number"
                                            defaultValue={formData.rate}
                                            onChange={handleChange('rate')} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl margin="normal">
                                        <TextField
                                            error={errors.tenure ? true : false}
                                            helperText={errors.tenure}
                                            required
                                            type={'number'}
                                            id="tenure"
                                            label="Tenure (Year)"
                                            variant="standard"
                                            defaultValue={formData.tenure}
                                            onChange={handleChange('tenure')} />
                                    </FormControl></Grid></>
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" disabled={loader}>{props.operationType === OperationType.ADD ?
                            localization.getString?.('Bank.modal.form.primarySaveCTA', localization.getLanguage?.())
                            :
                            localization.getString?.('Bank.modal.form.primaryEditCTA', localization.getLanguage?.())
                        }
                        </Button>
                        {loader && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: blue[200],
                                }}
                            />
                        )}
                        <Button onClick={handleClose}>cancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </>
    )
}