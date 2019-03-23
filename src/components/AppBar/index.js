import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuLogo from '../../public/images/mini-logo.png';
import SignOutButton from '../SignOut';

const Appbar = ({ authUser }) => (
    <div>{authUser ? <AuthBar /> : <NonAuthBar />}</div>
);

const AuthBar = () => (
    <>
        <AppBar position="static" color='#B793E6'>
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <img src={MenuLogo} width='50px' height='50px' />
                </IconButton>
                <Typography variant="title" color="inherit">
                    Nothing App
                </Typography>
                <SignOutButton/>
            </Toolbar>
        </AppBar>
    </>
);

const NonAuthBar = () => (
    <>
        <AppBar position="static" color='#B793E6'>
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <img src={MenuLogo} width='50px' height='50px' />
                </IconButton>
                <Typography variant="title" color="inherit">
                    Nothing App
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </>
);

export default Appbar;
