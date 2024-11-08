
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState , useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Categories from '../components/categories';
import { eateries } from '../constants'; // Ensure this imports your eateries data
import FeaturedRow from '../components/featuredRow';
import { useNavigation } from '@react-navigation/native';
import useLocation from '../hooks/useLocation';
import { clearToken, clearName } from '../slices/authSlice';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';



const HomeScreen = () => {
  const dispatch = useDispatch(); 

  const navigation = useNavigation();
  const { getUserLocation, latitude, longitude, streetName, errorMessage } = useLocation();
  
  // State for search input and filtered results
  const [searchText, setSearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Data of both eateries and cafes
  const eateryData = eateries.restaurants.filter(item => item.category === 'Eatery');
  const cafeData = eateries.restaurants.filter(item => item.category === 'Cafe');
  const allRestaurants = [...eateryData, ...cafeData];

  useEffect(() => {
    getUserLocation();
  }, []);

  const navigateToPreviousOrders = () => {
    navigation.navigate('PreviousOrders'); // Ensure 'Orders' route is configured in navigation
  };

  // Function to handle search input
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const results = allRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleLogout = () => {
    // Confirm logout
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(clearToken());  // Clear token from Redux
          navigation.replace('Login');  // Redirect to Login screen
        },
      },
    ]);
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
  //         <Icon.User stroke={'#000'} width={24} height={24} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

  // Function to handle restaurant selection
  const handleRestaurantSelect = (restaurant) => {
    navigation.navigate('Restaurant', {...restaurant}); // Navigate to the RestaurantScreen with the selected restaurant
    setSearchText(''); // Clear the search input
    setFilteredResults([]); // Clear the search results
  };

  const navigateToDeliveryPersonView = () => {
    navigation.navigate('DeliveryPerson'); // Ensure 'DeliveryPerson' route is configured in navigation
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content"/>
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
            <Icon.Search height={25} width={25} stroke={'#808080'}/>
            <TextInput 
              placeholder='Eateries'
              className="ml-2 flex-1" 
              value={searchText}
              onChangeText={handleSearch} // Update search input
            />
            <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                    <Icon.MapPin height={20} width={20} stroke="gray"/>
                    <Text className="text-gray-600">{streetName}</Text>
             </View>
             
        </View>
        <View className='rounded-full border border-gray-300 p-2'>
            <TouchableOpacity onPress={handleLogout}>
            <Icon.User stroke={'#000'} width={25} height={25} />
            </TouchableOpacity>
        </View>
      </View>


      {/* Button to Navigate to Delivery Person View */}
      

      {/* Dropdown for filtered results */}
      {filteredResults.length > 0 && (
        <View style={{ 
            position: 'absolute', 
            top: 113, // Adjust this value based on the height of your search bar
            left: 20,
            right: 20,
            height: 30,
            backgroundColor: 'white', 
            borderWidth: 1,
            borderColor: 'gray', 
            borderRadius: 4, 
            zIndex: 10,
            font: 'bold',
          }}>
          {filteredResults.map((restaurant, index) => (
            <TouchableOpacity key={index} onPress={() => handleRestaurantSelect(restaurant)} style={{height: 70, backgroundColor: 'white', borderColor: 'black'}}className="space-x-5 flex-row text-center px-2 py-2 border-b border-gray-200">
              <Image source={restaurant.image} style={{height: 60, width: 60 }}/>
              <Text className="py-2.5 text-black font-semibold text-2xl">{restaurant.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={{height: 60, margin: 10}}>
        <Image style={{ height: 50, width: '100%' }}
          source={require("../assets/images/IU-Logo.png")}
        />
      </View>

      <TouchableOpacity 
  onPress={navigateToDeliveryPersonView} 
  style={{
    backgroundColor: '#990000',  // Crimson red background
    padding: 15,
    margin: 10,
    borderRadius: 30,  // Fully rounded corners
    alignItems: 'center',
  }}
>
  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
    Delivery
  </Text>
</TouchableOpacity>

<TouchableOpacity 
      onPress={navigateToPreviousOrders} 
      style={{
        backgroundColor: '#990000', // Change to your desired color
        padding: 15,
        margin: 10,
        borderRadius: 30,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        My Orders
      </Text>
    </TouchableOpacity>

      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Categories */}
        {/* <Categories/> */}

        {/* Featured Eatery Section */}
        <View className='mt-5 mx-0'>
            <FeaturedRow
                title="Eateries"
                restaurants={eateryData}
                description="Discover the best eateries around campus"
            />
        </View>

        {/* Featured Cafe Section */}
        <View className='mt-5 mb-20 mx-0'>
            <FeaturedRow
                title="Cafes"
                restaurants={cafeData} // Use the filtered cafes
                description="Enjoy the finest cafes on campus"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});





