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
let count = 0;
export const FormUploadDevice = ModalLoading()(
  ({onCloseLoading, onSetLoading}: FormUploadDeviceProps) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useAppDispatch();
    const route = useRoute<
      RouteProp<{
        params: {itemDevice: Device; wifiInfo: WifiInfo; deviceId: string};
      }>
    >();
    const netInfo = useNetInfo();
    const {ssid, password, isWep = true} = route.params.wifiInfo;
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
      !loading && onSetLoading();

      WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
        () => {
          console.log('Connected successfully!');
        },
        e => {
          console.log('e', e);
          

          if (count === 5) {
            onCloseLoading();
            setContent2(
              'Hệ thống lỗi không kết nối được với thiết bị \n Kiểm tra lại nguồn điện cho thiết bị này và kết nối lại',
            );
            onSetModalVisible2(true);
          }else {
            count ++;
            handleConnectEsp();
          }
         
        },
      );
    };

    const [ModalComponent, onSetModalVisible, _visible, setContent] =
      useModalNotification({
        customTextTitle: 'Kết nối ESP 8266',
        customTextCancel: 'Đóng',
        onCancel: () => navigation.navigate(NavigationScreen.Home),
        isJustShowCancel: true,
      });
    const [ModalComponent1, onSetModalVisible1, _visible1, setContent1] =
      useModalNotification({
        customTextTitle: 'Kết nối ESP 8266',
        customTextCancel: 'Đóng',
        customTextAccept: 'Đồng ý',
        onCancel: () => navigation.navigate(NavigationScreen.Home),
        onAccept: handleConnectEsp,
      });
    const [ModalComponent2, onSetModalVisible2, _visible2, setContent2] =
      useModalNotification({
        customTextTitle: 'Kết nối ESP 8266',
        customTextCancel: 'Đóng',
        customTextAccept: 'Kết nối lại',
        onCancel: () => navigation.navigate(NavigationScreen.Home),
        onAccept: handleConnectEsp,
      });

    useEffect(() => {
      if (
        netInfo &&
        netInfo.isConnected &&
        netInfo.details?.ssid === 'SMART_HOME_ESP8266'
      ) {
        navigation.navigate(NavigationScreen.ConnectEsp, {
          idEsp: deviceId,
          wifiInfo: route.params.wifiInfo,
        });
      }
    }, [netInfo]);

    useEffect(() => {
      if (!deviceId) {
        setContent('Không có ID của thiết bị');
        onSetModalVisible(true);
        return;
      }
      // onSetLoading();
      // dispatch(getDeviceById(deviceId));
    }, []);

    useEffect(() => {
      return () => {
        onCloseLoading();
        dispatch(resetDevice());
      };
    }, []);

    // useEffect(() => {
    //   if (deviceById && deviceById.isConnected) {
    //     setContent(
    //       'Thiết bị này đã kết nối với tài khoản khác xin vui lòng kiểm tra lại',
    //     );
    //     onSetModalVisible(true);
    //   }

    //   if (deviceById && !deviceById.isConnected) {
    //     setContent1(
    //       'Kết nối với điện thoại với thiết bị ESP để thiết lập hệ thống ?',
    //     );
    //     onSetModalVisible1(true);
    //   }

    //   onCloseLoading();
    // }, [deviceById]);

    useEffect(() => {
      if (!loading && deviceUploaded && deviceId) {
        setContent1(
          'Kết nối với điện thoại với thiết bị ESP để thiết lập hệ thống ?',
        );
        onSetModalVisible1(true);
      }
    }, [deviceUploaded]);

    return (
      <React.Fragment>
        <ModalComponent />
        <ModalComponent1 />
        <ModalComponent2 />
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
