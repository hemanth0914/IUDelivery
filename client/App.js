import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation';
import { Provider } from 'react-redux'
import { store } from './store'

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
    
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

