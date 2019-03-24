import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import nothing from "../../public/images/logo.png";

const SignUpPage = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    onChange = event => { this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { username, email, passwordOne, roles } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            roles,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="App withAnimation">
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
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                label="Username"
                                margin="normal"
                                fullWidth
                                type="text"
                            />
                        </Grid>
                    </Grid>
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
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                label="Password"
                                fullWidth
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"}>
                        <Grid item xs={5}>
                            <TextField
                                name="passwordTwo"
                                style={{ margin: 8 }}
                                value={passwordTwo}
                                onChange={this.onChange}
                                label="Password Confirmation"
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
                            <Button type="submit" className="primary"  disabled={isInvalid}style={{
                                backgroundColor: '#B793E6',
                                color:"white",
                                margin:"8px"
                            }}>
                                Sign Up !
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


const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
