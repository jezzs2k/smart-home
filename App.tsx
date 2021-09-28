import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import BottomTabs from './src/navigations';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
