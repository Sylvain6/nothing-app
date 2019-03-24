import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    info: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.setState({info: 'Your password has changed'});
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
        const { passwordOne, passwordTwo, error, info } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}>
                <Grid container justify={"center"}>
                    <Grid item xs={5}>
                        <TextField
                            style={{ margin: 8 }}
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            label="New Password"
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
                            label="New Password Confirmation"
                            fullWidth
                            type="password"
                        />
                    </Grid>
                </Grid>
                <Grid container justify={"center"}>
                    <Grid item xs={5}>
                <Button type="submit" className="primary" disabled={isInvalid} style={{
                    backgroundColor: '#B793E6',
                    color:"white",
                    margin:"8px"
                }}>
                    Change My Password
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

export default withFirebase(PasswordChangeForm);
