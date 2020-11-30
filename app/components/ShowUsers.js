import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";

const window = Dimensions.get('window');

const ShowUsers = ({ name, img, onNameTap, onImgTap}) => {
    return (
        <Card style={styles.cardStyle}>
            <CardItem style={styles.cardItemStyle}>
                <Left>
                    <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
                        {img ? (
                            <Thumbnail source={{ uri: img }} resizeMode="cover" />
                        ) : (
                                <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
                            )}
                    </TouchableOpacity>

                    <Body>
                        <Text style={styles.profileName} onPress={onNameTap}>
                            {name}
                        </Text>
                    </Body>
                </Left>
            </CardItem>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: "rgba(0,0,0,0.7)",
        borderBottomWidth: 1,
        borderColor: 'green',
        width: window.width - 20,
    },
    cardItemStyle: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    logoContainer: {
        height: 60,
        width: 60,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'darkgreen',
    },
    thumbnailName: {
        fontSize: 25,
        color: '#fff',
        fontWeight: "bold",
    },
    profileName: {
        fontSize: 25,
        color: 'lightgreen',
        fontWeight: "bold"
    },
});

export default ShowUsers;