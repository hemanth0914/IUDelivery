import React, { useEffect, useState, useCallback } from 'react';
import { 
  StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const DeliveryPersonScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const user_name = useSelector((state) => state.auth.name);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.0.107:8000/orders/notpicked');
      const data = await response.json();
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
      const response = await fetch(`http://192.168.0.107:8000/orders/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Picked',
          deliveryPerson: user_name,
        }),
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
          <MaterialIcons name="person" size={20} color="#616161" />
          <Text style={styles.text}>User: {item.user.name}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="assignment" size={20} color="#616161" />
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
          style={styles.acceptButtonContainer} 
          onPress={() => handleAccept(item)}
        >
          <LinearGradient
            colors={['#990000', '#770000']}
            style={styles.acceptButton}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={40} color="#990000" />
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
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    margin: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 8,
  },
  eateryName: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginLeft: 8, 
    color: '#990000' 
  },
  cardContent: { marginTop: 8 },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6 
  },
  text: { 
    fontSize: 16, 
    color: '#424242', 
    marginLeft: 8 
  },
  subTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 8, 
    color: '#757575' 
  },
  acceptButtonContainer: { 
    alignItems: 'center', 
    marginTop: 16,
  },
  acceptButton: { 
    width: '100%', 
    paddingVertical: 12, 
    borderRadius: 8,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  acceptButtonText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    fontSize: 18, 
    color: '#757575' 
  },
});
