import { db } from 'firebase-folder/firebase';
import helpers from "services/helpers";
import { DOCUMENT_TYPES } from "services/constants";
import {
    MatchSchema,
    PlayerSchema,
    TurnSchema,
    TurnPlayerSchema,
} from "./schemas";

const { validateSchema, generateId } = helpers;

const collectionRef = () => db.collection(DOCUMENT_TYPES.MATCHS.description);

export const refMatch = collectionRef;

export const getMatchList = async () => {
    let documents = await collectionRef().where('deleted', '==', false).get();

    documents = documents.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return documents
};
const MAX_CARDS = 10;
export const addMatch = async (props = {}) => {
    let newObject = validateSchema(MatchSchema, props, true);
    for (let i = MAX_CARDS; i > 0; i--) {
        newObject.turns[i] = validateSchema(TurnSchema, { cardQuantity: MAX_CARDS - i + 1 }, true);
    }
    let res = await collectionRef().add({ ...newObject });
    return {
        ...newObject,
        id: res.id
    }
}

export const updateMatch = async ({ id, ...others }) => {
    let newObject = validateSchema(MatchSchema, others, false);
    await collectionRef().doc(id).update({ ...newObject });
    return newObject;
}

export const deleteMatch = async id => {
    await collectionRef().doc(id).update({ deleted: true });
}

export const listenerMatchList = (callback) => {
    return collectionRef()
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            let documents = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            callback(documents);
        })
}

export const addPlayerMatch = async ({ matchId, ...props }) => {
    let newObject = validateSchema(PlayerSchema, props, true);
    newObject.id = generateId(20);
    await collectionRef().doc(matchId).update({ [`players.${newObject.id}`]: newObject }, { merge: true })
}

export const updatePlayerMatch = async ({ matchId, playerId, ...props }) => {
    let newObject = validateSchema(PlayerSchema, props, false);
    await collectionRef().doc(matchId).update({ [`players.${playerId}`]: newObject }, { merge: true })
}

export const deletePlayerMatch = async ({ matchId, playerId }) => {
    await collectionRef().doc(matchId).update({ [`players.${playerId}.deleted`]: true }, { merge: true })
}

export const updateTurnPlayer = async ({ matchId, turnId, playerId, ...props }) => {
    let newObject = validateSchema(TurnPlayerSchema, props, false);
    await collectionRef().doc(matchId).set({ [`turns.${turnId}.players.${playerId}`]: newObject }, { merge: true })
}