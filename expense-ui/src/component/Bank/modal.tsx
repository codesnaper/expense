import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, PaperProps, Select, SelectChangeEvent, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext, UserContext } from '../../context'
import { useFormValidation } from "../../hooks/FormValidation";
import { BankModal } from "../../modal/bank";
import { AlertType } from "../../modal/ExpenseAlert";
import Draggable from 'react-draggable';
import { OperationType } from "../../modal/OperationType";

interface ModalBankProps {
    operationType: OperationType;
    bank: BankModal | undefined;
    openModal: boolean;
    closeModalCallback: () => void;
    addCallback: (data: BankModal) => void;
    editCallback: (id: string, data: BankModal) => void;
}

function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }


export default function ModalBank(props: ModalBankProps) {
    const alert = useContext(AlertContext);
    const service = useContext(ServiceContext);
    const user = useContext(UserContext);
    const [addLoader, setAddLoader] = React.useState(true);
    const handleClose = () => { props.closeModalCallback() }
    useEffect(() => {
        setAddLoader(false);
    }, [service]);

    useEffect(() => {
        if (props.bank) {
            data.name = props.bank.name;
            data.location = props.bank.location;
            data.currency = props.bank.currency;
            data.tags = props.bank.tags;
        }
    }, [props.bank])

    const currencies = [
        'INR',
        'EURO',
        'DOLLAR',
        'PLN'
    ];

    const { handleSubmit, handleChange, handleSelectChange, data, errors } = useFormValidation<BankModal>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: `Bank Name is required`,
                },
                custom: {
                    isValid(value) {
                        return value && value.length > 3 ? true : false;
                    },
                    message: `At Least 3 characters required.`,
                },
            },
            location: {
                required: {
                    value: true,
                    message: `Bank Location is required`,
                },
            },
        },
        initialValues: {
        },
        onSubmit: () => { addBank() }
    });

    const addBank = () => {
        if (props.operationType === OperationType.ADD) {
            setAddLoader(true);
            data.USERID = user.id ? user.id: '';
            service.bankService?.addBank(data)
                .then(res => {
                    setAddLoader(false);
                    handleClose();
                    props.addCallback(res);
                    alert.setAlert?.(`${res.name} have been added successfully`, AlertType.SUCCESS)
                })
                .catch(err => {
                    alert.setAlert?.(`Error while adding the ${data.name}. Message: ${err}`, AlertType.ERROR)
                })
        } else {
            setAddLoader(true);
            if (props.bank) {
                const id = props.bank.ID;
                service.bankService?.updateBank(data, id, user.id)
                    .then(res => {
                        setAddLoader(false);
                        handleClose();
                        props.editCallback(id, res);
                        alert.setAlert?.(`${props.bank?.name} have been updated successfully`, AlertType.SUCCESS)
                    })
                    .catch(err => alert.setAlert?.(`Error while adding the ${props.bank?.name}. Message: ${err}`, AlertType.ERROR))
            }
        }
    }

    return (
        <>
            <Dialog PaperComponent={PaperComponent} open={props.openModal} aria-labelledby="draggable-dialog-title" onClose={handleClose}>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <DialogTitle className="grabbable"
                     id="draggable-dialog-title">{props.operationType === OperationType.ADD ? 'Add New Bank' : 'Edit Your Bank'}</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="standard-required"
                                error={errors.name ? true : false}
                                helperText={errors.name}
                                defaultValue={props.bank?.name}
                                label="Bank Name"
                                variant="standard"
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="standard-required"
                                label="Bank Location"
                                variant="standard"
                                error={errors.location ? true : false}
                                defaultValue={props.bank?.location}
                                helperText={errors.location}
                                onChange={handleChange('location')} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                defaultValue={props.bank?.currency}
                                onChange={handleSelectChange('currency')}
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
                                defaultValue={props.bank?.tags}
                                variant="standard"
                                onChange={handleChange('tags')}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" disabled={addLoader}>{props.operationType === OperationType.ADD ? 'Save' : 'Edit'}</Button>
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
                </Box>
            </Dialog>

        </>
    )
}