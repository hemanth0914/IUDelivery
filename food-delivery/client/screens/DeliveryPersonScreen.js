import React, { useEffect, useState, useCallback } from 'react';
import { 
  StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const DeliveryPersonScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch orders from the FastAPI backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.0.13:8000/orders/notpicked');
      const data = await response.json();
      console.log('Fetched Orders:', JSON.stringify(data, null, 2)); // Debug
  
      // Check if there are changes before updating state
      setOrders((prevOrders) =>
        JSON.stringify(prevOrders) === JSON.stringify(data) ? prevOrders : data
      );
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  

  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Show refresh indicator
    await fetchOrders(); // Fetch new data
    setRefreshing(false); // Hide refresh indicator
  }, []);

  useEffect(() => {
    fetchOrders(); // Initial data fetch on component mount
  }, []);

  // Handle "Accept" button press
  const handleAccept = async (order) => {
    setLoading(true); // Show loading spinner
  
    try {
      console.log('Selected Order:', order);
  
      const orderId = order._id;
  
      const response = await fetch(`http://192.168.0.13:8000/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Picked' }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
  
      console.log('Order Status Updated:', response.status);
      Alert.alert('Order Accepted', `You have accepted the order from ${order.eatery_name}.`);
  
      await fetchOrders(); // Refresh orders list
  
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to accept the order. Please try again.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };
  
  

  const renderOrderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <FontAwesome5 name="store" size={24} color="#990000" />
        <Text style={styles.eateryName}>{item.eatery_name}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <MaterialIcons name="person" size={20} color="#757575" />
          <Text style={styles.text}>User: {item.user.name}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="assignment" size={20} color="#757575" />
          <Text style={styles.text}>Status: {item.status}</Text>
        </View>
        <Text style={styles.subTitle}>Dishes:</Text>
        <FlatList
          data={item.dishes || []} // Handle undefined dishes gracefully
          keyExtractor={(dish, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.text}>
                {item.name} x {item.quantity}
              </Text>
            </View>
          )}
        />
        <TouchableOpacity 
          style={styles.acceptButton} 
          onPress={() => handleAccept(item)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
  data={orders}
  keyExtractor={(item) => item._id} // Ensure keys are stable and unique
  renderItem={renderOrderItem}
  ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  contentContainerStyle={{ paddingBottom: 20 }}
/>
    </SafeAreaView>
  );
};

export default DeliveryPersonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eateryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#990000',
  },
  cardContent: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#757575',
  },
  acceptButton: {
    marginTop: 16,
    backgroundColor: '#990000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#757575',
  },
});
