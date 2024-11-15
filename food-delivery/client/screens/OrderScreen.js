import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { selectEatery } from '../slices/EaterySlice';
import { removeFromCart, selectCartItems, selectCartItemsById } from '../slices/CartSlice';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { selectUserLocation } from '../slices/LocationSlice'; // Assume this slice holds user location

const OrderScreen = () => {
    const eatery = useSelector(selectEatery);
    const cartItems = useSelector(selectCartItems);
    const userLocation = useSelector(selectUserLocation); // Get user location
    const user_name = useSelector((state) => state.auth.name);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log(userLocation)
    console.log(eatery)


    // Utility function to count items based on ID
    const countItems = (items) => {
        const counts = {};
        items.forEach(item => {
            counts[item.id] = (counts[item.id] || 0) + 1;
        });
        return counts;
    };

    // Get the counts
    const itemCounts = countItems(cartItems);

    // Get unique items to render
    const uniqueItems = Array.from(new Set(cartItems.map(item => item.id)))
        .map(id => cartItems.find(item => item.id === id));

    // Function to call the API and place the order
    const placeOrder = async () => {
        const orderData = {
            eatery_id: eatery.id,
            eatery_name: eatery.name,
            dishes: uniqueItems.map((dish) => ({
                id: dish.id,
                name: dish.name,
                quantity: itemCounts[dish.id]
            })),
            user: {
                name: user_name,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
            },
            status: 'NotPicked',
            deliveryPerson: ''
        };
    
        try {
            console.log("orderData", orderData);
            const response = await axios.post('http://192.168.0.107:8000/orders', orderData);
            console.log('Order placed successfully:', response.data);
            
            // Navigate to OrderPreparingScreen and pass the order_id
            navigation.navigate('OrderPreparing', { order_id: response.data.order_id });
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert("Order Error", "Could not place the order. Please try again.");
        }
    };
    return (
        <View className='bg-white flex-1'>
            <View className='relative py-4 shadow-sm flex flex-row'>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: themeColors.bgColor(1), width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                    <Icon.ArrowLeft stroke={'white'} />
                </TouchableOpacity>
                <View>
                    <Text className="ml-20 text-center text-2xl font-extrabold">{user_name}'s Order</Text>
                    <Text className="text-center ml-20 text-gray-500">{eatery.name}</Text>
                </View>
            </View>
            {/* delivery-time */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2), height: 80, width: '100%', marginTop: 13, marginBottom: 8 }} className='flex flex-row items-center'>
                <Image 
                    source={require('../assets/images/deliveryguyy.webp')} 
                    style={{ height: 120, width: 110 }}
                />
                <Text className='ml-2'>Estimated time is 20 minutes</Text>
                <TouchableOpacity className='ml-4'>
                    <Text className='font-extrabold' style={{ color: themeColors.text }}>Change</Text>
                </TouchableOpacity>
            </View>
            {/* dishes */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20 
                }}
                className='bg-white pt-5'>
                {uniqueItems.map((dish) => (
                    <View key={dish.id} className='rounded-full flex-row items-center pl-5 shadow-2xl' style={{ backgroundColor: 'white', height: 80, marginBottom: 10 }}>
                        <View className='rounded-full text-center justify-center' style={{ backgroundColor: themeColors.bgColor(0.4), height: 50, width: 50 }}>
                            <Text className='font-bold pl-3.5' style={{ color: 'white' }}>X {itemCounts[dish.id]}</Text>
                        </View>
                        <View className='text-center justify-center ml-8'>
                            <Image className='h-16 w-16 rounded-full' source={dish.image} />
                        </View>
                        <View className='flex-1 text-center justify-center ml-6'>
                            <Text className='font-semibold'>{dish.name}</Text>
                        </View>
                        <TouchableOpacity 
                            style={{ backgroundColor: themeColors.bgColor(1), padding: 10, borderRadius: 50 }} 
                            className='text-center mr-5'
                            onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                            >
                            <Icon.Minus stroke="white" height={20} width={20} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className='py-6 rounded-t-3xl space-y-4'>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold ml-10'>Delivery Fee</Text>
                    <Text className='font-semibold mr-10'>$2</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={placeOrder}  // Call the API on button press
                        className="rounded-full flex flex-row mx-5 items-center justify-center shadow-lg" 
                        style={{ backgroundColor: themeColors.bgColor(1), height: 60 }}>
                        <View className='flex flex-1'>
                            <Text className="text-white text-center font-extrabold text-lg">Place Order</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});
