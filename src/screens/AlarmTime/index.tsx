import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import PushNotification from 'react-native-push-notification';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DeviceT} from '../../stores/factories/device';
import {Colors} from '../../config';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import useModalNotification from '../../Hooks/useModalNotification';
import useTimeout from '../../Hooks/useTimeout';
import {Button, InputComp} from '../../components';
import useToggle from '../../Hooks/useToggle';

const BG = require('../../assets/images/bg.png');

interface AlarmTimesProps {}

export interface TDataCountTime {
  isRunning: boolean;
}

export const AlarmTimes = ({}: AlarmTimesProps) => {
  const [isPause, setIsPause] = useState(true);
  const [valueHour, setValueHour] = useState('');
  const [valueMinute, setValueMinute] = useState('');
  const [second, setSecond] = useState(0);

  const [isShowModalTime, setShowModalTime] = useToggle(false);
  const [isHasCountTime, setHasCountTime] = useToggle(false);

  const route =
    useRoute<
      RouteProp<{params: {device: DeviceT; dataCountTime: TDataCountTime}}>
    >();
  const device = route.params.device;
  const dataCountTime = route.params.dataCountTime;

  const handleRemoveCountTime = () => {
    console.log('dsds');
  };

  const [ModalComponent, onSetModalVisible, value] = useModalNotification({
    customTextAccept: 'Xác nhận',
    customTextCancel: 'Đóng',
    customTextTitle: 'Xóa hẹn giờ',
    customTextContent:
      'Bạn có chắc chắn muốn xóa hẹn giời bật/tắt cho thiết bị này không ?',
    onAccept: handleRemoveCountTime,
  });

  const handlePushNotification = () => {
    PushNotification.localNotification({
      channelId: 'local-channel',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText:
        'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)',
      subText: 'Thông báo bật tắt thiết bị',
      bigLargeIcon: 'ic_launcher',
      color: Colors.primary,
      /* iOS and Android properties */
      id: 0,
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
      playSound: true,
      soundName: 'default',
      number: 10,
    });
  };

  const handleOnOff = () => {
    // handlePushNotification();
    setSecond(0);
  };
  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleChooseTime = () => {
    setShowModalTime(true);
  };

  const handleConfirmTime = () => {
    let hour = 0;
    let minute = 0;

    if (!valueMinute) {
      minute = 0;
    } else {
      minute = Number(valueMinute);
    }

    if (!valueHour) {
      hour = 0;
    } else {
      hour = Number(valueHour);
    }

    console.log(hour, minute);
    setSecond(hour * 60 * 60 + minute * 60);
    setShowModalTime(false);
    setHasCountTime(true);
    //request cronjob
  };

  return isHasCountTime ? (
    <ImageBackground source={BG} style={styles.container}>
      <ModalComponent />
      <Text
        style={{
          fontWeight: '700',
          fontSize: 22,
          color: Colors.WHITE,
        }}>
        Thiệt bị sẽ được {device.isTurnOn ? 'tắt' : 'bật'} sau:
      </Text>
      <CountDown
        size={30}
        until={second}
        onFinish={handleOnOff}
        style={{marginVertical: 16}}
        digitStyle={{
          backgroundColor: Colors.WHITE,
          borderWidth: 1,
          borderColor: Colors.BORDER,
          borderRadius: 14,
        }}
        digitTxtStyle={{color: Colors.TEXT}}
        timeLabelStyle={{
          color: Colors.WHITE,
          fontWeight: 'bold',
          position: 'absolute',
          bottom: -30,
        }}
        separatorStyle={{color: Colors.WHITE}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: 'Phút', s: 'Giây', h: 'Giờ'}}
        showSeparator
        running={isPause}
      />
      <TouchableOpacity style={styles.wrapperIcon} onPress={handlePause}>
        {!isPause ? (
          <Entypo
            name={'controller-play'}
            size={50}
            style={styles.icon}
            color={Colors.WHITE}
          />
        ) : (
          <AntDesign name={'pause'} size={60} color={Colors.WHITE} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={onSetModalVisible}>
        <AntDesign name={'delete'} size={35} color={Colors.WHITE} />
      </TouchableOpacity>
    </ImageBackground>
  ) : (
    <View style={styles.container}>
      <Modal visible={isShowModalTime} transparent>
        <View
          style={{
            backgroundColor: Colors.BLACK,
            opacity: 0.7,
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              minHeight: heightPercentageToDP(40),
              width: widthPercentageToDP(75),
              backgroundColor: Colors.WHITE,
              borderRadius: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <InputComp
                defaultValue={valueHour}
                onConditionsValue={value => {
                  console.log(value.length);

                  if (value.length > 2) {
                    return '23';
                  }

                  let newValue = value;
                  if (value && Number(value) > 23) {
                    newValue = '23';
                  }

                  return newValue;
                }}
                onChange={value => {
                  setValueHour(value);
                }}
                placeholder={'00'}
                containerStyle={{
                  width: 60,
                  alignItems: 'center',
                }}
                inputStyle={{
                  fontSize: 30,
                }}
                label={'Giờ'}
                containerLabelStyle={{
                  position: 'absolute',
                  bottom: -30,
                }}
                keyboardType={'numeric'}
              />
              <Text
                style={{fontSize: 30, fontWeight: '700', marginHorizontal: 8}}>
                :
              </Text>
              <InputComp
                defaultValue={valueMinute}
                onConditionsValue={value => {
                  if (value.length > 2) {
                    return '60';
                  }

                  let newValue = value;
                  if (value && Number(value) > 60) {
                    newValue = '60';
                  }

                  return newValue;
                }}
                onChange={value => {
                  setValueMinute(value);
                }}
                placeholder={'00'}
                containerStyle={{
                  width: 60,
                  alignItems: 'center',
                }}
                inputStyle={{
                  fontSize: 30,
                }}
                label={'Phút'}
                containerLabelStyle={{
                  position: 'absolute',
                  bottom: -30,
                }}
                keyboardType={'numeric'}
              />
            </View>
            <Button
              title={'Xác nhận'}
              onPress={handleConfirmTime}
              containerStyle={{
                marginTop: 60,
              }}
            />
          </View>
        </View>
      </Modal>
      <Button
        title={'Cài đặt thời gian ' + (device.isTurnOn ? 'tắt' : 'bật')}
        onPress={handleChooseTime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.BG,
  },
  wrapperIcon: {
    width: widthPercentageToDP(20),
    height: widthPercentageToDP(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: widthPercentageToDP(20),
    borderColor: Colors.BORDER,
    marginTop: 30,
  },
  icon: {
    paddingLeft: 6,
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
});
