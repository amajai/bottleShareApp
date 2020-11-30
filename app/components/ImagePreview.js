import { View } from 'native-base';
import React, {useLayoutEffect} from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, Image, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window')

function ImagePreview({navigation, route}) {
    const { params } = route;
    const { name, img } = params;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>
        })
    }, [navigation])

    return (
        <SafeAreaView style={{backgroundColor:'black'}}>
            {img?<Image 
                source={{uri:img}}
                style={styles.imgPreview}
                resizeMode='contain'
            />: <View style={styles.contain}><Text style={styles.text}>{name.charAt(0)}</Text></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imgPreview: {
        height:height,
        width: width,
    },
    contain: {
        height:height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color:'#fff',
        fontSize:250,
        fontWeight: 'bold'
    }
});

export default ImagePreview
