import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";

const window = Dimensions.get('window');

const MainLinkButtons = ({ name, onNameTap }) => {
    return (
        <Card style={styles.cardStyle}>
            <CardItem style={styles.cardItemStyle}>
                <Left>
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
        backgroundColor: "#34A853",
        width: window.width - 20,
    },
    cardItemStyle: {
        backgroundColor: "#34A853",
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

export default MainLinkButtons;