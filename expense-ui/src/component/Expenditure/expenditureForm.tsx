import { Close } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useContext, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { AlertType } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { Account } from "../../modal/response/Account";
import { Category } from "../../modal/response/Category";
import { ApiError } from "../../modal/response/Error";
import { Expenditure, ExpenditureType } from "../../modal/response/Expenditure";
import { Limit } from "../../modal/response/Limit";
import AccountSelect from "../Accounts/accountSelect";
import CategorySelect from "../Category/CategorySelect";
import LimitSelect from "../Limit/limitSelect";
import Modal from "../modal";

export interface ExpenditureFormProps {
    operation: OperationType,
    show: boolean,
    onClose?: () => void,
    onChange?: (expenditure: Expenditure) => void;
    defaultValue?: Expenditure
}

export default function ExpenditureForm(props: ExpenditureFormProps) {

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const [toAccount, setToAccount] = useState<boolean>(false);

    const [fromAccount, setFromAccount] = useState<boolean>(false);

    const [openLimit, setOpenLimit] = useState<boolean>(false);

    const [openCategory, setOpenCategory] = useState<boolean>(false);

    const [loader, setLoader] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('Expenditure');

    const expenditureFormValidation = useFormValidation<Expenditure>({
        validations: {
            name: {
                required: {
                    message: 'Name is required',
                    value: true
                },
            },
            type: {
                required:{
                    message: 'Select Any one from the drop down to identify the expenditure.',
                    value: true
                }
            },
            date: {
                required:{
                    message: 'Select Date',
                    value: true
                }
            },
            amount: {
                required:{
                    message: 'Amount is required.',
                    value: true
                }
            }
        },
        onSubmit() {
            setLoader(true);
            service.expenditureService?.addExpenditureService(expenditureFormValidation.data)
                .then((expenditure: Expenditure) => {
                    expenseAlert.setAlert?.('Expenditure added succesfully', AlertType.SUCCESS);
                    props.onChange?.(expenditure);
                    expenditureFormValidation.refreshError();
                    props.onClose?.();
                })
                .catch((err: ApiError) => {
                    expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                })
                .finally(() => {
                    setLoader(false);
                })
        },
    });

    const handleOnChangeLimit = (limit: Limit) => {
        setOpenLimit(false);
        expenditureFormValidation.setValue('limit', limit);
    }

    const handleOnCategory = (category: Category) => {
        setOpenCategory(false);
        expenditureFormValidation.setValue('category', category)
    }

    const handleOnAccount = (account: Account) => {
        expenditureFormValidation.setValue('account', account);
        setToAccount(false);
    }

    const handleFromAccount = (account: Account) => {
        expenditureFormValidation.setValue('fromAccount', account);
        setFromAccount(false);
    }

    const handleExpenditureType = (e: SelectChangeEvent<any>) => {
        setTitle(e.target.value);
        expenditureFormValidation.setValue('type', e.target.value);
    }

    return (
        <>
            <LimitSelect
                show={openLimit}
                onChange={handleOnChangeLimit}
                onClose={() => setOpenLimit(false)}
            ></LimitSelect>
            <CategorySelect
                show={openCategory}
                onChange={handleOnCategory}
                onClose={() => setOpenCategory(false)}
            ></CategorySelect>
            <AccountSelect
                show={toAccount}
                onChange={handleOnAccount}
                onClose={() => setToAccount(false)}
            ></AccountSelect>
            <AccountSelect
                show={fromAccount}
                onChange={handleFromAccount}
                onClose={() => setFromAccount(false)}
            ></AccountSelect>
            <Modal
                loader={loader}
                title={title}
                onSubmit={expenditureFormValidation.handleSubmit}
                operationType={props.operation}
                show={props.show}
                onClose={() => { props.onClose?.() }}
            >
                <>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            required
                            id="name"
                            error={expenditureFormValidation.errors.name ? true : false}
                            helperText={expenditureFormValidation.errors.name}
                            label='Name'
                            variant="outlined"
                            onChange={expenditureFormValidation.handleChange('name')}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            required
                            id="description"
                            error={expenditureFormValidation.errors.description ? true : false}
                            helperText={expenditureFormValidation.errors.description}
                            multiline
                            rows={3}
                            label='Description'
                            variant="outlined"
                            onChange={expenditureFormValidation.handleChange('description')}
                        />
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel id="expenditureType">Expenditure Type</InputLabel>
                        <Select
                            labelId="expenditureType"
                            id="expenditure-select"
                            label='expenditureType'
                            error={expenditureFormValidation.errors.type ? true : false}
                            onChange={handleExpenditureType}
                        >
                            <MenuItem key={0} value={ExpenditureType.EXPENSE}>Expense</MenuItem>
                            <MenuItem key={1} value={ExpenditureType.REVENUE}>Revenue</MenuItem>
                            <MenuItem key={2} value={ExpenditureType.TRANSFER}>Transfer</MenuItem>
                        </Select>
                        {expenditureFormValidation.errors.type &&
                            <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{expenditureFormValidation.errors.type}</Typography>
                        }
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <Stack direction={'row'} spacing={2}>
                            {
                                expenditureFormValidation.data.type !== ExpenditureType.TRANSFER &&
                                <>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            {expenditureFormValidation.data.limit ? '' : 'Limit'}
                                        </InputLabel>
                                        <OutlinedInput
                                            id="limit"
                                            error={expenditureFormValidation.data.limit ? true : false}
                                            onChange={expenditureFormValidation.handleChange('limit')}
                                            disabled={true}
                                            value={expenditureFormValidation.data.limit ? expenditureFormValidation.data.limit.name : ''}
                                            endAdornment={
                                                <>
                                                    <InputAdornment position="end">
                                                        <Button variant="text" onClick={() => { setOpenLimit(true) }}>
                                                            {expenditureFormValidation.data.limit ? "Change" : "Select"} Limit
                                                        </Button>
                                                    </InputAdornment>
                                                </>
                                            }
                                            startAdornment={
                                                expenditureFormValidation.data.limit && <>
                                                    <Button startIcon={<Close />} onClick={() => { expenditureFormValidation.setValue('limit', null) }} variant="text"></Button>
                                                </>
                                            }
                                        />
                                        {expenditureFormValidation.errors.limit && <><FormHelperText sx={{ color: red[700] }}>{expenditureFormValidation.errors.limit}</FormHelperText></>}
                                    </FormControl>
                                </>
                            }

                            {(!expenditureFormValidation.data.limit && expenditureFormValidation.data.type !== ExpenditureType.TRANSFER) &&
                                <>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Category
                                        </InputLabel>
                                        <OutlinedInput
                                            id="category"
                                            error={expenditureFormValidation.data.category ? true : false}
                                            onChange={expenditureFormValidation.handleChange('category')}
                                            disabled={true}
                                            value={expenditureFormValidation.data.category ? expenditureFormValidation.data.category.name : ''}
                                            endAdornment={
                                                <>
                                                    <InputAdornment position="end">
                                                        <Button variant="text" onClick={() => { setOpenCategory(true) }}>
                                                            {expenditureFormValidation.data.category ? "Change" : "Select"} Category
                                                        </Button>
                                                    </InputAdornment>
                                                </>
                                            }
                                        />
                                        {expenditureFormValidation.errors.account && <><FormHelperText sx={{ color: red[700] }}>{expenditureFormValidation.errors.account}</FormHelperText></>}
                                    </FormControl>
                                </>
                            }

                        </Stack>
                    </FormControl>
                    <FormControl fullWidth >
                        <Stack direction={'row'} spacing={2}>
                            {(!expenditureFormValidation.data.limit) &&
                                <>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            From Account
                                        </InputLabel>
                                        <OutlinedInput
                                            id="accountNumber"
                                            error={expenditureFormValidation.data.account ? true : false}
                                            onChange={expenditureFormValidation.handleChange('account')}
                                            disabled={true}
                                            value={expenditureFormValidation.data.account ? expenditureFormValidation.data.account.accountNumber : ''}
                                            endAdornment={
                                                <>
                                                    <InputAdornment position="end">
                                                        <Button variant="text" onClick={() => { setToAccount(true) }}>
                                                            {expenditureFormValidation.data.account ? "Change" : "Select"} Account
                                                        </Button>
                                                    </InputAdornment>
                                                </>
                                            }
                                        />
                                        {expenditureFormValidation.errors.account && <><FormHelperText sx={{ color: red[700] }}>{expenditureFormValidation.errors.account}</FormHelperText></>}
                                    </FormControl>
                                </>}
                            {
                                expenditureFormValidation.data.type === ExpenditureType.TRANSFER && <>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            To Account
                                        </InputLabel>
                                        <OutlinedInput
                                            id="transferAccount"
                                            error={expenditureFormValidation.data.fromAccount ? true : false}
                                            onChange={expenditureFormValidation.handleChange('fromAccount')}
                                            disabled={true}
                                            value={expenditureFormValidation.data.fromAccount ? expenditureFormValidation.data.fromAccount.accountNumber : ''}
                                            endAdornment={
                                                <>
                                                    <InputAdornment position="end">
                                                        <Button variant="text" onClick={() => { setFromAccount(true) }}>
                                                            {expenditureFormValidation.data.fromAccount ? "Change" : "Select"} Account
                                                        </Button>
                                                    </InputAdornment>
                                                </>
                                            }
                                        />
                                        {expenditureFormValidation.errors.account && <><FormHelperText sx={{ color: red[700] }}>{expenditureFormValidation.errors.account}</FormHelperText></>}
                                    </FormControl>
                                </>
                            }
                        </Stack>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    id="amount"
                                    error={expenditureFormValidation.errors.amount ? true : false}
                                    helperText={expenditureFormValidation.errors.name}
                                    label='Amount'
                                    variant="outlined"
                                    onChange={expenditureFormValidation.handleChange('amount')}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        label="Expense Date"
                                        value={expenditureFormValidation.data.date}
                                        onChange={(newValue) => {
                                            expenditureFormValidation.setValue('date', newValue)
                                        }}
                                        renderInput={(params) => <TextField fullWidth={true} variant="outlined" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Stack>
                    </FormControl>
                </>
            </Modal>
        </>
    );
}