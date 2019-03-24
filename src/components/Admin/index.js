import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { withFirebase } from '../Firebase';
import Grid from "@material-ui/core/Grid/Grid";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import avatar from '../../public/images/avatar.svg';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
            const { users, loading } = this.state;
        return (
            <div>
                <Grid container justify={"center"}
                      style={{
                          marginTop: '100px',
                      }}>
                    <Grid>
                        { loading && <Loader
                            type="CradleLoader"
                            height="100"
                            width="100"
                        /> }
                    </Grid>
                </Grid>
                <Grid container justify={"center"}>
                    <Grid>
                        <UserListTest users={users} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const UserListTest = ({ users }) => (
    <Grid item xs={12} md={6}>
        <div>
            <List>
                {users.map(user => (
                    <ListItem key={user.uid}>
                        <ListItemAvatar>
                            <Avatar>
                                <img src={avatar} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.username}
                            secondary={user.email}
                        />
                    </ListItem>
                    ))}
            </List>
        </div>
    </Grid>
);


export default withFirebase(AdminPage);
