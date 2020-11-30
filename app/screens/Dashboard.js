import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, Platform, SafeAreaView, Image, FlatList, Button, Alert, View } from 'react-native';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { uuid, mainButtonLinksData } from '../../Constants';
import firebase from 'firebase';
import { clearAsyncStorage } from '../util/asyncStorage';
import * as ImagePicker from 'expo-image-picker';
import ShowUsers from '../components/ShowUsers';
import MainLinkButtons from '../components/MainLinkButtons';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const logOutUser = () => {
    try {
        return firebase.auth().signOut()
    } catch (error) {
        return error
    }
}
const updateUserName = (uuid, newName) => {
    try {
        return firebase
            .database()
            .ref("user/" + uuid)
            .update({
                name: newName,
            });
    } catch (error) {
        return error;
    }

};

const updateUserImage = (uuid, imgSource) => {
    try {
        return firebase
            .database()
            .ref("user/" + uuid)
            .update({
                profilePic: imgSource,
            });
    } catch (error) {
        return error;
    }
};

const imgCheck = () => {
    (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    })();
}


function Dashboard({ navigation }) {
    const [loading, setLoading] = useState(false)

    const [userDetail, setUserDetail] = useState({
        id: "",
        name: "",
        profilePic: "",
    });

    const { profilePic, name } = userDetail;
    const [editingName, setEditingName] = useState('')
    const [toEditName, setToEditName] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Entypo
                    name="log-out"
                    size={30}
                    color='white'
                    style={{ right: 15 }}
                    onPress={() => Alert.alert(
                        'Logout',
                        'Are you sure you want to logout',
                        [
                            {
                                text: 'Yes',
                                onPress: () => logOut()
                            },
                            {
                                text: 'No'
                            }
                        ],
                        {
                            cancelable: false
                        }
                    )} />
            )
        })
    }, [navigation])

    useEffect(() => {
        imgCheck()
        setLoading(true)
        try {
            firebase
                .database()
                .ref("user")
                .on("value", (dataSnapshot) => {
                    let currentUser = {
                        id: "",
                        name: "",
                        profilePic: "",
                    };
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.profilePic = child.val().profilePic;
                        }
                    });
                    setUserDetail(currentUser);
                    setLoading(false);
                    setEditingName(currentUser.name)

                });
        } catch (error) {
            alert(error);
            setLoading(false)
        }
    }, []);




    const logOut = () => {
        logOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        navigation.replace('Login')
                    })
                    .catch(err => { alert(err) })
            })
            .catch(err => { alert(err) })
    }

    const editName = () => {
        setToEditName(true)
    }

    const edit = () => {
        setToEditName(false)
        updateUserName(uuid, editingName)
            .then(() => {
                setUserDetail({
                    ...userDetail,
                    name: editingName,
                });
            })
            .catch(err => {
                alert(err)
            })
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            let source = "data:image/jpeg;base64," + result.base64
            setLoading(true)
            updateUserImage(uuid, source)
                .then(() => {
                    setUserDetail({
                        ...userDetail,
                        profilePic: source,
                    });
                    setLoading(false)
                })
                .catch(err => {
                    alert(err)
                    setLoading(false)
                })
            setLoading(false)
        }
    };

    const handleOnNameChange = (text) => {
        setEditingName(text);
    };

    return (

        <SafeAreaView style={styles.container}>
            <Loader isShow={loading} />
            <View style={styles.avatarHolder}>
                {profilePic ?
                    <TouchableOpacity onPress={() => navigation.navigate('ImagePreview', { name: name, img: profilePic })}>
                        <Image source={{ uri: userDetail.profilePic }} style={styles.avatar} resizeMode="cover" />
                    </TouchableOpacity>
                    :
                    <View style={[styles.avatar, styles.default]}>
                        <Text style={styles.name}>{userDetail.name.charAt(0)}</Text>
                    </View>
                }
                <FontAwesome
                    name="camera"
                    size={20}
                    color='white'
                    style={styles.imagePicker}
                    onPress={pickImage} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom:20 }}>
                {!toEditName ?
                    <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'flex-start' }}>
                        <Text style={[styles.text, { marginRight: 5 }]}>{userDetail.name}</Text>
                        <FontAwesome5
                            name="edit"
                            size={20}
                            color='#34A853'
                            style={styles.nameEditor}
                            onPress={editName}
                        />
                    </View>
                    :
                    <TextInput style={[styles.text, { backgroundColor: '#34A853', paddingHorizontal: 10 }]}
                        value={editingName}
                        onChangeText={(text) => handleOnNameChange(text)}
                        selectionColor='skyblue' selectTextOnFocus={true}
                        onEndEditing={edit} />
                }
            </View>

            <FlatList
                data={mainButtonLinksData}
                renderItem={({ item }) => (
                    <MainLinkButtons
                        name={item.name}
                        onNameTap={() => navigation.navigate(item.navigation, userDetail)}
                    />)}
                keyExtractor={(_, item) => item.toString()}
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

export default Dashboard 