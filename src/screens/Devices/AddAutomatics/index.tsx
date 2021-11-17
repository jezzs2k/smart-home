import React, {useEffect, useState} from 'react';
import wifi from 'react-native-android-wifi';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import uuid from 'react-native-uuid';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button} from '../../../components';

import {Colors} from '../../../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {NavigationScreen} from '../../../config/NavigationScreen';
import {OutletIcon} from '../../../components/Svgs';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../../components/ModalLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/stores';

interface AddAutomaticsProps extends IModalLoadingPassProp {}

export const AddAutomatics = ModalLoading()(
  ({onCloseLoading, onSetLoading}: AddAutomaticsProps) => {
    const [dataWifi, setDataWifi] = useState([]);
    const navigation = useNavigation<NavigationProp<any>>();

    const {token} = useSelector((state: RootState) => state.auth);
    

    const handleScanAuto = () => {
      if (!token) {
        navigation.navigate(NavigationScreen.Login);
        return;
      };
      onSetLoading();
      wifi.reScanAndLoadWifiList(
        (wifiStringList: string) => {
          const wifiArray = JSON.parse(wifiStringList);

          const data = wifiArray.filter(
            (item: any) => item.SSID === 'SMART_HOME_ESP8266',
          );
          onCloseLoading();

          if (data?.length > 0) {
            setDataWifi(data);
          }
        },
        (error: any) => {
          console.log(error);
        },
      );
    };

    return dataWifi.length > 0 ? (
      <FlatList
        style={{
          flex: 1,
          backgroundColor: Colors.BG,
        }}
        data={dataWifi}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NavigationScreen.FormUploadDevice, {
                  itemDevice: {title: 'Thiết bị điện', icon: <OutletIcon />},
                  wifiInfo: {
                    ssid: 'SMART_HOME_ESP8266',
                    password: '11111111',
                    isWep: true,
                  },
                  deviceId: uuid.v4(),
                });
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: 16,
                }}>
                <View>
                  <Text style={{fontWeight: '600', fontSize: 16}}>
                    {item.SSID}
                  </Text>
                  <Text style={{fontWeight: '400', fontSize: 14}}>
                    {'Kết nối'}
                  </Text>
                </View>
                <AntDesign name={'right'} size={16} color={'gray'} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    ) : (
      <View style={styles.container}>
        <Button
          title={'Quét'}
          onPress={handleScanAuto}
          containerStyle={{}}
          Icon={<Fontisto name={'wifi-logo'} color={Colors.WHITE} size={25} />}
          contentBtnStyle={{
            paddingHorizontal: 30,
          }}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
