import React, { useState, useEffect } from 'react'
import {  StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import { uuid } from '../../Constants';
import firebase from 'firebase';
import ShowUsers from '../components/ShowUsers';
import Loader from '../components/Loader';

function Members ({ navigation }) {
    const [loading, setLoading] = useState(false)

    const [userDetail, setUserDetail] = useState({
        id: "",
        name: "",
        profilePic: "",
    });
    const [allUsers, setAllUsers] = useState([]);
    const { profilePic, name } = userDetail;

    const nameTap = (guestUserId, guestUsername, guestPic) => {
        navigation.navigate("ChatScreen", {
            userName: name,
            userImage: profilePic,
            currentUserId: uuid,
            guestUsername: guestUsername,
            guestImage: guestPic,
            guestUserId: guestUserId,
        });

    };

    useEffect(() => {
        setLoading(true)
        try {
            firebase
                .database()
                .ref("user")
                .on("value", (dataSnapshot) => {
                    let users = [];
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
                        } else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                profilePic: child.val().profilePic,
                            });
                        }
                    });
                    setUserDetail(currentUser);
                    setAllUsers(users);
                    setLoading(false);
                });
        } catch (error) {
            alert(error);
            setLoading(false)
        }
    }, []);

    return (

        <SafeAreaView style={styles.container}>
            <Loader isShow={loading}/>
            <Text style={styles.mainText}>{allUsers.length} Members</Text>
            <FlatList
                data={allUsers}
                renderItem={({ item }) => (
                    <ShowUsers
                        name={item.name}
                        img={item.profilePic}
                        onNameTap={() => nameTap(item.id, item.name, item.profilePic)}
                        onImgTap={()=> navigation.navigate('ImagePreview', {name:item.name, img:item.profilePic})}
                    />)}
                keyExtractor={item => item.id}
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
    mainText:{
        fontSize:27,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'lightgreen',
        backgroundColor: 'black',
        paddingHorizontal:40,
        paddingVertical:5,
        borderRadius:50
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
});

export default Members  