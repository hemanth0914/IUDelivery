import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../constants'

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View className="mt-4 ">
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="overflow-visible"
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
      >
        {
            categories.map((category, index)=>{
                let isActive = activeCategory === category.id;
                let btnClass = isActive ? ' bg-[#990000]' : 'bg-gray-200'; 
                let textClass = isActive ? ' font-semibold text-[#990000]' : ' text-gray-500';                 

                return (
                    <View key={index} className="flex justify-center items-center mr-6">
                        <TouchableOpacity 
                        onPress={()=>{
                            setActiveCategory(category.id)
                        }}
                        className={"p-2 rounded-full shadow bg-gray-200"+btnClass} >
                            <Image className="w-45 h-45" source={category.image}/>
                        </TouchableOpacity>
                        <Text className={"text-sm" + textClass}>{category.name}</Text>
                    </View>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})