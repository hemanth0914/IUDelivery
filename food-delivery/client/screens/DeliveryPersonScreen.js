import React, { useEffect, useState, useCallback } from 'react';
import { 
  StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Correct import

const DeliveryPersonScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation(); // Hook for navigation

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://100.72.42.107:8000/orders/notpicked');
      const data = await response.json();
      console.log('Fetched Orders:', JSON.stringify(data, null, 2));
      setOrders((prevOrders) =>
        JSON.stringify(prevOrders) === JSON.stringify(data) ? prevOrders : data
      );
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (order) => {
    setLoading(true);
    try {
      const response = await fetch(`http://100.72.42.107:8000/orders/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Picked' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      Alert.alert('Order Accepted', `You have accepted the order from ${order.eatery_name}.`);

      navigation.navigate('OrderDetail', { order });
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to accept the order. Please try again.');
    } finally {
      setLoading(false);
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
          data={item.dishes || []}
          keyExtractor={(dish, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.text}>{item.name} x {item.quantity}</Text>
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
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default DeliveryPersonScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 10, margin: 16, padding: 16, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  eateryName: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, color: '#990000' },
  cardContent: { marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  text: { fontSize: 16, color: '#424242', marginLeft: 8 },
  subTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 8, color: '#757575' },
  acceptButton: { backgroundColor: '#990000', padding: 10, borderRadius: 5, marginTop: 16 },
  acceptButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 18, color: '#757575' },
});
