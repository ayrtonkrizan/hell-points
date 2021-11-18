import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AppBar from './styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from "@material-ui/core/Avatar";
import {
    AccountCircle,
} from '@material-ui/icons';

import { AppContext } from "contexts/appContext";

function Page() {
    const store = useContext(AppContext);
    const [avatarUrl, setAvatarUrl] = useState('');
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const {
        signed,
        handleSignout,
        profile,
    } = store;

    const handleUserMenu = event => {
        if (!signed)
            history.push('/signin')
        else
            setAnchorEl(event.currentTarget);
    }

    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleSignout();
        handleClose();
    }

    useEffect(() => {
        if (profile.photoURL) {
            let img = new Image();
            img.onload = () => {
                setAvatarUrl(profile.photoURL);
            }
            img.onerror = () => {
                setAvatarUrl('');
            }
            img.src = profile.photoURL;
        }
        else
            setAvatarUrl('');
    }, [profile])

    return (
        <AppBar position="fixed" className="app-bar" color="secondary">
            <Toolbar className="toolbar">
                <Link to="/">
                    <Avatar src="/logo.jpg" />
                </Link>
                <div className="no-print actions-container">
                    {
                        signed
                            ? <IconButton
                                onClick={handleUserMenu}
                                color="inherit"
                            >
                                {
                                    Boolean(avatarUrl)
                                        ? <Avatar src={profile.photoURL} />
                                        : <AccountCircle />
                                }
                            </IconButton>
                            : <Link to="/signin">Login</Link>
                    }
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem><Link to="/me">Meu Perfil</Link></MenuItem>
                        <MenuItem><Link to="/orders">Meus Pedidos</Link></MenuItem>
                        <MenuItem><Link to="/items?favorites=true">Meus Favoritos</Link></MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Page