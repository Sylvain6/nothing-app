import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

const PasswordForgetPage = () => (
    <div>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
    info: '',
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.setState({info: 'You received a email !'});
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
        const { email, error, info } = this.state;

        const isInvalid = email === '';

        return (
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
                        <Button type="submit" className="primary"  disabled={isInvalid}style={{
                            backgroundColor: '#B793E6',
                            color:"white",
                            margin:"8px"
                        }}>
                            Reset my password
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify={"center"}>
                    <Grid item xs={5}>
                        {info && <p>{info}</p>}
                    </Grid>
                </Grid>
                <Grid container justify={"center"}>
                    <Grid item xs={5}>
                        {error && <p>{error.message}</p>}
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
