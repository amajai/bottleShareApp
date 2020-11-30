import firebase from 'firebase';
import { LogBox, YellowBox } from 'react-native';

// absolutely nothing to see here...
const config = {
    apiKey: "AIzaSyCsGNnda59VABi_d9GQXN3QmBuYwTbvnoc",
    authDomain: "chatapp-980d3.firebaseapp.com",
    databaseURL: "https://chatapp-980d3.firebaseio.com",
    projectId: "chatapp-980d3",
    storageBucket: "chatapp-980d3.appspot.com",
    messagingSenderId: "532299418745",
    appId: "1:532299418745:web:eb15b3f74ad626c63d18a8",
    measurementId: "G-HHWW4LFR1E"
};

firebase.initializeApp(config);

const loginRequest = async (email, password) => {
    try {
        return await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
}

const SignUpRequest = async (email, password) => {
    try {
        return await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        return error;
    }
}

const AddUser = async (name, email, uid, profilePic) => {
    try {
        return await firebase.database().ref('user/' + uid).set({
            name: name,
            email: email,
            uuid: uid,
            profilePic: profilePic
        })
    } catch (error) {
        return error;
    }
}

// Firebase does dumb things with timeouts,
// which causes warnings on Android. Ignore.
// console.ignoredYellowBox = ['Setting a timer for a long period of time'];
// YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

LogBox.ignoreLogs('Setting a timer for a long period of time')
const normalizeChannelName = channel => (channel || 'default').toLowerCase();
/**
 * Send a message
 */
export const send = ({
    channel,
    sender = 'Anonymous',
    message = null,
    avatar = null
}) => {
    if (message === '') {
        return Promise.resolve();
    }
    if (message === null) {
        throw new Error('A message body is required');
    }

    const timestamp = new Date().toISOString();
    return firebase.database()
        .ref(normalizeChannelName(channel))
        .push({ sender, message, avatar, timestamp });
};

/**
 * Subscribe to message updates
 */

let currentQuery;
let currentCallback;

export const subscribe = (channel, callback, maxMessages = 100) => {
    if (!channel) {
        throw new Error('Channel name required!');
    }

    if (!callback) {
        throw new Error('A subscription callback required!');
    }

    // only allow a single subscription at once,
    // unsubscribe from previous rooms
    if (currentQuery && currentCallback) {
        currentQuery.off('value', currentCallback);
        currentQuery = null;
        currentCallback = null;
    }

    currentQuery = firebase.database()
        .ref(normalizeChannelName(channel))
        .limitToLast(maxMessages);
    currentCallback = callback;

    currentQuery.on('value', snapshot => {
        const data = snapshot.val();
        const messages = [];
        for (const key in data) {
            const { sender, message, avatar, timestamp } = data[key];
            messages.unshift({
                key,
                sender,
                message,
                timestamp: timestamp ? new Date(timestamp) : new Date(2000, 0, 1),
                avatar: avatar || 'http://i.imgur.com/h5mhz8A.png'
            });
        }

        callback(messages);
    });
};