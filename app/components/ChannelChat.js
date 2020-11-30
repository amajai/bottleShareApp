import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, CardItem } from "native-base";
import { uuid } from "../../Constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";


const renderItem = ({ item }) => {
    return (
        <View style={[styles.chatbox, {
            flexDirection: 'row',
            alignSelf: item.isCurrentUser ? 'flex-end' : 'flex-start',
            backgroundColor: item.isCurrentUser ? '#7cb342' : '#02897b',
            borderTopEndRadius: item.isCurrentUser ? 0 : 30,
            borderTopLeftRadius: !item.isCurrentUser ? 0 : 30,
        }]}>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.chatImg} source={{ uri: item.userImage }} />
                <View style={{width:'75%'}}>
                    <Text style={styles.sender}>{item.sender}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.message}>{item.message}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


const ChannelChat = ({ userId, msg, userName, userImage }) => {
    let isCurrentUser = userId === uuid ? true : false;
    return (
        <View style={{}}>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={[{ sender: userName, message: msg, isCurrentUser: isCurrentUser, userImage: userImage }]}
                renderItem={renderItem}
                inverted
                style={{ margin: 6 }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    chatbox: {
        padding: 20,
        borderRadius: 20,
        width: '70%'
    },
    message: {
        fontSize: 18,
        width:'60%',
        flex:1,
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10,
    },
    chatImg:{ 
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10,
    }
});

export default ChannelChat;
