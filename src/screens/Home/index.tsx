import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {DeviceScreens} from '..';
import {
  Button,
  DeviceComponent,
  ListDevice,
  ScreenDefault,
} from '../../components';
import {ScanQrCode} from '../../components/QRCode';
import {ElectricSvg, FanSVG, OutletIcon} from '../../components/Svgs';
import {Colors} from '../../config';

export const HomeScreen = () => {
  const handleAddDevices = () => {
    //Navigation
  };

  return (
    <View style={styles.container}>
      {/* <ScreenDefault
        titleScreen={'Không có thiết bị, vui lòng thêm'}
        onPress={handleAddDevices}
        ButtonComp={
          <Button
            onPress={handleAddDevices}
            title={'Thêm thiết bị'}
            isShowIcon={false}
          />
        }
      /> */}
      {/* <DeviceScreens /> */}
      <ScanQrCode />
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
