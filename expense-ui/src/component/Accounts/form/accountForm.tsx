import { FormControl, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormValidation } from "../../../hooks/FormValidation";
import { OperationType } from "../../../modal/OperationType";
import { Account } from "../../../modal/response/Account";
import TagSelect from "../../Tag/TagSelect";
import AccountModal from "../modal";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


export interface AccountFormProps {
    form: FormValidation<Account>;
    open: boolean;
    operationType: OperationType;
    loader?: boolean
    onClose?: () => void;
    defaultValue?: Account
    title?: string;
}

export default function AccountForm(props: AccountFormProps) {

    return (<>
        <AccountModal
            title={`${props.title}`}
            loader={props.loader}
            show={props.open}
            onClose={() => {props.onClose?.()}}
            onSubmit={props.form.handleSubmit}
            operationType={props.operationType}
        >
            <>
                <FormControl fullWidth margin="normal">
                    <TextField
                        required
                        id="accountName"
                        error={props.form.errors.name ? true : false}
                        helperText={props.form.errors.name}
                        defaultValue={props.defaultValue?.name}
                        label='Account Name'
                        variant="outlined"
                        onChange={props.form.handleChange('name')}
                    />
                    <FormControl margin="normal">
                    </FormControl>
                    <Stack direction={'row'} spacing={2} >
                        <TextField
                            fullWidth={true}
                            required
                            id="accountNumber"
                            disabled={props.operationType === OperationType.EDIT ? true: false}
                            error={props.form.errors.accountNumber ? true : false}
                            helperText={props.form.errors.accountNumber}
                            defaultValue={props.defaultValue?.accountNumber}
                            label='Account Number'
                            variant="outlined"
                            onChange={props.form.handleChange('accountNumber')}
                        />

                        <TextField
                            fullWidth={true}
                            required
                            id="amount"
                            error={props.form.errors.amount ? true : false}
                            helperText={props.form.errors.amount}
                            defaultValue={props.defaultValue?.amount}
                            label='Amount'
                            variant="outlined"
                            onChange={props.form.handleChange('amount')}
                        />
                    </Stack>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Account Opening Date"
                            value={props.defaultValue?.openDate}
                            onChange={(newValue) => {
                                props.form.setValue('openDate', newValue)
                            }}
                            renderInput={(params) => <TextField helperText={props.form.errors.openDate} variant="outlined" {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl margin="normal">
                    <TagSelect
                        onChange={props.form.handleTagValue('tags')}
                        error={props.form.errors.tags}
                    ></TagSelect>
                </FormControl>
            </>
        </AccountModal>
    </>)
}