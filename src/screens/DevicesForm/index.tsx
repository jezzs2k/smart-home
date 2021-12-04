import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Form, InputComp} from '../../components';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from '../../config';

import {IconItemT, ListIcon} from '../../utils/common';
import {DeviceT, updateDevices} from '../../stores/factories/device';
import {RootState, useAppDispatch} from '../../stores/stores';
import {useSelector} from 'react-redux';
import useModalNotification from '../../Hooks/useModalNotification';
import {NavigationScreen} from '../../config/NavigationScreen';
import {resetUpdateDevice} from '../../stores/device';

interface DeviceFormProps {}

interface DeviceForm {
  deviceName: string;
  icon: number;
}

const initialValues = {deviceName: '', icon: 0};

export const DeviceForm = ({}: DeviceFormProps) => {
  const dispatch = useAppDispatch();
  const [iconSelector, setIconSelector] = useState<IconItemT | null>(
    ListIcon[0],
  );
  const {loading, deviceUpdated} = useSelector(
    (state: RootState) => state.device,
  );
  const route = useRoute<RouteProp<{params: {item: DeviceT}}>>();
  const navigation = useNavigation<NavigationProp<any>>();

  const device = route.params.item;

  const handleSubmit = (values: DeviceForm) => {
    dispatch(
      updateDevices({
        deviceName: values.deviceName,
        icon: iconSelector?.index,
        deviceId: device.deviceId,
      }),
    );
  };

  const [ModalComponent, onSetModalVisible, visible, setContent] =
    useModalNotification({
      customTextTitle: 'Kết nối thành công',
      customTextContent: 'Sửa thiết bị thành công',
      customTextCancel: 'Đóng',
      isJustShowCancel: true,
      onCancel: () => {
        dispatch(resetUpdateDevice());
        navigation.navigate(NavigationScreen.Home);
      },
    });

  useEffect(() => {
    const iconDefault = ListIcon.find(
      item => item.index === (device?.icon || 0),
    );

    iconDefault && setIconSelector(iconDefault);
  }, []);

  useEffect(() => {
    if (!loading && deviceUpdated) {
      onSetModalVisible();
    }
  }, [deviceUpdated]);
  return (
    <React.Fragment>
      <ModalComponent />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <Form titleHeader={'Sửa thiết bị'}>
            <InputComp
              defaultValue={device.deviceName}
              onChange={handleChange('deviceName')}
              onBlur={() => handleBlur('deviceName')}
              placeholder={'Vui lòng nhập tên thiết bị'}
              errorMess={'Nhập tên thiết bị của bạn'}
              isError={!values.deviceName}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 8,
              }}>
              <SelectDropdown
                data={ListIcon}
                onSelect={(selectedItem: IconItemT, _index: number) => {
                  setIconSelector(selectedItem);
                }}
                defaultValue={iconSelector}
                buttonStyle={{
                  borderRadius: 8,
                  backgroundColor: Colors.BG_INPUT,
                }}
                buttonTextStyle={{
                  color: Colors.BLACK,
                  fontSize: 16,
                }}
                dropdownStyle={{
                  borderRadius: 8,
                }}
                buttonTextAfterSelection={(
                  selectedItem: any,
                  _index: number,
                ) => {
                  return selectedItem.title;
                }}
                rowTextForSelection={(item: any, _index: number) => {
                  return item.title;
                }}
              />
              {iconSelector && iconSelector.icon}
            </View>
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
};

const styles = StyleSheet.create({
  container: {},
});
