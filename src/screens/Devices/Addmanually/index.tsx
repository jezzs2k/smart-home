import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListDevice} from '../../../components';

interface AddManuallyProps {}

export const AddManually = ({}: AddManuallyProps) => {
  return (
    <View style={styles.container}>
      <ListDevice />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
