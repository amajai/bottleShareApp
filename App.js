import React from 'react';
import { StyleSheet, StatusBar, Text, View, SafeAreaView, Image, TouchableHighlight, TouchableOpacity, Button, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import Dashboard from './app/screens/Dashboard';
import SplashScreen from './app/screens/SplashScreen';
import ChatScreen from './app/screens/ChatScreen';
import Channels from './app/screens/Channels';
import AddChannelScreen from './app/screens/AddChannelScreen';
import ChannelRoom from './app/screens/ChannelRoom';
import Members from './app/screens/Members';
import ImagePreview from './app/components/ImagePreview';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: '#34A853'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 28
        }
      }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Channels" component={Channels} />
        <Stack.Screen name="AddChannelScreen" component={AddChannelScreen} options={{headerTitle:'Add Channel'}} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Members" component={Members} />
        <Stack.Screen name="ChannelRoom" component={ChannelRoom} />
        <Stack.Screen name="ImagePreview" component={ImagePreview}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    width: '50%'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
