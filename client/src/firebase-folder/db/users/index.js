import { db } from 'firebase-folder/firebase';
import { auth } from "firebase-folder"
import helpers from "services/helpers";
import { DOCUMENT_TYPES } from "services/constants";
import {
    Users as UsersSchema,
    UsersAddress as UsersAddressSchema,
} from "./schemas";

const { validateSchema, generateId } = helpers;

const collectionRef = () => db.collection(DOCUMENT_TYPES.USER.description);

export const refUsers = collectionRef;

export const getUsersByEmail = async email => {
    let doc = await collectionRef().doc(email).get();

    if (!doc.exists) return;
    return {
        id: doc.id,
        ...doc.data(),
        email,
    }
};

export const getUsersList = async () => {
    let documents = await collectionRef().get();

    documents = documents.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return documents
};

export const addUsers = async (props = {}) => {
    const { email, password } = props;
    const originalUser = auth.currentUser();
    let newObject = validateSchema(UsersSchema, props, true);
    await collectionRef().doc(email).set({ ...newObject });
    const newUser = await auth.doCreateUserWithEmailAndPassword(email, password);
    if (newObject.displayName)
        await newUser.user.updateProfile({ displayName: newObject.displayName })
    if (originalUser)
        await auth.updateCurrentUSer(originalUser);

    return {
        ...newObject,
        id: email
    }
}

export const updateUsers = async ({ id, ...others }) => {
    let newObject = validateSchema(UsersSchema, others, false);
    await collectionRef().doc(id).update({ ...newObject });
    return newObject;
}

export const deleteUsers = async id => {
    await collectionRef().doc(id).update({ deleted: true });
}

export const listenerUsersList = (callback) => {
    return collectionRef()
        .where('deleted', '==', false)
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

export const addUsersAddress = async ({ userId, ...props } = {}) => {
    let id = generateId(20);
    let newObject = validateSchema(UsersAddressSchema, props, true);
    newObject.id = id;
    await collectionRef().doc(userId).update({ [`addresses.${id}`]: newObject });
    return newObject;
}

export const updateUsersAddress = async ({ userId, id, ...props } = {}) => {
    let newObject = validateSchema(UsersAddressSchema, props, false);
    newObject.id = id;
    await collectionRef().doc(userId).update({ [`addresses.${id}`]: newObject });
    return newObject;
}

export const toggleUserFavoriteItem = async ({ userId, itemId, favorite }) => {
    await collectionRef().doc(userId).update({ [`items.${itemId}`]: Boolean(favorite) })
}