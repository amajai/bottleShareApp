import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableHighlight, TouchableOpacity, Button, Alert, StatusBar, Dimensions } from 'react-native';
import firebase from 'firebase';
import { keys, setAsyncStorage } from '../util/asyncStorage'
import firebaseConfig from '../../firebaseConfig';
import { setUniqueValue } from '../../Constants';

const window = Dimensions.get('window');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const loginRequest = (email, password) => {
    try {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
}

function SignInScreen({ navigation }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const { email, password } = credentials;
    const handleChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        })
    }
    const onLogIn = () => {
        if (!email) {
            alert('Email is required!')
        } else if (!password) {
            alert('Password is required!')
        } else {
            setLoading(true)
            loginRequest(email, password)
                .then((res) => {
                    setAsyncStorage(keys.uuid, res.user.uid)
                    setUniqueValue(res.user.uid);
                    setLoading(false)
                    navigation.replace('Dashboard')
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
            <View style={styles.contain2}>
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

                <TouchableHighlight style={styles.btn} onPress={() => onLogIn()}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btn2} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableHighlight>


            </View>
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

export default SignInScreen 