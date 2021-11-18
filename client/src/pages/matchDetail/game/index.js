import React, { useState, useContext } from "react";
import { db } from "firebase-folder";
import { GameContainer } from "../styles";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import { DeleteIconButton } from "components/iconbutton";
import { ToastContext } from "contexts/toastContext";
import Settings from "./settings";

function Page({ matchId, matchData = {} }) {
    const [fldValue, setFldValue] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useContext(ToastContext);

    const {
        players = {},
        currentTurn = 10,
        turns = {}
    } = matchData;

    const turnData = turns[currentTurn];
    console.log(turnData);

    const handleChange = evnt => {
        if (!evnt || !evnt.target) return;
        setFldValue(evnt.target.value);
    }

    const handleKeyDown = async evnt => {
        if (evnt.keyCode === 13) {
            setLoading(true);
            try {
                await db.addPlayerMatch({ matchId, name: fldValue });
                setFldValue('');
                toast.success("Jogador salvo!");
            }
            catch (err) {
                console.error(err);
                toast.error("Falha ao adicionar jogador!");
            }
            finally {
                setLoading(false);
            }
        }
    }

    return (
        <GameContainer>
            <div className="column">
                <Typography color="primary" variant="h6" align="center">Jogadores</Typography>
                <TextField
                    disabled={loading}
                    fullWidth
                    label="Novo Jogador"
                    helperText="Aperte enter para salvar"
                    value={fldValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <List>
                    {
                        Object.values(players).map(p => <Item matchId={matchId} player={p} toast={toast} />)
                    }
                </List>
            </div>
            <Settings currentTurn={currentTurn} turnData={turnData} turns={turns} />
        </GameContainer>
    )
}
export default Page;

const Item = ({ player, matchId, toast }) => {
    const handleDelete = async () => {
        try {
            await db.deletePlayerMatch({ playerId: player.id, matchId });
            toast.success("Jogador removido");
        }
        catch (err) {
            console.error(err);
            toast.error("Falha ao remover jogador");
        }
    }
    if (player.deleted)
        return <></>;

    return (
        <ListItem key={player.id} component={(props) => <Paper component="li" {...props} />}>
            <ListItemAvatar>{player.score}</ListItemAvatar>
            <ListItemText primary={player.name} />
            <ListItemSecondaryAction>
                <DeleteIconButton deleteIconColor="primary" onClick={handleDelete} />
            </ListItemSecondaryAction>
        </ListItem>
    )
}
