import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../config';
import {NavigationScreen} from '../../config/NavigationScreen';
import useModalNotification from '../../Hooks/useModalNotification';
import useToggle from '../../Hooks/useToggle';
import {deleteDevice, DeviceT} from '../../stores/factories/device';
import {useAppDispatch} from '../../stores/stores';

import {LightBulb} from '../Svgs';

interface DeviceComponentProps {
  title: string;
  subTitle?: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  ICON?: React.ComponentType<any> | React.ReactElement | null;
  keyItem: string;
  isTurnOn?: boolean;
  isShowDevice1?: boolean;
  item?: DeviceT | null;
  onDeleteDevice?: () => void;
}

export const DeviceComponent = ({
  ICON,
  title,
  isTurnOn = false,
  subTitle,
  keyItem,
  onPress,
  isShowDevice1 = false,
  item = null,
  onDeleteDevice,
}: DeviceComponentProps) => {
  if (isShowDevice1) {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useAppDispatch();
    const [isOpen, onOpen] = useToggle(false);
    const handleOpenModal = () => {
      onOpen();
    };

    const handleToEdit = () => {
      navigation.navigate(NavigationScreen.DeviceForm, {item});
      onOpen();
    };

    const [ModalComponent, onSetModalVisible, visible, setContent] =
      useModalNotification({
        customTextTitle: 'Xóa thiết bị ' + item?.deviceName,
        customTextContent: 'Bạn có chắc chắn muốn xóa thiết bị này ?',
        customTextCancel: 'Đóng',
        customTextAccept: 'Đồng ý',
        onCancel: () => {
          onOpen();
        },
        onAccept: () => {
          dispatch(deleteDevice(item?.deviceId!));
          onDeleteDevice && onDeleteDevice();
          onOpen();
        },
      });

    return (
      <TouchableOpacity
        style={[
          styles.container,
          isTurnOn && {backgroundColor: 'rgb(255, 210, 63)'},
        ]}
        onPress={onPress}
        key={keyItem}>
        <ModalComponent />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {ICON ?? <LightBulb size={80} color={isTurnOn ? '#f5820c' : null} />}
          <View style={styles.text}>
            <Text numberOfLines={2} style={styles.textStyle}>
              {title}
            </Text>
            <Text style={styles.textStyle}>({subTitle ?? 'Wi-Fi'})</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleOpenModal}
          style={{
            padding: 14,
          }}>
          <AntDesign name={'ellipsis1'} size={30} />
        </TouchableOpacity>

        {isOpen && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: Colors.WHITE,
              width: widthPercentageToDP(30),
              right: 60,
              top: 20,
              borderRadius: 8,
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 5,
                right: 8,
                zIndex: 1080,
              }}
              onPress={handleOpenModal}>
              <AntDesign name={'closecircleo'} size={20} color={Colors.BLACK} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 8,
              }}
              onPress={handleToEdit}>
              <Text style={{color: '#ff7600', fontSize: 16}}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSetModalVisible}
              style={{
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 8,
              }}>
              <Text style={{color: Colors.RED, fontSize: 16}}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container2} onPress={onPress} key={keyItem}>
      {ICON ?? <LightBulb size={80} color={isTurnOn ? '#f5820c' : null} />}
      <View style={styles.text2}>
        <Text numberOfLines={2} style={styles.textStyle}>
          {title}
        </Text>
        <Text style={styles.textStyle}>({subTitle ?? 'Wi-Fi'})</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 8,
  },
  text2: {
    marginVertical: 8,
    maxWidth: 85,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 8,
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: Colors.BG_INPUT,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  text: {
    marginVertical: 8,
    maxWidth: 85,
    marginLeft: 16,
  },
  textStyle: {
    textAlign: 'center',
  },
});
