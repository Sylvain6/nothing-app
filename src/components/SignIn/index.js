import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Grid from "@material-ui/core/Grid/Grid";
import nothing from "../../public/images/logo.png";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {PasswordForgetLink} from "../PasswordForget";

const SignInPage = () => (
    <div className='App withAnimation'>
        <SignInForm />
        <Grid container justify={"center"}>
            <Grid item xs={5}>
                <PasswordForgetLink />
            </Grid>
        </Grid>
        <Grid container justify={"center"}>
            <Grid>
                <SignUpLink />
            </Grid>
        </Grid>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div>
                <Grid container justify={"center"}>
                    <Grid>
                        <img src={nothing} alt="Nothing Logo" height="300" width="300"></img>
                    </Grid>
                </Grid>
                <form onSubmit={this.onSubmit}>
                    <Grid container justify={"center"}>
                        <Grid item xs={5}>
                            <TextField
                                style={{ margin: 8 }}
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                label="Email"
                                fullWidth
                                type="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"}>
                        <Grid item xs={5}>
                            <TextField
                                style={{ margin: 8 }}
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                label="Password"
                                fullWidth
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"}>
                        <Grid>
                            <br></br>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"}>
                        <Grid item xs={5}>
                            <Button type="submit" className="primary" disabled={isInvalid} style={{
                                backgroundColor: '#B793E6',
                                color:"white",
                                margin:"8px"
                            }}>
                                Sign In !
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"}>
                        <Grid>
                            {error && <p>{error.message}</p>}
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
