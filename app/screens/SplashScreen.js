import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableHighlight, TouchableOpacity, Button, Alert, StatusBar } from 'react-native';
import firebase from 'firebase';
import { keys, setAsyncStorage, getAsyncStorage } from '../util/asyncStorage'
import firebaseConfig from '../../firebaseConfig';
import { setUniqueValue } from '../../Constants';

function SplashScreen({ navigation }) {
    useEffect(() => {
        const redirect = setTimeout(() => {
            getAsyncStorage(keys.uuid)
                .then((uuid) => {
                    if (uuid) {
                        setUniqueValue(uuid);
                        navigation.replace('Dashboard');
                    } else {
                        navigation.replace('Login');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    navigation.replace('Login');
                });
        }, 4000);
        return () => clearTimeout(redirect);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>BS</Text>
                <Text style={styles.text}>BottleShare</Text>
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
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'green',
        paddingVertical: '3%',
        paddingHorizontal: '3%',
        borderRadius: 20,
    },
});

export default SplashScreen  