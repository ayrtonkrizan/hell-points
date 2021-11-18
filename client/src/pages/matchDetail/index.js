import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import {
    Tab,
    Tabs,
} from "@material-ui/core";
import List from "./list";
import Game from "./game";
import Tables from "./tabels";
import { useParams } from "react-router-dom";
import { db } from "firebase-folder";

const DEFAULT_VALUES = {
    id: '',
    name: '',
    score: 0
}

const FORMS = [Game, List, Tables];

function Page() {
    const [matchData, setMatchData] = useState({});
    const [tab, setTab] = useState(0);
    const { id: matchId } = useParams();
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const Form = FORMS[tab];

    useEffect(() => {
        return db.refMatch().doc(matchId).onSnapshot((snapshot) => {
            let doc = {}
            if (snapshot.exists) {
                doc = {
                    id: matchId,
                    ...snapshot.data()
                }
            }
            setMatchData(doc);
        })
    }, [matchId]);

    return (
        <Container>
            <Tabs
                value={tab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Game" />
                <Tab label="Ranking" />
                <Tab label="Tabelas" />
            </Tabs>
            <Form matchId={matchId} matchData={matchData} />
        </Container>
    )
}

export default Page;
