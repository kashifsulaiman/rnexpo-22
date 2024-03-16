import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState()
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };


  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);


  return (
    <View style={styles.container}>
      <Image
        style={{ flex: 1 }}
        source={{ uri: 'https://i.pinimg.com/originals/23/df/85/23df8576ec3f71e173de2911a597fb9e.gif' }}
      />

      <Image
        style={{ width: 280, height: 280, position: 'absolute', bottom: data.y * 300, right: data.x * 200 }}
        source={{ uri: 'https://png.pngtree.com/png-vector/20230104/ourmid/pngtree-red-gradient-car-back-view-transport-vector-png-image_6550894.png' }}
      />

      <StatusBar style="auto" backgroundColor="#61dafb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
