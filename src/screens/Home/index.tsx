import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {DeviceScreens} from '..';
import {Button, ScreenDefault} from '../../components';
import {Colors} from '../../config';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleAddDevices = () => {
    //Navigation
    navigation.navigate('AddDevice');
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
    backgroundColor: Colors.BG,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
