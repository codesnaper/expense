import { Avatar, Button, Grid,  ListItem, ListItemAvatar,  ListItemSecondaryAction, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteForever, MarkAsUnread, MarkEmailUnread, SvgIconComponent } from "@mui/icons-material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack } from "@mui/system";

interface NotificationItemProps {
    avatarIcon?: SvgIconComponent;
    heading?: string;
    intro?: string;
    date?: string;
    id?: number;
    color?: string;
    readFlag?: boolean;
    unread?: (id: number) => void;
    remove?: (id: number) => void;
}

export default function NotificationItem(props: NotificationItemProps) {
    return (
            <ListItem key={props.id? props.id: '0'}>
                <ListItemAvatar>
                    <Avatar>
                        {props.avatarIcon && <>
                            <props.avatarIcon></props.avatarIcon>
                        </>}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.heading}
                    secondary={
                            <Grid component={'span'} item xs={10}>
                                <Stack direction={'column'} component={'span'} alignContent={'center'} textAlign={'justify'}>
                                    <Typography variant="body2" component={'span'}>
                                        {props.intro}
                                    </Typography>
                                    <Typography variant="caption" textAlign={'end'} component={'span'}>
                                        {props.date}
                                    </Typography>
                                </Stack>
                            </Grid>
                    }
                />
                <ListItemSecondaryAction>
                    <Grid item xs={2}>
                        <Stack direction={'row'} spacing={1}>
                            <Tooltip title={'Mark As Unread message'}>
                                <Button variant="outlined" onClick={() => props.unread?.(props.id? props.id: 0)} startIcon={<MarkAsUnread />}></Button>
                            </Tooltip>
                            <Tooltip title={'Remove notification'}>
                                <Button variant="outlined" onClick={() => props.remove?.(props.id? props.id: 0)} startIcon={<DeleteForever />}></Button>
                            </Tooltip>
                        </Stack>
                    </Grid>
                </ListItemSecondaryAction>
            </ListItem>
    );
}