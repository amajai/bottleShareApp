import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";


const Header = ({ name, img, onImgTap }) => {
  return (
    <Card style={styles.cardStyle} transparent>
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
            <Text style={styles.profileName}>{name}</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
    cardStyle: {
      backgroundColor: "rgba(0,0,0,0.5)",
      borderBottomWidth: 1,
      borderColor: "rgb(192,192,192)",
    },
    cardItemStyle: {
      backgroundColor: 'red',
    },
  
    logoContainer: {
      height: 60,
      width: 60,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'red',
    },
    thumbnailName: { fontSize: 30, color: '#fff', fontWeight: "bold" },
    profileName: { fontSize: 20, color: '#fff', fontWeight: "bold" },
  });

export default Header;