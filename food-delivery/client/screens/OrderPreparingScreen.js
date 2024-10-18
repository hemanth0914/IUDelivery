import { StyleSheet, Text, View , Image} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderPreparingScreen = () => {
  const navigation = useNavigation()
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Delivery')
    }, 3000)
  }, [])
  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Image source={require('../assets/images/deliveryotw.gif')} style={{height: 400, width: 370}}/>
    </View>
  )
}

export default OrderPreparingScreen

const styles = StyleSheet.create({})