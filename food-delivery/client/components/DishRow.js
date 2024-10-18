import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById } from '../slices/CartSlice';


const DishRow = ({item}) => {
  const dispatch = useDispatch()
  const handleIncrease = ()=>{
    dispatch(addToCart({...item}))
  }
  const handleDecrease = ()=>{
    dispatch(removeFromCart({id: item.id}))
  }

  const totalItems = useSelector(state => selectCartItemsById(state, item.id))
  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image className='rounded-3xl' style={{height: 100, width: 100}} source={item.image}/>
      <View className='flex flex-1 space-y-3'>
        <View className='pl-3'>
            <Text className="font-bold">{item.name}</Text>
            <Text>{item.description}</Text>
        </View>
      </View>
      <View className="flex pb-2 items-center">
        <TouchableOpacity 
        onPress={handleIncrease}
        style={{ backgroundColor: themeColors.bgColor(1), padding: 10, borderRadius: 50 }}>
            <Icon.Plus stroke="white" height={20} width={20} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="font-semibold pt-2">{totalItems.length}</Text>
        <TouchableOpacity
        onPress={handleDecrease}
        disabled={!totalItems.length}
        style={{ backgroundColor: themeColors.bgColor(1), padding: 10, borderRadius: 50, marginTop: 10 }}>
            <Icon.Minus stroke="white" height={20} width={20} strokeWidth={2.5} />
        </TouchableOpacity>
</View>

    </View>
  )
}

export default DishRow;

