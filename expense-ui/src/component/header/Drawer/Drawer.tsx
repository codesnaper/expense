import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DrawerHeaderLogo from './DrawerHeader';
import CategoryIcon from '@mui/icons-material/Category';
import MoneyIcon from '@mui/icons-material/Money';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
interface ExpenseDrawerProps {
    open: boolean;
    openDrawer?: (open: boolean) => void;
}
export default function ExpenseDrawer(props: ExpenseDrawerProps) {

    const [refresh, setRefresh] = React.useState<boolean>(true);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                props.open = open;
                setRefresh(!refresh);
                props.openDrawer?.(open);
            };

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <DrawerHeaderLogo></DrawerHeaderLogo>
            <List>
                <ListItem key={'1'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Expense'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'1'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PermDataSettingIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Limit'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'1'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Category'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'1'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Bank'} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <div>

            <React.Fragment key="drawer">
                <Drawer
                    anchor="left"
                    open={props.open}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}