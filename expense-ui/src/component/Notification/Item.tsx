import { Avatar, Button, Grid,  ListItem, ListItemAvatar,  ListItemSecondaryAction, ListItemText, Tooltip, Typography } from "@mui/material";
import { MarkAsUnread, MarkEmailUnread, SvgIconComponent } from "@mui/icons-material";
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
    unread?: (id?: number) => void;
    remove?: (id?: number) => void;
}

export default function NotificationItem(props: NotificationItemProps) {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {props.avatarIcon && <>
                            <props.avatarIcon></props.avatarIcon>
                        </>}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.heading}
                    secondary={
                        <>
                            <Grid item xs={10}>
                                <Stack direction={'column'} alignContent={'center'} textAlign={'justify'}>
                                    <Typography variant="body2">
                                        {props.intro}
                                    </Typography>
                                    <Typography variant="caption" textAlign={'end'}>
                                        {props.date}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <Grid item xs={2}>
                        <Stack direction={'row'} spacing={1}>
                            <Tooltip title={'Mark As Unread message'}>
                                <Button variant="outlined" onClick={() => props.unread?.(props.id)} startIcon={<MarkAsUnread />}></Button>
                            </Tooltip>
                            <Tooltip title={'Remove notification'}>
                                <Button variant="outlined" onClick={() => props.remove?.(props.id)} startIcon={<RemoveIcon />}></Button>
                            </Tooltip>
                        </Stack>
                    </Grid>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
}