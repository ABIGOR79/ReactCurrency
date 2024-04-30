import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Компонент сплэш-экрана
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/splash.png')} style={styles.image} />
    </View>
  );
};

// Компонент основного экрана
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/dog.png')} style={styles.image} />
    </View>
  );
};

// Основной компонент приложения
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Через 3 секунды скрываем сплэш-экран
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? <SplashScreen /> : <MainScreen />}
    </>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});