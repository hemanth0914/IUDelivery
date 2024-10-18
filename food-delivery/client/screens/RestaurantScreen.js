import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { useDispatch } from 'react-redux';
import { setEatery } from '../slices/EaterySlice';
import { emptyCart } from '../slices/CartSlice';

const RestaurantScreen = () => {

    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;
    console.log("ItemId is ", item.id)
    const dispatch = useDispatch();
    useEffect(()=>{
        if (item && item.id){
            dispatch(setEatery({...item}))
        }
    }, [])
  return (
    <View>
        <CartIcon/>
      <ScrollView>
        <View className="relative">
            <Image className='w-full h-72' source={item.image}/>
            <TouchableOpacity 
            onPress={()=>{
                dispatch(emptyCart())
                navigation.goBack()
            }}
            className="absolute left-4 top-14 bg-gray-50 p-2 rounded-full shadow"
            >
                <Icon.ArrowLeft color={themeColors.bgColor(1)}/>
            </TouchableOpacity>
        </View>
        <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="bg-white -mt-12 pt-6 "
        >
            <View className="px-3">
                <Text className="text-3xl font-bold">{item.name}</Text>
                <View className="flex-row space-x-2 my-1">  
                        <View className="flex-row items-center space-x-1 ">
                            <Image source={require('../assets/images/full-star.jpeg')} className="h-4 w-4"/>
                            <Text className="text-xs">
                                <Text className="text-green-700">{item.stars} </Text>
                                <Text>
                                    ({item.reviews} reviews) 
                                    <Text className="font-semibold" > . {item.category}</Text>
                                </Text>
                            </Text>
                    </View>
                    <View className="flex-row items-center space-x-1">
                        <Icon.MapPin color="gray" width={20} height={20}/>
                        <Text className="text-xs">{item.address}</Text>
                    </View>
                </View>
                <Text className="text-gray-500 mt-2">{item.description}</Text>
            </View>
        </View>
        <View className='pb-20 bg-white'>
            <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
            {/* dishes */}
            {
                  // Ensure item.dishes is defined and an array before mapping over it
                  item.dishes && Array.isArray(item.dishes) ? 
                  item.dishes.map((dish, index) => (
                      <DishRow item={{...dish}} key={index}/>
                  )) 
                  : <Text className="px-4 py-2 text-gray-500">No dishes available.</Text>
              }
        </View>
        
      </ScrollView>
    </View>
  )
}

export default RestaurantScreen

const styles = StyleSheet.create({})