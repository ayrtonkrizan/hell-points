import React, { useState, useEffect } from 'react';
import { db } from "firebase-folder";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from "@material-ui/core/Paper";
import { List } from "./styles";

import {
    LockOpen,
    Lock
} from '@material-ui/icons';

const STATUS_ICON = {
    'opened': LockOpen,
    'closed': Lock
}

export default function FolderList({ defaultValues = {} }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const handleSnapshot = (docs) => {
            setList(docs.map(doc => ({ ...defaultValues, ...doc })))
        }
        return db.listenerMatchList(handleSnapshot);
    }, [defaultValues]);

    return (
        <List>
            {
                list.map(match => <Item key={match.id} {...match} />)
            }
        </List>
    );
}

function Item(props) {
    const {
        name = '',
        status = '',
    } = props;
    let Icon = STATUS_ICON[status] || STATUS_ICON.opened;
    return (
        <ListItem className="item" component={Paper} button>
            <ListItemAvatar>
                <Icon />
            </ListItemAvatar>
            <ListItemText primary={name} />
        </ListItem>
    )
}