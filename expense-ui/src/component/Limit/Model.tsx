import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemButton, ListItemText, MenuItem, Paper, PaperProps, Select, Stack, TextField, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import Draggable from "react-draggable";
import { AlertContext, ServiceContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { Account } from "../../modal/Account";
import { AlertType } from "../../modal/ExpenseAlert";
import { Category } from "../../modal/response/Category";
import { ApiError } from "../../modal/response/Error";
import { Limit, Priority, Recursively } from "../../modal/response/Limit";
import LaunchIcon from '@mui/icons-material/Launch';
interface LimitModalProps {
    openModal: boolean;
    accounts: Array<Account>;
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

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const handleClose = () => {
        props.onClose(false);
    }

    const { handleSubmit, handleChange, handleSelectChange, data: limitData, errors, refreshError } = useFormValidation<Limit>({
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
                        return (limitData.minAmount <= Number(value) && Number(value) <= limitData.maxAmount);
                    },
                    message: `Thresold amount should be in range of min and max amount`
                }
            },
            accountId: {
                required: {
                    value: true,
                    message: 'Select account from drop down.'
                }
            },
            categoryId: {
                required: {
                    value: true,
                    message: 'Select Category from drop down.'
                }
            }
        },
        initialValues: {
            minAmount: 0,
            maxAmount: 0
        },
        onSubmit() {
            setAddLoader(true);
            service.limitService?.addLimit(limitData)
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
            <Dialog PaperComponent={PaperComponent} open={props.openModal} aria-labelledby="draggable-dialog-title" onClose={handleClose}>
                <Box id="limitForm" component="form" noValidate onSubmit={handleSubmit}>
                    <DialogTitle className="grabbable"
                        id="draggable-dialog-title">
                        Add Limit
                    </DialogTitle>
                    <DialogContent sx={{ maxHeight: '50vh' }}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="name"
                                label="Name"
                                variant="outlined"
                                error={errors.name ? true : false}
                                helperText={errors.name}
                                onChange={handleChange('name')}
                            >
                            </TextField>
                            <TextField margin="normal"
                                required
                                id="name"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={3}
                                error={errors.description ? true : false}
                                helperText={errors.description}
                                onChange={handleChange('description')}
                            >
                            </TextField>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="account">Accounts</InputLabel>
                            <Select
                                labelId="account"
                                id="account-select"
                                label='Account'
                                error={errors.accountId ? true : false}
                                onChange={handleSelectChange('accountId')}
                            >
                                {props.accounts.map((account: Account, index: number) => (
                                    <MenuItem key={index} value={account.ID}>{account.name}</MenuItem>
                                ))}
                                {props.accounts.length === 0 && <>
                                    <ListItemButton disableRipple={true}>
                                        <Button href="/bank" startIcon={<LaunchIcon></LaunchIcon>} disableRipple={true} sx={{ width: '100%' }}>
                                            <ListItemText primary="Go To Bank" />
                                        </Button>
                                    </ListItemButton>
                                </>}
                            </Select>
                            {errors.accountId &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{errors.accountId}</Typography>
                            }
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category-select"
                                label='Category'
                                error={errors.categoryId ? true : false}
                                onChange={handleSelectChange('categoryId')}
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
                            {errors.categoryId &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{errors.categoryId}</Typography>
                            }
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="recursive">Recursive</InputLabel>
                            <Select
                                labelId="recursive"
                                id="recursive-select"
                                label='recursive'
                                error={errors.resetRecursively ? true : false}
                                onChange={handleSelectChange('resetRecursively')}
                            >
                                <MenuItem key={0} value={Recursively.DAY}>{Recursively.DAY}</MenuItem>
                                <MenuItem key={1} value={Recursively.MONTH}>{Recursively.MONTH}</MenuItem>
                                <MenuItem key={2} value={Recursively.YEAR}>{Recursively.YEAR}</MenuItem>
                            </Select>
                            {errors.resetRecursively &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{errors.resetRecursively}</Typography>
                            }
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="priority">Priority</InputLabel>
                            <Select
                                labelId="priority"
                                id="priority-select"
                                label='priority'
                                error={errors.priority ? true : false}
                                onChange={handleSelectChange('priority')}
                            >
                                <MenuItem key={0} value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                                <MenuItem key={1} value={Priority.NORMAL}>{Priority.NORMAL}</MenuItem>
                                <MenuItem key={2} value={Priority.LOW}>{Priority.LOW}</MenuItem>
                            </Select>
                            {errors.priority &&
                                <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{errors.priority}</Typography>
                            }
                        </FormControl>

                        <Stack spacing={2} direction='row'>
                            <FormControl >
                                <TextField
                                    required
                                    id="minAmount"
                                    label="Minimum Amount"
                                    variant="standard"
                                    defaultValue={limitData.minAmount}
                                    onChange={handleChange('minAmount')}
                                >
                                </TextField>
                            </FormControl>

                            <FormControl >
                                <TextField
                                    required
                                    id="maxAmount"
                                    label="Maximum Amount"
                                    variant="standard"
                                    defaultValue={0}
                                    onChange={handleChange('maxAmount')}
                                >
                                </TextField>
                            </FormControl>
                        </Stack>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="minAmount"
                                label="Thresold Warning Amount"
                                variant="standard"
                                defaultValue={0}
                                error={errors.thresoldWarningAmount ? true : false}
                                onChange={handleChange('thresoldWarningAmount')}
                                helperText={errors.thresoldWarningAmount}
                            >
                            </TextField>
                        </FormControl>


                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" form="limitForm" disabled={addLoader}>
                            Save
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
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </>
    );
}