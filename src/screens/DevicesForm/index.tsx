import {useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, DeviceComponent, Form, InputComp} from '../../components';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from '../../config';

import {widthPercentageToDP} from 'react-native-responsive-screen';
import {IconItemT, ListIcon} from '../../utils/common';

interface DeviceFormProps {}

interface DeviceForm {
  deviceName: string;
  icon: number;
}

const initialValues = {deviceName: '', icon: 0};

export const DeviceForm = ({}: DeviceFormProps) => {
  const [iconSelector, setIconSelector] = useState<IconItemT | null>(
    ListIcon[0],
  );
  const route = useRoute();

  const handleSubmit = (_values: DeviceForm) => {};

  return (
    <React.Fragment>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <Form titleHeader={'Sửa thiết bị'}>
            <InputComp
              defaultValue={'item.title'}
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
                defaultValue={ListIcon[0]}
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
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.title;
                }}
                rowTextForSelection={(item: any, _index: number) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
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
              loading={false}
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
