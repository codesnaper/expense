import { Button, Card, Container, Divider, Grid, List, ListSubheader, Paper } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import { Box, Stack } from "@mui/system";
import { Notification, NotificationType } from "../../../modal/response/Notification";
import PlaceholderCard from "../../PlaceholderCard";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useContext, useEffect, useState } from "react";
import { InfoOutlined, MoneyOutlined, SummarizeOutlined, SvgIconComponent } from "@mui/icons-material";
import RuleFolder from "@mui/icons-material/RuleFolder";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationContext } from "../../../context";
import { NotificationOperation, NotificationSocketMessage } from "../../../modal/response/NotificationSocketMessage";
import NotificationItem from "./Item";


export default function NotificationComponent() {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notificationContext = useContext(NotificationContext);

    useEffect(() => {
        if(notificationContext && notificationContext.notifications){
            if(notificationContext.type === NotificationOperation.NEW){
                    setNotifications(notificationContext.notifications);
            } else  {
                notificationContext.notifications.forEach((notification: Notification) => {
                    setNotifications([...notifications,notification]);
                });
            }
        }
        window.localStorage.setItem('nCount', Number(notifications.length).toString());
    }, [notificationContext]);

    const getColor = (notificationType: NotificationType | undefined): string => {
        switch (notificationType) {
            case NotificationType.LIMIT_REACHED | NotificationType.LIMIT_CROSSED:
                return red[100];
            case NotificationType.LIMIT_WARNING:
                return yellow[50];
            case NotificationType.REVENUE:
                return green[50];
            case NotificationType.EXPENSE:
                return red[50];
            default:
                return blue[50];
        }
    }

    const getIcon = (notificationType: NotificationType | undefined): SvgIconComponent => {
        switch (notificationType) {
            case NotificationType.LIMIT_CROSSED | NotificationType.LIMIT_REACHED | NotificationType.LIMIT_WARNING:
                return RuleFolder;

            case NotificationType.EXPENSE | NotificationType.REVENUE:
                return MoneyOutlined;

            case NotificationType.INFO:
                return InfoOutlined;

            case NotificationType.SUMMARY:
                return SummarizeOutlined;

            default:
                return NotificationsIcon;
        }
    }

    const loadNotification = (readFlag: boolean) => {
        setNotifications(notifications.filter((notification: Notification) => !readFlag && notification.isUnread));
    }

    return (
        <>
            <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack direction={"row-reverse"} spacing={1}>
                            <Button variant="contained" color="secondary" onClick={() => { loadNotification(false) }}> Unread</Button>
                            <Button variant="contained" color="secondary" onClick={() => { loadNotification(true) }}> Read </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginTop: '24px' }}>
                        <Paper elevation={3}>
                            <List subheader={
                                <>
                                    <ListSubheader component="div" id="notificationListHeader">
                                        Notifications
                                    </ListSubheader>
                                    <Divider />
                                    {!notifications &&
                                        <>
                                            <Card raised>
                                                <PlaceholderCard heading="No New Notification"
                                                    info="You are done for the day.There are no new notification."
                                                >
                                                    <NotificationsActiveIcon fontSize="inherit"></NotificationsActiveIcon>
                                                    <></>
                                                </PlaceholderCard>
                                            </Card></>
                                    }
                                    {
                                        notifications?.map((notification: Notification | undefined) =>
                                            <>
                                                <NotificationItem
                                                    heading={notification?.heading}
                                                    intro={notification?.description}
                                                    date={notification?.date}
                                                    id={notification?.id}
                                                    readFlag={notification?.isUnread}
                                                    color={getColor(notification?.notification)}
                                                    avatarIcon={getIcon(notification?.notification)}
                                                ></NotificationItem>
                                            </>
                                        )
                                    }
                                </>
                            }>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}