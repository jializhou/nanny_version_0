import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getReviewsByCaregiver } from '@/data/reviews';

export default function ReviewsAPI() {
  const [data, setData] = useState(getReviewsByCaregiver('1'));

  useEffect(() => {
    fetch('/api/reviews?caregiverId=1')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews API</Text>
      <Text style={styles.endpoint}>/api/reviews</Text>
      <Text style={styles.description}>Handles review retrieval and creation</Text>

      <Text style={styles.subtitle}>GET Parameters:</Text>
      <View style={styles.params}>
        <Text style={styles.param}>- caregiverId: string (required)</Text>
      </View>

      <Text style={styles.subtitle}>POST Body:</Text>
      <View style={styles.card}>
        <Text style={styles.code}>{JSON.stringify({
          caregiverId: "string",
          rating: "number",
          text: "string"
        }, null, 2)}</Text>
      </View>

      <Text style={styles.subtitle}>Example Response:</Text>
      <FlatList
        data={data.slice(0, 2)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.code}>{JSON.stringify(item, null, 2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  endpoint: {
    fontSize: 18,
    color: '#2196F3',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  params: {
    marginBottom: 20,
  },
  param: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});