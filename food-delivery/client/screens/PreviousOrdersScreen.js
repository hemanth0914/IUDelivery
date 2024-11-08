import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

const PreviousOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const user_name = useSelector((state) => state.auth.name);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders for user:", user_name);
      
      const response = await fetch(`http://192.168.0.107:8000/orders/by-user/${user_name}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json(); // Parse JSON from the response
      setOrders(data);
      console.log("Orders retrieved:", data);
      setError('');
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      setError('No orders found for this user or an error occurred');
    }
  };

  useEffect(() => {
    fetchOrders(); // Automatically fetch orders on component mount
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Eatery: <Text style={styles.orderDetailText}>{item.eatery_name}</Text></Text>
      <Text style={styles.orderText}>Dishes:</Text>
      {item.dishes.map((dish, index) => (
        <Text key={index} style={styles.dishText}>- {dish.name}</Text> // Adjust `dish.name` if needed to match the structure of each dish
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Previous Orders</Text>

    {error ? <Text style={styles.error}>{error}</Text> : null}

    <FlatList
      data={orders}
      keyExtractor={(item) => item.order_id}
      renderItem={renderOrder}
      ListEmptyComponent={<Text style={styles.empty}>No orders found.</Text>}
    />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#990000',  // Applying the primary color to the title
    textAlign: 'center',
    marginBottom: 20,
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#990000', // Applying the primary color to labels
  },
  orderDetailText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333', // Use a dark gray for detail text
  },
  error: {
    color: '#990000',  // Apply the primary color to error text
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});

export default PreviousOrdersScreen;
