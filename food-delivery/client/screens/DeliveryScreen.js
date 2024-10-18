import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { themeColors } from '../theme';
import * as Icon from 'react-native-feather';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectEatery } from '../slices/EaterySlice';
import { selectUserLocation } from '../slices/LocationSlice'; // Ensure this imports your user location slice

const DeliveryScreen = () => {
    const eatery = useSelector(selectEatery);
    const userLocation = useSelector(selectUserLocation); // Get user's location from Redux
    const navigation = useNavigation();
    const user_name = useSelector((state) => state.auth.name);

    return (
        <View className='flex-1'>
            <MapView
                initialRegion={{
                    latitude: eatery.lat,
                    longitude: eatery.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                className='flex-1'
                mapType='standard'
            >
                <Marker
                    coordinate={{
                        latitude: eatery.lat,
                        longitude: eatery.lng,
                    }}
                    title={eatery.name}
                    description={eatery.description}
                    pinColor={themeColors.bgColor(1)}
                />
                
                {userLocation.latitude && userLocation.longitude && (
                    <>
                        <Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude,
                            }}
                            title="Your Location"
                            pinColor="blue" // Different color for user location
                        />
                        <Polyline
                            coordinates={[
                                {
                                    latitude: userLocation.latitude,
                                    longitude: userLocation.longitude,
                                },
                                {
                                    latitude: eatery.lat,
                                    longitude: eatery.lng,
                                },
                            ]}
                            strokeColor="blue" // Color of the line
                            strokeWidth={4} // Thickness of the line
                        />
                    </>
                )}
            </MapView>
            <View className='rounded-t-3xl -mt-12 bg-white relative pb-10'>
                <View className='flex-row items-center justify-between mx-3 '>
                    <View className='pt-5'>
                        <Text className='text-lg font-semibold text-gray-700'>Estimated Arrival</Text>
                        <Text className='text-3xl text-gray-700 font-semibold '>30-40 minutes</Text>
                        <Text className='text-xl font-semibold text-gray-700'>{user_name}'s order is on the way!</Text>
                    </View>
                    <Image source={require('../assets/images/deliveryguyy.webp')} style={{ height: 110, width: 110 }} />
                </View>
                <View className='flex-row m-5 rounded-full shadow items-center justify-between px-8 ' style={{ backgroundColor: themeColors.bgColor(0.4), height: 90, width: 350 }}>
                    <View>
                        <Text className='font-extrabold text-lg text-white'>Hemanth</Text>
                        <Text className='font-semibold text-white'>Your Rider</Text>
                    </View>
                    <TouchableOpacity className='bg-white p-2 rounded-full'>
                        <Icon.MessageCircle fill={themeColors.bgColor(1)} stroke='white' strokeWidth={2} height={30} width={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DeliveryScreen;

const styles = StyleSheet.create({});
