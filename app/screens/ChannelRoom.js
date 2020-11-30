import React, { useLayoutEffect, useState, useEffect } from 'react'
import {
    StyleSheet, View, KeyboardAvoidingView, Text, SafeAreaView, Image, TextInput, TouchableOpacity, FlatList
} from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ChatBox from '../components/ChatBox';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import ChannelChat from '../components/ChannelChat';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function ChannelRoom({ route, navigation }) {
    const { params } = route;
    const { userName, currentUserId, userImage, channelName, channelId } = params;
    const [msgValue, setMsgValue] = useState("");
    const [messeges, setMesseges] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{channelName}</Text>
        })
    }, [navigation])

    useEffect(() => {
        try {
            firebase
                .database()
                .ref(`channels/${channelId}/messages`)
                .on("value", (dataSnapshot) => {
                    let msgs = [];
                    dataSnapshot.forEach((child) => {
                        msgs.push({
                            sendBy: child.val().senderName,
                            senderId: child.val().sender,
                            msg: child.val().msg,
                            senderImage:child.val().senderImage
                        });
                    });
                    setMesseges(msgs.reverse());
                });
        } catch (error) {
            alert(error);
        }
    }, []);

    const senderMsg = async (msgValue, currentUserId, currentUserName, channelId, userImage) => {
        try {
            return await firebase
                .database()
                .ref('channels/')
                .child(channelId)
                .child('messages/')
                .push({
                    sender: currentUserId,
                    senderName: currentUserName,
                    senderImage: userImage,
                    msg: msgValue,
                });

        } catch (error) {
            return error;
        }
    };

    const handleSend = () => {
        setMsgValue("");
        if (msgValue) {
            senderMsg(msgValue, currentUserId, userName, channelId, userImage)
                .then(() => { })
                .catch((err) => {
                    alert(err)});
        }
    };

    const handleOnChange = (text) => {
        setMsgValue(text);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        inverted
                        data={messeges}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <ChannelChat
                                msg={item.msg}
                                userId={item.senderId}
                                userName={item.sendBy}
                                userImage={item.senderImage}
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
                        onChangeText={(text) => handleOnChange(text)}
                    />
                    <TouchableOpacity onPress={() => handleSend()}>
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

export default ChannelRoom;