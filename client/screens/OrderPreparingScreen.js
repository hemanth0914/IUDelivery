import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const OrderPreparingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order_id } = route.params;  // Retrieve order_id from route params

  useEffect(() => {
    setTimeout(() => {
      // Navigate to the Delivery screen and pass order_id
      navigation.navigate('Delivery', { order_id });
    }, 3000);
  }, [navigation, order_id]);

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Image source={require('../assets/images/deliveryotw.gif')} style={{ height: 400, width: 370 }} />
    </View>
  );
};

export default OrderPreparingScreen;

const styles = StyleSheet.create({});
