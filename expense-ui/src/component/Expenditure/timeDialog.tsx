
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { LocalizationProvider, MonthPicker, YearPicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { Button, DialogContent, Grid, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Stack } from '@mui/system';
import { Close } from '@mui/icons-material';

export interface TimeDialogProps {
    onSelect?: (date: Date) => void;
    title: string;
    open: boolean;
    year?: boolean;
    month?: boolean;
    onClose?: () => void;
    date?: Date;
}

export default function TimeDialog(props: TimeDialogProps) {
    const minDate = moment().subtract(10, 'year');
    const maxDate = moment().add(50, 'year');

    const setDate = (date: Moment) => {
        props.onSelect?.(date.toDate());
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>
                <Stack direction={'row'} sx={{ display: 'flex' }}>
                    <Typography variant="h5" letterSpacing={2}>
                        {props.title}
                    </Typography>
                    <Button sx={{ marginLeft: 'auto' }} variant="text" onClick={props.onClose}>
                        <Close />
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{height: '30vh'}}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid item xs={12} md={6}>
                        {
                            props.year &&
                            <>
                                <YearPicker
                                    date={props.date? moment(props.date): moment()}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    onChange={(newDate) => setDate(newDate)} />
                            </>
                        }
                        {
                            props.month &&
                            <>
                                <MonthPicker
                                    date={props.date? moment(props.date): moment()}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    onChange={(newDate) => setDate(newDate)}
                                />
                            </>
                        }
                    </Grid>
                </LocalizationProvider>
            </DialogContent>
        </Dialog>
    );
}