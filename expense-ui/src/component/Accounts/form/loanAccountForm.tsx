import { FormControl, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormValidation } from "../../../hooks/FormValidation";
import { OperationType } from "../../../modal/OperationType";
import { LoanAccount } from "../../../modal/response/Account";
import TagSelect from "../../Tag/TagSelect";
import AccountModal from "../modal";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


export interface LoanAccountFormProps {
    form: FormValidation<LoanAccount>;
    open: boolean;
    operationType: OperationType;
    loader?: boolean
    onClose?: () => void;
    defaultValue?: LoanAccount
    title?: string;
}

export default function LoanAccountForm(props: LoanAccountFormProps) {

    return (<>
        <AccountModal
            title="Loan Account"
            loader={props.loader}
            show={props.open}
            onClose={() => { props.onClose?.() }}
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
                        defaultValue={props.form.data.name}
                        label='Account Name'
                        variant="outlined"
                        onChange={props.form.handleChange('name')}
                    />
                </FormControl>
                <FormControl margin="normal">
                    <Stack direction={'row'} spacing={2} >
                        <TextField
                            fullWidth={true}
                            required
                            id="accountNumber"
                            error={props.form.errors.accountNumber ? true : false}
                            helperText={props.form.errors.accountNumber}
                            defaultValue={props.form.data.accountNumber}
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
                            defaultValue={props.form.data.amount}
                            label='Amount'
                            variant="outlined"
                            onChange={props.form.handleChange('amount')}
                        />
                    </Stack>
                </FormControl>
                <FormControl margin="normal">
                    <Stack direction={'row'} spacing={2} >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Account Opening Date"
                                value={props.form.data.openDate}
                                onChange={(newValue) => {
                                    props.form.setValue('openDate', newValue)
                                }}
                                renderInput={(params) => <TextField fullWidth={true} variant="outlined" {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Account Closing Date"
                                value={props.form.data.endDate}
                                onChange={(newValue) => {
                                    props.form.setValue('endDate', newValue)
                                }}
                                renderInput={(params) => <TextField fullWidth={true} variant="outlined" {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            fullWidth={true}
                            required
                            id="rate"
                            type={'number'}
                            error={props.form.errors.rate ? true : false}
                            helperText={props.form.errors.rate}
                            defaultValue={props.form.data.rate}
                            label='Interest Rate'
                            variant="outlined"
                            onChange={props.form.handleChange('rate')}
                        />
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