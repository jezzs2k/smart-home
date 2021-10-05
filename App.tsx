import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import BottomTabs from './src/navigations';
import store, {persistor} from './src/stores/stores';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BottomTabs />
        </PersistGate>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
