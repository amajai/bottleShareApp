import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, Right } from "native-base";

const window = Dimensions.get('window');

const ChannelButton = ({ name, onNameTap, createdBy }) => {
    return (
        <Card style={styles.cardStyle}>
            <CardItem style={styles.cardItemStyle}>
                <Left>
                    <Body style={{}}>
                        <Text style={styles.profileName} onPress={onNameTap}>
                            {name}
                        </Text>
                        
                            <Text style={{color:'black', fontSize:10, fontWeight: 'bold'}}>Created by: {createdBy}</Text>
                       
                    </Body>
                </Left>
            </CardItem>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: "black",
        width: window.width - 20,
    },
    cardItemStyle: {
        backgroundColor: "green",
    },
    thumbnailName: {
        fontSize: 25,
        color: '#fff',
        fontWeight: "bold",
    },
    profileName: {
        fontSize: 25,
        color: '#fff',
        fontWeight: "bold"
    },
});

export default ChannelButton;