import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, ListItemButton, ListItemText, MenuItem, OutlinedInput, Paper, PaperProps, Select, Stack, TextField, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { AlertContext, ServiceContext } from "../../context";
import { FormValidation, useFormValidation } from "../../hooks/FormValidation";
import { Account } from "../../modal/response/Account";
import { AlertType } from "../../modal/ExpenseAlert";
import { Category } from "../../modal/response/Category";
import { ApiError } from "../../modal/response/Error";
import { Limit, Priority, Recursively } from "../../modal/response/Limit";
import LaunchIcon from '@mui/icons-material/Launch';
import Modal from "../modal";
import { OperationType } from "../../modal/OperationType";
import AccountSelect from "../Accounts/accountSelect";
interface LimitModalProps {
    openModal: boolean;
    categories: Array<Category>;
    onClose: (closeFlag: boolean) => void;
    onSave: (limit: Limit) => void;
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

export default function LimitModal(props: LimitModalProps) {

    const [addLoader, setAddLoader] = useState<boolean>(false);

    const [openAccount, setOpenAccount] = useState<boolean>(false);

    const [selectedAccount, setSelectedAccount] = useState<Account>();

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const handleClose = () => {
        props.onClose(false);
    }

    const handleAccountSelectOnClose = () => {
        setOpenAccount(false);
    }

    const handleAccountSelectOnChange = (account: Account) => {
        setSelectedAccount(account);
        limitForm.data.accountId = account.id;
        setOpenAccount(false);
    }

    const limitForm: FormValidation<Limit> = useFormValidation<Limit>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: 'Limit Name is required.'
                }
            },
            description: {
                required: {
                    value: true,
                    message: 'Limit Description is required.'
                }
            },
            priority: {
                required: {
                    value: true,
                    message: 'Select at least one priority from dropdown.'
                }
            },
            resetRecursively: {
                required: {
                    value: true,
                    message: 'Select at least one from drop down.'
                }
            },
            thresoldWarningAmount: {
                custom: {
                    isValid(value) {
                        return (limitForm.data.minAmount <= Number(value) && Number(value) <= limitForm.data.maxAmount);
                    },
                    message: `Thresold amount should be in range of min and max amount`
                }
            },
            accountId: {
                required: {
                    value: true,
                    message: 'Select account.'
                }
            },
            categoryId: {
                required: {
                    value: true,
                    message: 'Select Category from drop down.'
                }
            },
        },
        initialValues: {
            minAmount: 0,
            maxAmount: 0
        },
        onSubmit() {
            setAddLoader(true);
            service.limitService?.addLimit(limitForm.data)
                .then((limit: Limit) => {
                    props.onSave(limit);
                    expenseAlert.setAlert?.('Limit have been saved successfully', AlertType.SUCCESS);
                })
                .catch((err: ApiError) => {
                    expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                })
                .finally(() => {
                    setAddLoader(false);
                })
        },
    });

    return (
        <>
            <AccountSelect show={openAccount} onClose={handleAccountSelectOnClose} onChange={handleAccountSelectOnChange}></AccountSelect>
            <Modal
                title={`Limit`}
                loader={addLoader}
                show={props.openModal}
                onClose={handleClose}
                onSubmit={limitForm.handleSubmit}
                operationType={OperationType.ADD}
            >

                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        variant="outlined"
                        error={limitForm.errors.name ? true : false}
                        helperText={limitForm.errors.name}
                        onChange={limitForm.handleChange('name')}
                    >
                    </TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField margin="normal"
                        required
                        id="name"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        error={limitForm.errors.description ? true : false}
                        helperText={limitForm.errors.description}
                        onChange={limitForm.handleChange('description')}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Stack direction={'row'} spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category-select"
                                label='Category'
                                error={limitForm.errors.categoryId ? true : false}
                                onChange={limitForm.handleSelectChange('categoryId')}
                            >
                                {props.categories.map((category: Category, index: number) => (
                                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                ))}
                                {props.categories.length === 0 && <>
                                    <ListItemButton disableRipple={true}>
                                        <Button href="/category" startIcon={<LaunchIcon></LaunchIcon>} disableRipple={true} sx={{ width: '100%' }}>
                                            <ListItemText primary="Create new Category" />
                                        </Button>
                                    </ListItemButton>
                                </>}
                            </Select>
                            {limitForm.errors.categoryId &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{limitForm.errors.categoryId}</Typography>
                            }
                        </FormControl>
                        <FormControl fullWidth>
                            {!selectedAccount && <><InputLabel htmlFor="outlined-adornment-password">Account</InputLabel></>}
                            <OutlinedInput
                                id="accountNumber"
                                value={selectedAccount?.name}
                                error={limitForm.errors.accountId? true: false}
                                onChange={limitForm.handleChange('accountId')}
                                disabled={true}
                                endAdornment={
                                    <>
                                        <InputAdornment position="end">
                                            <Button variant="text" onClick={() => { setOpenAccount(true) }}>
                                                {selectedAccount?.name ? "Change":"Select"} Account
                                            </Button>
                                        </InputAdornment>
                                    </>
                                }
                            />
                            {limitForm.errors.accountId && <><FormHelperText sx={{color: red[700]}}>{limitForm.errors.accountId}</FormHelperText></>}
                        </FormControl>
                    </Stack>

                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Stack direction={'row'} spacing={2}>
                        <FormControl fullWidth >
                            <InputLabel id="recursive">Recursive</InputLabel>
                            <Select
                                labelId="recursive"
                                id="recursive-select"
                                label='recursive'
                                error={limitForm.errors.resetRecursively ? true : false}
                                onChange={limitForm.handleSelectChange('resetRecursively')}
                            >
                                <MenuItem key={0} value={Recursively.DAY}>{Recursively.DAY}</MenuItem>
                                <MenuItem key={1} value={Recursively.MONTH}>{Recursively.MONTH}</MenuItem>
                                <MenuItem key={2} value={Recursively.YEAR}>{Recursively.YEAR}</MenuItem>
                            </Select>
                            {limitForm.errors.resetRecursively &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{limitForm.errors.resetRecursively}</Typography>
                            }
                        </FormControl>

                        <FormControl fullWidth >
                            <InputLabel id="priority">Priority</InputLabel>
                            <Select
                                labelId="priority"
                                id="priority-select"
                                label='priority'
                                error={limitForm.errors.priority ? true : false}
                                onChange={limitForm.handleSelectChange('priority')}
                            >
                                <MenuItem key={0} value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                                <MenuItem key={1} value={Priority.NORMAL}>{Priority.NORMAL}</MenuItem>
                                <MenuItem key={2} value={Priority.LOW}>{Priority.LOW}</MenuItem>
                            </Select>
                            {limitForm.errors.priority &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{limitForm.errors.priority}</Typography>
                            }
                        </FormControl>
                    </Stack>
                </FormControl>
                <FormControl margin="normal">
                    <Stack spacing={2} direction='row'>
                        <TextField
                            required
                            id="minAmount"
                            label="Minimum Amount"
                            variant="standard"
                            defaultValue={limitForm.data.minAmount}
                            onChange={limitForm.handleChange('minAmount')}
                        >
                        </TextField>

                        <TextField
                            required
                            id="maxAmount"
                            label="Maximum Amount"
                            variant="standard"
                            defaultValue={0}
                            onChange={limitForm.handleChange('maxAmount')}
                        >
                        </TextField>
                        <TextField
                            required
                            id="minAmount"
                            label="Thresold Warning Amount"
                            variant="standard"
                            defaultValue={0}
                            error={limitForm.errors.thresoldWarningAmount ? true : false}
                            onChange={limitForm.handleChange('thresoldWarningAmount')}
                            helperText={limitForm.errors.thresoldWarningAmount}
                        >
                        </TextField>
                    </Stack>
                </FormControl>
            </Modal>
        </>
    );
}