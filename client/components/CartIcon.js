import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { selectCartItems } from '../slices/CartSlice'
import { useSelector } from 'react-redux'

const CartIcon = () => {
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    console.log('Cart items:', cartItems);
    if (!cartItems.length) return;
  return (
    <View className="absolute bottom-5 w-full z-50">
        <TouchableOpacity className="rounded-full flex flex-row mx-5 items-center justify-center shadow-lg" style={{ backgroundColor: themeColors.bgColor(1), height: 60 }} onPress={()=> navigation.navigate('Order')}>
            
            {/* Number 3 with circular background and opacity */}
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
            <Text className="font-extrabold text-white text-lg">{cartItems.length}</Text>
            </View>
            
            {/* Cart text */}
            <View className='flex flex-1 ml-20'>
            <Text className="text-white font-extrabold text-lg">View Order</Text>
            </View>
        </TouchableOpacity>
</View>


  )
}

export default CartIcon

const styles = StyleSheet.create({})