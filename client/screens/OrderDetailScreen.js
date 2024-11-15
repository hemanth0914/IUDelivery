import React, { useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;
  const [loading, setLoading] = useState(false);
  const user_name = useSelector((state) => state.auth.name);

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.0.107:8000/orders/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Order on the way',
          deliveryPerson: user_name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      Alert.alert('Order Update', 'Order is now on the way!');
      console.log('Notification: Order on the way');
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <FontAwesome5 name="store" size={30} color="#FF6347" />
        <Text style={styles.title}>{order.eatery_name}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="person" size={24} color="#757575" />
        <Text style={styles.detailText}>User: {order.user.name}</Text>
      </View>
      <Text style={styles.subtitle}>Dishes:</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={order.dishes || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishRow}>
            <Text style={styles.dishText}>{item.name}</Text>
            <Text style={styles.quantityText}>x {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes found</Text>}
        ListFooterComponent={
          <TouchableOpacity 
            style={styles.statusButton} 
            onPress={handleStatusUpdate} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={20} color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Mark as Order on the Way</Text>
            )}
          </TouchableOpacity>
        }
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6347',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#424242',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  dishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dishText: {
    fontSize: 18,
    color: '#424242',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#757575',
  },
  statusButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
