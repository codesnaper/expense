import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Auth } from 'aws-amplify';
import configure from '../../service/CognitoService';
import { NavigationLink } from '../../config/Configuration';
import { UserContext } from '../../context';
const pages = NavigationLink;

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

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<Element | null>(null);
    const [anchorElUser, setAnchorElUser] =React.useState<Element | null>(null);
    const user = React.useContext(UserContext);

    const handleOpenNavMenu = (event: React.MouseEvent<Element>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<Element>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<Element>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const handleUserMenu = (event:  React.MouseEvent<Element>) => {
        alert(JSON.stringify(event.target))
    };

    const signOut = async() => {
        configure();
        try {
            await Auth.signOut();
            sessionStorage.removeItem('user');
            window.location.href='/';
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        Expense - Management
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {/* <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        > */}
                            <MenuIcon />
                        {/* </IconButton> */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} href={page.link} onClick={handleCloseNavMenu}>
                                    {/* <Typography href={page.link} textAlign="center">{page.name}</Typography> */}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                href={page.link}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {<Avatar {...stringAvatar(`${user.name}`)} />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem disabled>
                               <ListItemText>{`${user.name}`.toUpperCase()}</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleUserMenu}>
                                <ListItemIcon>
                                    <PermIdentityIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">My Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={signOut}>
                                <ListItemIcon>
                                    <PowerSettingsNewIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center" >Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;