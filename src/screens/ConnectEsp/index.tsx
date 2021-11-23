import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import database from '@react-native-firebase/database';
import SendIntentAndroid  from 'react-native-send-intent';

import {Button, Form, InputComp} from '../../components';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';
import {Colors} from '../../config';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {NavigationScreen} from '../../config/NavigationScreen';
import useModalNotification from '../../Hooks/useModalNotification';
import {WifiInfo} from '../FormUploadDevices';
import {useAppDispatch} from '../../stores/stores';
import {resetDevice} from '../../stores/device';

interface WifiT {
  ssid: string;
  password: string;
}

interface ConnectEspProps extends IModalLoadingPassProp {}

const initialValues = {ssid: '', password: ''};

let dataRealTime: any = null;
let isSubmited = false;

export const ConnectEsp = ModalLoading()(
  ({onSetLoading, onCloseLoading}: ConnectEspProps) => {
    const dispatch = useAppDispatch();
    

    const route =
      useRoute<RouteProp<{params: {idEsp: string; wifiInfo: WifiInfo}}>>();
    const {ssid, password, isWep = true} = route.params.wifiInfo;
    const navigation = useNavigation<NavigationProp<any>>();


    const [ModalComponent, onSetModalVisible, _visible, setContent] =
      useModalNotification({
        customTextTitle: `Đã Kết nối tới WIFI: ${ssid}`,
        customTextCancel: 'Đóng',
        onCancel: () => {
          if (dataRealTime) {
            dataRealTime.isConnected = 'true';
            database()
              .ref('/' + route.params?.idEsp)
              .set(dataRealTime);
          }

          dispatch(resetDevice());

          navigation.navigate(NavigationScreen.Home);
        },
        isJustShowCancel: true,
      });

      const handleConnectEsp = () => {
        SendIntentAndroid.openSettings('android.settings.WIFI_SETTINGS')
      };

      const [ModalComponent1, onSetModalVisible1, _visible1, setContent1] =
      useModalNotification({
        customTextTitle: 'Kết nối ESP 8266',
        customTextContent: `Kết nối tới WIFI: ${ssid} và quay lại app thiết lập hệ thống !`,
        customTextCancel: 'Đóng',
        customTextAccept: 'Đồng ý',
        onCancel: () => navigation.navigate(NavigationScreen.Home),
        onAccept: handleConnectEsp,
      });


    const handleSubmit = (values: WifiT) => {
      onSetLoading();
      isSubmited = true;
      fetch(
        `http://192.168.4.1/setup?ssid=${values.ssid.trim()}&password=${values.password.trim()}&idThisEsp=${
          route.params.idEsp
        }`,
      )
        .then(data => {})
        .catch(e => {
          onCloseLoading();
          setContent('Thiết bị của bạn đã được kết nối thành công!');
          onSetModalVisible(true);
        });
    };

    useEffect(() => {
      onSetModalVisible1(true);
    }, []);

    return (
      <View style={styles.container}>
        <ModalComponent />
        <ModalComponent1 />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <Form
              renderFooter={
                <View style={styles.footer}>
                  <TouchableOpacity style={styles.footer} onPress={() => {}}>
                    <Text style={styles.text}>Quên mật khẩu</Text>
                  </TouchableOpacity>
                </View>
              }
              titleHeader={'Kết nối với WIFI nhà bạn'}>
              <InputComp
                defaultValue={values.ssid}
                onChange={handleChange('ssid')}
                onBlur={() => handleBlur('ssid')}
                placeholder={'Vui lòng nhập Wifi - SSID'}
              />
              <InputComp
                defaultValue={values.password}
                onChange={handleChange('password')}
                onBlur={() => handleBlur('password')}
                placeholder={'Mật khẩu'}
                isSecureText={true}
              />
              <Button
                isShowIcon={false}
                title={'Xác nhận'}
                onPress={handleSubmit}
                containerStyle={{
                  marginTop: 30,
                }}
                contentBtnStyle={{
                  padding: 13,
                }}
              />
            </Form>
          )}
        </Formik>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 16,
  },
  text: {
    fontWeight: '600',
    color: Colors.URL_COLOR,
  },
});
