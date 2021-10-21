import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import {Formik} from 'formik';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import WifiManager from 'react-native-wifi-reborn';
import {useSelector} from 'react-redux';
import {Device, Form, InputComp} from '../../components';
import {Button} from '../../components';
import {Colors} from '../../config';
import {RootState, useAppDispatch} from '../../stores/stores';
import {NavigationScreen} from '../../config/NavigationScreen';
import {getDeviceById, upLoadDevices} from '../../stores/factories/device';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';
import {RouteProp, useRoute} from '@react-navigation/native';

interface FormUploadDeviceProps extends IModalLoadingPassProp {}

interface wifiInfo {
  ssid: string;
  password: string;
  isWep?: boolean;
}

interface LoginViewMode {
  deviceName: string;
}

const initialValues = {deviceName: ''};

export const FormUploadDevice = ModalLoading()(
  ({onCloseLoading, onSetLoading}: FormUploadDeviceProps) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useAppDispatch();
    const route = useRoute<
      RouteProp<{
        params: {itemDevice: Device; wifiInfo: wifiInfo; deviceId: string};
      }>
    >();
    const {ssid, password, isWep = false} = route.params.wifiInfo;
    const item = route.params.itemDevice;
    const deviceId = route.params.deviceId;

    const {loading, deviceUploaded, deviceById} = useSelector(
      (state: RootState) => state.device,
    );

    const handleSubmit = (values: LoginViewMode) => {
      if (!values.deviceName || !deviceId) {
        return;
      }

      onSetLoading();

      dispatch(
        upLoadDevices({
          deviceId,
          deviceName: values.deviceName,
          deviceType: 'Thiết bị điện',
        }),
      );
    };

    const handleConnectEsp = () => {
      WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
        () => {
          console.log('Connected successfully!');
          onCloseLoading();

          navigation.navigate(NavigationScreen.ConnectEsp, {
            idEsp: deviceId,
          });
        },
        () => {
          console.log('Connection failed!');
          onCloseLoading();
          handleShowAlert(
            'Kiểm tra lại nguồn điện cho thiết bị này và kết nối lại',
          );
        },
      );
    };

    const handleShowAlert = (text: string) =>
      Alert.alert('Connect Failure', text, [
        {
          text: 'Đóng',
          onPress: () => {
            navigation.navigate(NavigationScreen.Home);
          },
        },
      ]);

    useEffect(() => {
      if (!deviceId) {
        handleShowAlert('Không có ID của thiết bị');
        return;
      }
      onSetLoading();
      dispatch(getDeviceById(deviceId));
    }, []);

    useEffect(() => {
      if ((deviceById && !deviceById.isConnected) || !deviceById) {
        handleConnectEsp();
      }

      if (deviceById && deviceById.isConnected) {
        handleShowAlert(
          'Thiết bị này đã kết nối với tài khoản khác xin vui lòng kiểm tra lại',
        );
      }
    }, [deviceById]);

    useEffect(() => {
      if (!loading && deviceUploaded && deviceId) {
        handleConnectEsp();
      }
    }, [deviceUploaded]);

    return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <Form titleHeader={'Tạo thiết bị'}>
            <InputComp
              defaultValue={item.title}
              onChange={handleChange('deviceName')}
              onBlur={() => handleBlur('deviceName')}
              placeholder={'Vui lòng nhập tên thiết bị'}
              errorMess={'Nhập tên thiết bị của bạn'}
              isError={!values.deviceName}
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
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    );
  },
);

const styles = StyleSheet.create({
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
