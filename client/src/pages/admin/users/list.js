import React, { useState, useEffect } from 'react';
import { db } from "firebase-folder";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from "@material-ui/core/Paper";
import { List } from "./styles";

import AccountCircle from '@material-ui/icons/AccountCircle';

export default function FolderList({ defaultValues = {} }) {
    const [list, setList] = useState([]);
    
    useEffect(() => {
        const handleUsers = (users) => {
            setList(users.map(u => ({ ...defaultValues, ...u })))
        }
        return db.listenerUsersList(handleUsers);
    }, [defaultValues]);
    
    return (
        <List>
            {
                list.map(user => <Item key={user.id} {...user} />)
            }
        </List>
    );
}

function Item(props) {
    const {
        email = '',
        displayName = '',
        photoURL = '',
    } = props;
    return (
        <ListItem className="item" component={Paper} button>
            <ListItemAvatar>
                {
                    photoURL
                        ? <Avatar alt={`Foto de ${displayName}`} src={photoURL} />
                        : <Avatar><AccountCircle /></Avatar>
                }
            </ListItemAvatar>
            <ListItemText primary={email} secondary={displayName} />
        </ListItem>
    )
}