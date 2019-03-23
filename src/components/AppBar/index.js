import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuLogo from '../../public/images/mini-logo.png';
import SignOutButton from '../SignOut';
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from '../Session';

const Appbar = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <AuthBar /> : <NonAuthBar />
        }
    </AuthUserContext.Consumer>
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
                <Button color="inherit" href={ROUTES.SIGN_IN}>Login</Button>
                <Button color="inherit" href={ROUTES.SIGN_UP}>Sign Up</Button>
            </Toolbar>
        </AppBar>
    </>
);

export default Appbar;
