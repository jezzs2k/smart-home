import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {useNetInfo} from '@react-native-community/netinfo';
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
import useModalNotification from '../../Hooks/useModalNotification';
import { resetDevice } from '../../stores/device';

interface FormUploadDeviceProps extends IModalLoadingPassProp {}

export interface WifiInfo {
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
        params: {itemDevice: Device; wifiInfo: WifiInfo; deviceId: string};
      }>
    >();
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
      navigation.navigate(NavigationScreen.ConnectEsp, {
        idEsp: deviceId,
        wifiInfo: route.params.wifiInfo,
      });
    };

    const [ModalComponent, onSetModalVisible, _visible, setContent] =
      useModalNotification({
        customTextTitle: 'Kết nối ESP 8266',
        customTextCancel: 'Đóng',
        onCancel: () => navigation.navigate(NavigationScreen.Home),
        isJustShowCancel: true,
      });

    useEffect(() => {
      if (!deviceId) {
        setContent('Không có ID của thiết bị');
        onSetModalVisible(true);
        return;
      }
    }, []);

    useEffect(() => {
      return () => {
        onCloseLoading();
        dispatch(resetDevice());
      };
    }, []);

    useEffect(() => {
      if (!loading && deviceUploaded && deviceId) {
        onCloseLoading();
        handleConnectEsp();
      }
    }, [deviceUploaded]);

    return (
      <React.Fragment>
        <ModalComponent />
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
      </React.Fragment>
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
