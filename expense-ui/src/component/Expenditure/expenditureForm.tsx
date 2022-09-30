import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import { useFormValidation } from "../../hooks/FormValidation";
import { OperationType } from "../../modal/OperationType";
import { Account } from "../../modal/response/Account";
import { Category } from "../../modal/response/Category";
import { Expenditure, ExpenditureType } from "../../modal/response/Expenditure";
import { Limit } from "../../modal/response/Limit";
import AccountSelect from "../Accounts/accountSelect";
import Modal from "../modal";

export interface ExpenditureFormProps {
    operation: OperationType,
    show: boolean,
    close: boolean,
}

export default function ExpenditureForm(props: ExpenditureFormProps) {

    const expenditureFormValidation = useFormValidation<Expenditure>({

    });

    const [toAccount, setToAccount] = useState<boolean>(false);

    const [fromAccount, setFromAccount] = useState<boolean>(false);

    const [openLimit, setOpenLimit] = useState<boolean>(false);

    const [openCategory, setOpenCategory] = useState<boolean>(false);

    return (
        <>
            <Modal
                title={`${props.operation === OperationType.ADD ? 'Add' : 'Edit'} Exxpenditure`}
                onSubmit={expenditureFormValidation.handleSubmit}
                operationType={props.operation}
                show={props.show}
                onClose={() => { }}
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
                            onChange={expenditureFormValidation.handleSelectChange('type')}
                        >
                            <MenuItem key={0} value={ExpenditureType.expense}>Expense</MenuItem>
                            <MenuItem key={1} value={ExpenditureType.revenue}>Revenue</MenuItem>
                            <MenuItem key={2} value={ExpenditureType.transfer}>Transfer</MenuItem>
                        </Select>
                        {expenditureFormValidation.errors.type &&
                            <Typography sx={{ color: red[700] }} variant="caption" display="block" gutterBottom>{expenditureFormValidation.errors.type}</Typography>
                        }
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Limit</InputLabel>
                                <OutlinedInput
                                    id="limit"
                                    error={expenditureFormValidation.data.limit ? true : false}
                                    onChange={expenditureFormValidation.handleChange('limit')}
                                    disabled={true}
                                    endAdornment={
                                        <>
                                            <InputAdornment position="end">
                                                <Button variant="text" onClick={() => { setOpenLimit(true) }}>
                                                    {expenditureFormValidation.data.limit ? "Change" : "Select"} Limit
                                                </Button>
                                            </InputAdornment>
                                        </>
                                    }
                                />
                                {expenditureFormValidation.errors.limit && <><FormHelperText sx={{ color: red[700] }}>{expenditureFormValidation.errors.limit}</FormHelperText></>}
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Category</InputLabel>
                                <OutlinedInput
                                    id="category"
                                    error={expenditureFormValidation.data.category ? true : false}
                                    onChange={expenditureFormValidation.handleChange('category')}
                                    disabled={true}
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
                        </Stack>
                    </FormControl>
                    <FormControl fullWidth >
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth>
                                {expenditureFormValidation.data.type === ExpenditureType.transfer ?
                                    <><InputLabel htmlFor="outlined-adornment-password">Select Account</InputLabel></> :
                                    <><InputLabel htmlFor="outlined-adornment-password">From Account</InputLabel></>
                                }

                                <OutlinedInput
                                    id="accountNumber"
                                    error={expenditureFormValidation.data.account ? true : false}
                                    onChange={expenditureFormValidation.handleChange('account')}
                                    disabled={true}
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

                            {
                                expenditureFormValidation.data.type === ExpenditureType.transfer && <>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">To Account</InputLabel>
                                        <OutlinedInput
                                            id="transferAccount"
                                            error={expenditureFormValidation.data.fromAccount ? true : false}
                                            onChange={expenditureFormValidation.handleChange('fromAccount')}
                                            disabled={true}
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