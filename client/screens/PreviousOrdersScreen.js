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
      
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      
      const data = await response.json();
      setOrders(data);
      console.log("Orders retrieved:", data);
      setError('');
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      setError('No orders found for this user');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>
        Eatery: <Text style={styles.orderDetailText}>{item.eatery_name || 'Unknown'}</Text>
      </Text>
      <Text style={styles.orderText}>Dishes:</Text>
      {(item.dishes && item.dishes.length > 0) ? (
        item.dishes.map((dish, index) => (
          <Text key={`${item.order_id}-${index}`} style={styles.dishText}>• {dish.name}</Text>
        ))
      ) : (
        <Text style={styles.dishText}>No dishes available</Text>
      )}
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
        contentContainerStyle={styles.flatListContent}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#990000',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#D32F2F',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  orderItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#990000',
  },
  orderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#990000',
  },
  orderDetailText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
  },
  dishText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
    marginTop: 2,
  },
  error: {
    color: '#990000',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default PreviousOrdersScreen;
 