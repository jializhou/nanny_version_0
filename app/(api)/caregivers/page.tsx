import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { allCaregivers } from '@/data/caregivers';

export default function CaregiversAPI() {
  const [data, setData] = useState(allCaregivers);

  useEffect(() => {
    fetch('/api/caregivers')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caregivers API</Text>
      <Text style={styles.endpoint}>/api/caregivers</Text>
      <Text style={styles.description}>Returns a list of all caregivers with optional filtering</Text>
      
      <Text style={styles.subtitle}>Query Parameters:</Text>
      <View style={styles.params}>
        <Text style={styles.param}>- search: string</Text>
        <Text style={styles.param}>- category: string</Text>
        <Text style={styles.param}>- minRate: number</Text>
        <Text style={styles.param}>- maxRate: number</Text>
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