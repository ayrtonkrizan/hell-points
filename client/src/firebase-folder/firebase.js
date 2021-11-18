import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/functions';
import config from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const analytics = firebase.analytics();
const functions = firebase.functions();

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
const FieldValue = firebase.firestore.FieldValue

export {
    db,
    analytics,
    auth,
    FieldValue,
    functions,
    storage,
    serverTimestamp
};