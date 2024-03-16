import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Modal, Button } from 'react-native';
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

  // console.log('data', data.x * 200)
  //left: +
  //right: -

  return (
    <View style={styles.container}>
      <Image
        style={{ flex: 1 }}
        source={{ uri: 'https://i.pinimg.com/originals/23/df/85/23df8576ec3f71e173de2911a597fb9e.gif' }}
      />

      <Image
        style={{ width: 60, height: 60, position: 'absolute', top: 270, right: (data.x) * 120 }}
        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/017/173/213/small/car-isolated-on-white-back-view-png.png' }}
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
    backgroundColor: 'gray',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
});


/*
1. Parent component me function banega jo state ko change karega
2. Is function ko child me pass karenge
3. Child me event per us function ko call kardenge
*/