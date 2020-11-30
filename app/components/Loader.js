import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, Platform, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window')

function Loader({ isShow }) {
    return (
        isShow ? <SafeAreaView style={styles.loaderContainer} >
                    <ActivityIndicator style={styles.loader} size="large" color='white' />
                </SafeAreaView> : <Text></Text>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: width,
        height: height,
        zIndex: 100
    },
    loader: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default Loader
