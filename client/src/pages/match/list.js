import React, { useState, useEffect } from 'react';
import { db } from "firebase-folder";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from "@material-ui/core/Paper";
import { List } from "./styles";

import {
    Edit,
    LockOpen,
    Lock
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ListItemSecondaryAction } from '@material-ui/core';
import IconButton from 'components/iconbutton';

const STATUS_ICON = {
    'opened': LockOpen,
    'closed': Lock
}

export default function FolderList({ defaultValues = {}, onSelect }) {
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
                list.map(match => <Item key={match.id} {...match} onSelect={onSelect} />)
            }
        </List>
    );
}

function Item({ onSelect, ...props }) {
    const history = useHistory();
    const {
        id,
        name = '',
        status = '',
    } = props;

    const handleClick = () => {
        history.push(`/match/${id}`)
    }
    let Icon = STATUS_ICON[status] || STATUS_ICON.opened;
    return (
        <ListItem className="item" component={Paper} button onClick={handleClick}>
            <ListItemAvatar>
                <Icon />
            </ListItemAvatar>
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => onSelect(props)}>
                    <Edit />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}