import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Button, ScreenDefault} from '../../components';
import {Colors} from '../../config';

export const HomeScreen = () => {
  const handleAddDevices = () => {
    //Navigation
  };

  return (
    <View style={styles.container}>
      <ScreenDefault
        titleScreen={'Không có thiết bị, vui lòng thêm'}
        onPress={handleAddDevices}
        ButtonComp={
          <Button
            onPress={handleAddDevices}
            title={'Thêm thiết bị'}
            isShowIcon={false}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
