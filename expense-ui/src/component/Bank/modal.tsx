import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, PaperProps, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext, LocalizationContext, ServiceContext, UserContext } from '../../context'
import { useFormValidation } from "../../hooks/FormValidation";
import { BankModal } from "../../modal/bank";
import { AlertType } from "../../modal/ExpenseAlert";
import Draggable from 'react-draggable';
import { OperationType } from "../../modal/OperationType";
import TagSelect from "../Tag/TagSelect";
import { Tag } from "../../modal/Tag";

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
    const expenseAlert = useContext(AlertContext);
    const service = useContext(ServiceContext);
    const user = useContext(UserContext);
    const localization = useContext(LocalizationContext)
    const [addLoader, setAddLoader] = React.useState(true);
    const handleClose = () => { props.closeModalCallback() }
    useEffect(() => {
        setAddLoader(false);
    }, [service]);
    const [errorTag, setErrorTags] = useState<boolean>(false);

    useEffect(() => {
        if (props.bank) {
            data.name = props.bank.name;
            data.location = props.bank.location;
            data.currency = props.bank.currency;
            // data.tags = props.bank.tags;
        }
    }, [props.bank])

    const currencies = [
        { name: 'INR', value: 'INR' },
        { name: 'EURO', value: 'EURO' },
        { name: 'USD', value: 'USD' },
        { name: 'PLN', value: 'PLN' }
    ];

    const { handleSubmit, handleChange, handleSelectChange, handleTagValue, data, errors } = useFormValidation<BankModal>({
        validations: {
            name: {
                custom: {
                    isValid(value) {
                        return value && value.length > 3 ? true : false;
                    },
                    message: `${localization.getString?.('Bank.error.form.name', localization.getLanguage?.())}`,
                },
            },
            location: {
                required: {
                    value: true,
                    message: `${localization.getString?.('Bank.error.form.location', localization.getLanguage?.())}`,
                },
            },
            currency: {
                required: {
                    value: true,
                    message: `${localization.getString?.('Bank.error.form.currency', localization.getLanguage?.())}`,
                }
            }
        },
        initialValues: {
        },
        onSubmit: () => { addBank() }
    });

    const addBank = () => {
        if (props.operationType === OperationType.ADD) {
            setAddLoader(true);
            service.bankService?.addBank(data)
                .then(res => {
                    setAddLoader(false);
                    handleClose();
                    props.addCallback(res);
                    expenseAlert.setAlert?.(`${localization.formatString?.(localization.getString ? localization.getString('Bank.success.200', localization.getLanguage?.()) : "", res.name, 'added')}`, AlertType.SUCCESS);
                })
                .catch(err => {
                    expenseAlert.setAlert?.(`${localization.formatString?.(localization.getString ? localization.getString('Bank.error.500', localization.getLanguage?.()) : "", 'adding', data.name)}`, AlertType.SUCCESS);
                    console.error(err);
                })
        } else {
            setAddLoader(true);
            if (props.bank) {
                const id = props.bank.ID;
                service.bankService?.updateBank(data, id)
                    .then(res => {
                        setAddLoader(false);
                        handleClose();
                        props.editCallback(id, res);
                        expenseAlert.setAlert?.(`${localization.formatString?.(localization.getString ? localization.getString('Bank.success.200', localization.getLanguage?.()) : "", props.bank ? props.bank.name : '', 'updated')}`, AlertType.SUCCESS);
                    })
                    .catch(err => {
                        expenseAlert.setAlert?.(`${localization.formatString?.(localization.getString ? localization.getString('Bank.error.500', localization.getLanguage?.()) : "", 'updating', props.bank ? props.bank.name : '')}`, AlertType.SUCCESS);
                        console.error(err);
                    })
            }
        }
    }

    return (
        <>
            <Dialog PaperComponent={PaperComponent} open={props.openModal} aria-labelledby="draggable-dialog-title" onClose={handleClose}>
                <Box id="bankForm" component="form" noValidate onSubmit={handleSubmit}>
                    <DialogTitle className="grabbable"
                        id="draggable-dialog-title">
                        {props.operationType === OperationType.ADD ? localization.getString?.('Bank.modal.addTitle', localization.getLanguage?.()) : localization.getString?.('Bank.modal.editTitle', localization.getLanguage?.())}
                        {errors && <>
                            <br></br><Typography variant="caption" color={red[600]}>There are some error in form</Typography>
                        </>}
                    </DialogTitle>
                    <DialogContent sx={{ maxHeight: '50vh' }}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="bankName"
                                error={errors.name ? true : false}
                                helperText={errors.name}
                                defaultValue={props.bank?.name}
                                label={localization.getString?.('Bank.modal.form.label.name', localization.getLanguage?.())}
                                variant="standard"
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="bankLocation"
                                label={localization.getString?.('Bank.modal.form.label.location', localization.getLanguage?.())}
                                variant="standard"
                                error={errors.location ? true : false}
                                defaultValue={props.bank?.location}
                                helperText={errors.location}
                                onChange={handleChange('location')} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="currency">{localization.getString?.('Bank.modal.form.label.currency', localization.getLanguage?.())}</InputLabel>
                            <Select
                                labelId="currency"
                                id="currency-select"
                                label={localization.getString?.('Bank.modal.form.label.currency', localization.getLanguage?.())}
                                defaultValue={props.bank?.currency}
                                error={errors.currency ? true : false}
                                onChange={handleSelectChange('currency')}
                            >
                                {currencies.map((currency, index) => (
                                    <MenuItem key={index} value={currency.value}>{currency.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.currency &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{errors.currency}</Typography>
                            }
                        </FormControl>
                        <TagSelect
                            onChange={handleTagValue('tags')}
                            error={errorTag}
                            helperText='Max Tag selected can be 5'
                        ></TagSelect>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" form="bankForm" disabled={addLoader}>{props.operationType === OperationType.ADD ?
                            localization.getString?.('Bank.modal.form.primarySaveCTA', localization.getLanguage?.())
                            :
                            localization.getString?.('Bank.modal.form.primaryEditCTA', localization.getLanguage?.())
                        }
                        </Button>
                        {addLoader && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: blue[200],
                                }}
                            />
                        )}
                        <Button onClick={handleClose}>
                            {localization.getString?.('Bank.modal.form.secondaryCTA', localization.getLanguage?.())}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </>
    )
}