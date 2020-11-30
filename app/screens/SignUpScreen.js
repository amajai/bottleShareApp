import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Image, TouchableHighlight, TouchableOpacity, Button, Alert, StatusBar, Dimensions } from 'react-native';
import firebase from 'firebase';
import { keys, setAsyncStorage } from '../util/asyncStorage'
import firebaseConfig from '../../firebaseConfig';
import { setUniqueValue } from '../../Constants';

const window = Dimensions.get('window');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const SignUpRequest =  (email, password) => {
    try {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
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
function SignUpScreen({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { name, email, password, confirmPassword } = credentials;
    const handleChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        })
    }
    const onSignUp = () => {
        if (!name) {
            alert('Name is required!')
        } else if (!email) {
            alert('Email is required!')
        } else if (!password) {
            alert('Password is required!')
        } else if (password !== confirmPassword) {
            alert('Password does not match!')
        } else {
            setLoading(true)
            SignUpRequest(email, password)
                .then(() => {
                    let uid = firebase.auth().currentUser.uid;
                    let profilePic = '';
                    AddUser(name, email, uid, profilePic)
                        .then(() => {
                            setAsyncStorage(keys.uuid, uid);
                            setUniqueValue(uid);
                            setLoading(false)
                            navigation.replace('Dashboard')
                        })
                        .catch((err) => {
                            setLoading(false)
                            alert(err);
                        })
                })
                .catch(err => {
                    setLoading(false)
                    alert(err);
                })
        }
    }
    return !loading ? (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>BS</Text>
                <Text style={styles.text}>BottleShare</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contain2}>
                <TextInput
                    placeholder='Enter Name'
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <TextInput
                    placeholder='Enter Email'
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                <TextInput
                    placeholder='Enter Password'
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => handleChange('password', text)}
                />
                <TextInput
                    placeholder='Confirm Password'
                    style={styles.input}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                />

                <TouchableHighlight style={styles.btn} onPress={() => onSignUp()}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btn2} onPress={() => navigation.replace('Login')}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Log In</Text>
                </TouchableHighlight>
            </ ScrollView>
        </SafeAreaView>
    ) : <View style={styles.container}><ActivityIndicator size="large" color='red' /></View>
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
        fontSize: 24,
        fontWeight: 'bold'
    },
    logo: {
        top: 100,
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
        fontSize: 20,
        backgroundColor: 'green',
        width: window.width - 50,
        paddingLeft: 20,
        marginBottom: 20,
        borderRadius: 3,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingVertical: 14,
        borderRadius: 6,
        fontSize: 2,
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

export default SignUpScreen 