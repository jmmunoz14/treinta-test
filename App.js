import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './components/Main/MainView';
import firebase from './firebase/firebase';
import Signin from './components/login/Signin';
import MapsComponent from './components/Main/MapsComponent';
import Info from './components/Main/Info';



const Stack = createStackNavigator();


export default class App extends Component {

  state = {
    loaded: true,
    loadedUser: false,
  }



  componentDidMount() {


    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        if (!this.state.loadedUser)
          this.setState({ loadedUser: true })
      } else {
        null;
      }
    });
  }

  render() {
    return (
      <NavigationContainer>

        { this.state.loadedUser ? (<Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={MainView} />
          <Stack.Screen name="Signin" component={Signin} />

        </Stack.Navigator>) :

          (<Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={MainView} />
            <Stack.Screen name="Maps" component={MapsComponent} />
            <Stack.Screen name="Info" component={Info} />


          </Stack.Navigator>)}


      </NavigationContainer>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
