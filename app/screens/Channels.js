import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, Platform, SafeAreaView, Image, FlatList, Button, Alert, View } from 'react-native';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { uuid, smallDeviceHeight } from '../../Constants';
import firebase from 'firebase';
import MainLinkButtons from '../components/MainLinkButtons';
import ChannelButton from '../components/ChannelButton';
import Loader from '../components/Loader';


function Channels({route, navigation }) {
    const { params } = route;
    const {id, name, profilePic} = params
    const [allChannels, setAllChannels] = useState([])
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Entypo
                    name="plus"
                    size={30}
                    color='white'
                    style={{ right: 15 }}
                    onPress={() => navigation.navigate('AddChannelScreen')}
                />
            )
        })
    }, [navigation])

    useEffect(() => {
        try {
            setLoading(true)
            firebase
                .database()
                .ref("channels/")
                .on("value", (dataSnapshot) => {
                    let channels = [];
                    dataSnapshot.forEach((child) => {
                        channels.push({
                            channelId: child.key,
                            name: child.val().name,
                            channelImg: child.val().channelImg,
                            createdBy: child.val().createdBy
                        });

                    });
                    
                    setAllChannels(channels);
                    setLoading(false)
                });
        } catch (error) {
            setLoading(false)
            alert(error);
        }
    }, []);

    const ChannelNameTap = (channelName,channelId) => {
        navigation.navigate("ChannelRoom", {
            userName: name,
            userImage: profilePic,
            currentUserId: id? id:'',
            channelName:channelName,
            channelId:channelId
        });

    };

    return (
        <SafeAreaView style={{padding:20}}>
            <Loader isShow={loading}/>
            <FlatList
                data={allChannels}
                renderItem={({ item }) => (
                    <ChannelButton
                        name={item.name}
                        createdBy={item.createdBy}
                        onNameTap={() => ChannelNameTap(item.name, item.channelId)}
                    />)}
                keyExtractor={item => item.channelId}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ebebeb',
    },
    text: {
        color: '#101010',
        fontSize: 25,
        fontWeight: 'bold'
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 100,
        borderColor: 'green',
        borderWidth: 2,
    },
    imagePicker: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 100
    },
    default: {
        backgroundColor: 'darkgreen',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        color: '#fff',
        fontSize: 75,
        fontWeight: 'bold'
    },
    avatarHolder: {
        marginVertical: 10
    },
    nameEditor: {

    }
});

export default Channels 