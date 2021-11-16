import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../../components';

import {Colors} from '../../../config';

interface AddAutomaticsProps {}

export const AddAutomatics = ({}: AddAutomaticsProps) => {
  const handleScanAuto = () => {};

  return (
    <View>
      <Button title={'Quét'} onPress={handleScanAuto} isShowIcon={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
  },
});
