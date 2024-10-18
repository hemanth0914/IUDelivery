import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderScreen from './screens/OrderScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

const Navigation = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={
            {headerShown: false}
          }
          >
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Order" options={{presentation: 'modal'}} component={OrderScreen} />
            <Stack.Screen name="OrderPreparing" options={{presentation: 'fullScreenModal'}} component={OrderPreparingScreen} />
            <Stack.Screen name="Delivery" options={{presentation: 'fullScreenModal'}} component={DeliveryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default Navigation

const styles = StyleSheet.create({})