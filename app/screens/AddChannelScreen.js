import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, Dimensions } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import { uuid } from '../../Constants';

const window = Dimensions.get('window');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const AddChannel = (uid, channelName, userName) => {
    try {
        return firebase.database().ref('channels/').push({
            id: uid + channelName,
            name: channelName,
            channelImg: '',
            createdBy: userName
        })
    } catch (error) {
        return error;
    }
}

function AddChannelScreen({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [userName, setuserName] = useState({
        name: "",
    });
    const {name} = userName
    
    const [channelName, setChannelName] = useState('')
    
    useEffect(() => {
        setLoading(true)
        try {
            firebase
                .database()
                .ref("user")
                .on("value", (dataSnapshot) => {
                    let currentUser = {
                        name: "",
                    };
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.name = child.val().name;
                        }
                    });
                    setuserName(currentUser);
                    setLoading(false);
                });
        } catch (error) {
            alert(error);
            setLoading(false)
        }
    }, []);

    const onChange = (text) => {
        setChannelName(text)
    }

    const onChannelAdd = () => {
        if (!channelName) {
            alert('Channel name is required!')
        } else {
            AddChannel(uuid, channelName, name)
                .then(() => {
                    navigation.goBack()
                })
                .catch((err) => {
                    alert(err);
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contain2}>
                <TextInput
                    placeholder='Channel Name'
                    style={styles.input}
                    value={channelName}
                    onChangeText={(text) => onChange(text)}
                />
                <TouchableHighlight style={styles.btn} onPress={() => onChannelAdd()}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Add</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    contain2: {
        flex: 2,
        justifyContent: 'center',
    },
    text: {
        color: '#101010',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        top: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'green',
        paddingVertical: '3%',
        paddingHorizontal: '3%',
        borderRadius: 20,
    },
    input: {
        fontSize: 22,
        backgroundColor: 'green',
        width: window.width - 50,
        padding: 10,
        marginBottom: 20,
        borderRadius: 3,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingVertical: 14,
        borderRadius: 6,
        fontSize: 1,
        marginBottom: 10,
    },
    btn2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 14,
        borderRadius: 6,
        fontSize: 2,
        marginBottom: 10,
    }


});

export default AddChannelScreen 