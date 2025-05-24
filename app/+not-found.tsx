import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link 
          href="/" 
          style={[
            styles.link,
            Platform.select({
              web: { textDecoration: 'none' },
              default: {}
            })
          ]}
        >
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  link: {
    paddingVertical: 15,
  },
  linkText: {
    color: '#2196F3',
    fontSize: 16,
  },
});