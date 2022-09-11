import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AdbIcon from '@mui/icons-material/Adb';
import { AlertContext, ServiceContext, UserContext } from '../../context';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Avatar, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore, LightMode, Logout } from '@mui/icons-material';
import { User } from '../../modal/response/User';
import { Profile } from '../../modal/response/Profile';
import { ApiError } from '../../modal/response/Error';
import { AlertType } from '../../modal/ExpenseAlert';
import ContentLoader from '../ContentLoader';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
    };
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

interface NavbarProps {
    openDrawer?: (open: boolean) => void;
    updateUserProfile?: (profile: Profile) => void;
}

export default function Navbar(props: NavbarProps) {
    const [open, setOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState<boolean>(false);
    const [loader, setLoader] = React.useState<boolean>(false);
    const service = React.useContext(ServiceContext);
    const expenseAlert = React.useContext(AlertContext);
    const handleClick = () => {
        setOpen(!open);
    };
    const user:User = React.useContext(UserContext);
    const signOut = async () => {
        try {
            localStorage.clear();
            window.location.href = '/';
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const setTheme = (theme: string, darkMode: boolean) => {
        setLoader(true);
        service.profileService?.updateTheme(theme)
        .then((profile: Profile) => {
            props.updateUserProfile?.(profile);
            setDarkMode(darkMode);
        })
        .catch((err: ApiError) => {
            expenseAlert.setAlert?.(err.message, AlertType.ERROR);
        })
        .finally(() => {
            setLoader(false);
        })
    }

    React.useEffect(() => {
        setDarkMode(user.profile?.theme === 'dark');
    },[user])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{ mt: '45px' }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account name"
                    color="inherit"
                >
                    {<Avatar {...stringAvatar(`${user.user.name}`)} />}
                </IconButton>
                <p>{user.user.name}</p>
            </MenuItem>
            <Divider></Divider>
            {!darkMode &&
                <>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => setTheme('dark', true)} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DarkModeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dark Mode" />
                        </ListItemButton>
                    </List>
                </>
            }
            {darkMode &&
                <>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => setTheme('light', false)} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <LightMode />
                            </ListItemIcon>
                            <ListItemText primary="Light Mode" />
                        </ListItemButton>
                    </List>
                </>
            }

            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItemButton>
            </List>
            <List component="div" disablePadding>
                <ListItemButton onClick={signOut} sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClick}>
                <IconButton
                    size="large"
                    aria-label="account name"
                    color="inherit"
                >
                    {<Avatar {...stringAvatar(`${user.user.name}`)} />}
                </IconButton>
                <p>{user.user.name}</p>
                {open ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {!darkMode &&
                    <>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => setTheme('dark', true)} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DarkModeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dark Mode" />
                            </ListItemButton>
                        </List>
                    </>
                }
                {darkMode &&
                    <>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => setTheme('light', false)} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LightMode />
                                </ListItemIcon>
                                <ListItemText primary="Light Mode" />
                            </ListItemButton>
                        </List>
                    </>
                }
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <ListItemButton onClick={signOut} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Collapse>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            {loader &&<ContentLoader heading={`Applying theme !!!`}>
                        </ContentLoader>}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => props.openDrawer?.(true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Expense-Management
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Open settings">
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {<Avatar {...stringAvatar(`${user.user.name}`)} />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
