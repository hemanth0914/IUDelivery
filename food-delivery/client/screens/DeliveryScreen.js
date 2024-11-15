import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { themeColors } from '../theme';
import * as Icon from 'react-native-feather';
import { selectEatery } from '../slices/EaterySlice';
import { selectUserLocation } from '../slices/LocationSlice';

const DeliveryScreen = () => {
  const route = useRoute();
  const { order_id } = route.params;

  const eatery = useSelector(selectEatery);
  const userLocation = useSelector(selectUserLocation);
  const [orderStatus, setOrderStatus] = useState('Order is getting picked');
  const [estimatedTime, setEstimatedTime] = useState('50-60 minutes');
  const [deliveryPerson, setDeliveryPerson] = useState('');


  // useRef to store interval ID so we can clear it
  const intervalRef = useRef(null);

  // Request notification permissions on component mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable notifications in settings.');
      }
    };
    
    requestPermissions();
  }, []);

  // Set notification handler for foreground notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Poll the order status periodically
  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const response = await fetch(`http://192.168.0.107:8000/orders/${order_id}/getstatus`);
        const data = await response.json();
        console.log("Fetched order status data:", data);

        if (data.status === 'Order on the way' && orderStatus !== 'Order on the way') {
          setOrderStatus('Order is on the way');
          setEstimatedTime('30-40 minutes');
          setDeliveryPerson(data.deliveryPerson); // Set delivery person from API response

          // Clear interval to stop polling
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null; // Set to null to avoid multiple clears
          }

          console.log("Scheduling notification...");
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Order Update",
              body: "Delivery person has picked up your order and the order is on the way!",
            },
            trigger: null, // Immediate notification
          }).then(() => {
            console.log("Notification scheduled successfully");
          }).catch(error => {
            console.error("Error scheduling notification:", error);
          });
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    // Start interval and save interval ID in ref
    intervalRef.current = setInterval(checkOrderStatus, 10000);

    // Cleanup on component unmount
    return () => clearInterval(intervalRef.current);
  }, [orderStatus, order_id]);

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
              pinColor="blue"
            />
            <Polyline
              coordinates={[
                { latitude: userLocation.latitude, longitude: userLocation.longitude },
                { latitude: eatery.lat, longitude: eatery.lng },
              ]}
              strokeColor="blue"
              strokeWidth={4}
            />
          </>
        )}
      </MapView>
      <View className='rounded-t-3xl -mt-12 bg-white relative pb-10'>
        <View className='flex-row items-center justify-between mx-3 '>
          <View className='pt-5'>
            <Text className='text-lg font-semibold text-gray-700'>Estimated Arrival</Text>
            <Text className='text-3xl text-gray-700 font-semibold '>{estimatedTime}</Text>
            <Text className='text-xl font-semibold text-gray-700'>{orderStatus}</Text>
          </View>
          <Image source={require('../assets/images/deliveryguyy.webp')} style={{ height: 110, width: 110 }} />
        </View>
        <View className='flex-row m-5 rounded-full shadow items-center justify-between px-8' style={{ backgroundColor: themeColors.bgColor(0.4), height: 90, width: 350 }}>
          <View>
            <Text className='font-extrabold text-lg text-white'>{deliveryPerson}</Text>
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
