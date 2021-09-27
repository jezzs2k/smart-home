import React from 'react';
import {View, StyleSheet} from 'react-native';

import BottomTabs from './src/navigations';

const App = () => {
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
