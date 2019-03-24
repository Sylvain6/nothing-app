import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import Grid from "@material-ui/core/Grid/Grid";

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
    <div>
        <Grid container justify={"center"}>
            <Grid>
                <h1>Account: {authUser.email}</h1>
            </Grid>
        </Grid>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
