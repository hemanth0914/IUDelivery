import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';


const RestaurantCard = ({item}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    onPress={()=>{
        navigation.navigate('Restaurant', {...item})
    }}
    >
        <View 
        style={{shadowColor: themeColors.bgColor(0.2), 
            shadowRadius: 7
        }}
        className="mr-6 bg-white rounded-3xl shadow-lg">
            <Image 
        className='h-36 w-64 rounded-t-3xl' 
        source={item.image}
        />
        <View className="px-3 pb-4 space-y-2">
            <Text className="text-lg  font-bold">{item.name}</Text>
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
        
        </View>
      
    </TouchableOpacity>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({})