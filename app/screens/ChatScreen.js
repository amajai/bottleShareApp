import React, { useLayoutEffect, useState, useEffect } from 'react'
import {
     StyleSheet, View, KeyboardAvoidingView, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ChatBox from '../components/ChatBox';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import Loader from '../components/Loader';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


function ChatScreen({ route, navigation }) {
    const { params } = route;
    const { userName,
        currentUserId,
        guestUsername,
        guestUserId } = params;

    const [loading, setLoading] = useState(false)
    const [msgValue, setMsgValue] = useState("");
    const [messeges, setMesseges] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{guestUsername}</Text>
        })
    }, [navigation])

    useEffect(() => {
        setLoading(true)
        try {
            firebase
                .database()
                .ref("messeges")
                .child(currentUserId)
                .child(guestUserId)
                .on("value", (dataSnapshot) => {
                    let msgs = [];
                    dataSnapshot.forEach((child) => {
                        msgs.push({
                            sendBy: child.val().messege.senderName,
                            senderId: child.val().messege.sender,
                            recievedBy: child.val().messege.reciever,
                            msg: child.val().messege.msg,
                        });
                    });
                    setMesseges(msgs.reverse());
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            alert(error);
        }
    }, []);

    const senderMsg = async (msgValue, currentUserId, currentUserName, guestUserId) => {
        try {
            return await firebase
                .database()
                .ref('messeges/' + currentUserId)
                .child(guestUserId)
                .push({
                    messege: {
                        sender: currentUserId,
                        senderName: currentUserName,
                        reciever: guestUserId,
                        msg: msgValue
                    },
                });
                
        } catch (error) {
            return error;
        }
    };

    const recieverMsg = async (msgValue, currentUserId, currentUserName, guestUserId) => {
        try {
            return await firebase
                .database()
                .ref('messeges/' + guestUserId)
                .child(currentUserId)
                .push({
                    messege: {
                        sender: currentUserId,
                        senderName: currentUserName,
                        reciever: guestUserId,
                        msg: msgValue
                    },
                });
        } catch (error) {
            return error;
        }
    };

    const handleSend = () => {
        setMsgValue("");
        if (msgValue) {
            senderMsg(msgValue, currentUserId, userName, guestUserId)
                .then(() => { })
                .catch((err) => alert(err));

            recieverMsg(msgValue, currentUserId, userName, guestUserId)
                .then(() => { })
                .catch((err) => alert(err));
        }
    };

    const handleOnChange = (text) => {
        setMsgValue(text);
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isShow={loading}/>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        inverted
                        data={messeges}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <ChatBox
                                msg={item.msg}
                                userId={item.senderId}
                                userName={item.sendBy}
                            />
                        )}
                    />
                </View>
                {/* Send Message */}
                <View style={styles.footer}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Type Here"
                        value={msgValue}
                        onChangeText={(text)=>handleOnChange(text)}
                    />
                    <TouchableOpacity onPress={()=>handleSend()}>
                        <FontAwesome
                            name="send"
                            color='green'
                            style={styles.send}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        alignItems: "center",
        justifyContent: "flex-end",
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
        flex: 1,
    },
    send: {
        fontSize: 30,
        padding: 20,
    }
});

export default ChatScreen;