import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Platform,
  Animated,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker, {
  WindowsDatePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import {DeviceT} from '../../stores/factories/device';
import {Colors} from '../../config';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import useModalNotification from '../../Hooks/useModalNotification';
import {Button, InputComp} from '../../components';
import useToggle from '../../Hooks/useToggle';
import {useAppDispatch} from '../../stores/stores';
import {
  cancelLifeTime,
  cancelTimeOut,
  createLifeTime,
  createTimeOut,
} from '../../stores/factories/timeOut';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import {formatDateToString, formatTimeToString} from '../../utils/formatDate';
import {DataWorkerT} from '../DeviceDetails';

const BG = require('../../assets/images/bg.png');

interface RouteType {
  key: string;
  title: string;
}

interface AlarmTimesProps {}

export const AlarmTimes = ({}: AlarmTimesProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<
    RouteProp<{
      params: {device: DeviceT; dataCountTime: DataWorkerT | null};
    }>
  >();
  const device = route.params.device;
  const dataCountTime = route.params.dataCountTime;

  const [isPause, setIsPause] = useState(true);
  const [valueHour, setValueHour] = useState('');
  const [valueMinute, setValueMinute] = useState('');
  const [second, setSecond] = useState(dataCountTime?.remainSeconds || 0);

  const [stateTab, useStateTab] = useState({
    index: 0,
    routes: [
      {key: 'first1', title: 'kho???ng th???i gian'},
      {key: 'second1', title: 'Th???i gian th???c'},
    ],
  });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [turnOnTime, setTurnOnTime] = useState(
    dataCountTime?.dateOn ? new Date(dataCountTime?.dateOn!) : new Date(),
  );
  const [turnOffTime, setTurnOffTime] = useState(
    dataCountTime?.dateOff ? new Date(dataCountTime?.dateOff!) : new Date(),
  );
  const [isSetTurnOn, setModeTurn] = useToggle(false);

  const onChange = (
    event: WindowsDatePickerChangeEvent | any,
    selectedDate?: Date,
  ): void => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    if (isSetTurnOn) {
      setTurnOnTime(currentDate);
    } else {
      const time1 = currentDate.getTime() - turnOnTime.getTime();

      if (time1 < 0) {
        setTurnOffTime(new Date(turnOnTime.getTime() + 1000 * 60));
      } else {
        setTurnOffTime(currentDate);
      }
    }
    // setDate(currentDate);
  };

  const [isShowModalTime, setShowModalTime] = useToggle(false);
  const [isHasCountTime, setHasCountTime] = useToggle(!!dataCountTime || false);
  const [isRealLifeTime, setIsRealLifeTime] = useToggle(
    dataCountTime?.isRealLifeTime!,
  );

  const handleSetRealTime = (isTimeOn: boolean) => {
    if (isTimeOn) {
      setModeTurn(true);
    } else {
      setModeTurn(false);
    }

    setShow(true);
  };

  const renderScene = SceneMap({
    first1: () => (
      <View
        key={'first1'}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <InputComp
          defaultValue={valueHour}
          onConditionsValue={value => {
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
          label={'Gi???'}
          containerLabelStyle={{
            position: 'absolute',
            bottom: -30,
          }}
          keyboardType={'numeric'}
        />
        <Text style={{fontSize: 30, fontWeight: '700', marginHorizontal: 8}}>
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
          label={'Ph??t'}
          containerLabelStyle={{
            position: 'absolute',
            bottom: -30,
          }}
          keyboardType={'numeric'}
        />
      </View>
    ),
    second1: () => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={'second1'}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <Button
              title={'C??i ?????t th???i gian b???t'}
              onPress={() => handleSetRealTime(true)}
              containerStyle={{
                marginVertical: 4,
                backgroundColor: Colors.LIGHT_GREEN,
              }}
              isShowIcon={false}
            />
            <Text style={styles.text}>
              {turnOnTime ? formatTimeToString(turnOnTime) : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <Button
              title={'C??i ?????t th???i gian t???t'}
              onPress={() => handleSetRealTime(false)}
              containerStyle={{
                marginVertical: 4,
                backgroundColor: Colors.LIGHT_RED,
              }}
              isShowIcon={false}
            />
            <Text style={styles.text}>
              {turnOffTime ? formatTimeToString(turnOffTime) : ''}
            </Text>
          </View>
        </View>
      </View>
    ),
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>;
    },
  ) => {
    const inputRange = props.navigationState.routes.map((x, i: number) => i);
    const handleBack = () => setShowModalTime(false);

    return (
      <View style={styles.tabBar}>
        <ModalComponent />
        {props.navigationState.routes.map((route: RouteType, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <React.Fragment>
              {i === 0 && (
                <TouchableOpacity
                  onPress={handleBack}
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 8,
                  }}>
                  <AntDesign name={'close'} color={'#000'} size={20} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => useStateTab(state => ({...state, index: i}))}>
                <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const handleCreateWorker = (deviceId: string, seconds: number) => {
    dispatch(createTimeOut({deviceId, seconds}));
  };

  const handleCreateWorkerlifeTime = (deviceId: string) => {
    dispatch(
      createLifeTime({
        deviceId,
        dateOff: String(turnOffTime),
        dateOn: String(turnOnTime),
      }),
    );
  };

  const handleRemoveCountTime = () => {
    if (dataCountTime?.isRealLifeTime) {
      dispatch(cancelLifeTime({deviceId: device.deviceId}));
    } else {
      dispatch(cancelTimeOut({deviceId: device.deviceId}));
    }
    handleOnOff();
  };

  const [ModalComponent, onSetModalVisible, value] = useModalNotification({
    customTextAccept: 'X??c nh???n',
    customTextCancel: '????ng',
    customTextTitle: 'X??a h???n gi???',
    customTextContent:
      'B???n c?? ch???c ch???n mu???n x??a h???n gi???i b???t/t???t cho thi???t b??? n??y kh??ng ?',
    onAccept: handleRemoveCountTime,
  });

  const handleOnOff = () => {
    setSecond(0);
    setShowModalTime(false);
    setHasCountTime(false);
    setValueHour('');
    setValueMinute('');
  };
  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleChooseTime = () => {
    setShowModalTime(true);
  };

  const handleIndexChange = (index: number) =>
    useStateTab(state => ({...state, index: index}));

  const handleConfirmTime = () => {
    if (stateTab.index === 1) {
      setIsRealLifeTime(true);
      setShowModalTime(false);
      setHasCountTime(true);
      handleCreateWorkerlifeTime(device.deviceId);

      return;
    }

    if (!valueMinute && !valueHour) {
      setShowModalTime(false);
      return;
    }

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

    const _seconds = hour * 60 * 60 + minute * 60;

    setSecond(_seconds);
    setShowModalTime(false);
    setHasCountTime(true);
    handleCreateWorker(device.deviceId, _seconds);
  };

  return isHasCountTime ? (
    <ImageBackground source={BG} style={styles.container}>
      <ModalComponent />
      {isRealLifeTime ? (
        <View
          style={{
            backgroundColor: Colors.BG_INPUT,
            marginHorizontal: 8,
            borderRadius: 8,
            marginTop: 8,
            position: 'absolute',
            top: 0,
          }}>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 6,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                marginVertical: 4,
              }}>
              <Text
                style={{
                  color: Colors.LIGHT_GREEN,
                }}>
                Th???i gian b???t v??o l??c:
              </Text>{' '}
              {formatTimeToString(turnOnTime)}
              {' - '}
              {formatDateToString(turnOnTime)}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 6,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                marginVertical: 4,
              }}>
              <Text style={{color: Colors.LIGHT_RED}}>
                Th???i gian t???t v??o l??c:
              </Text>{' '}
              {formatTimeToString(turnOffTime)}
              {' - '}
              {formatDateToString(turnOffTime)}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          style={{
            fontWeight: '700',
            fontSize: 22,
            color: Colors.WHITE,
          }}>
          Thi???t b??? s??? ???????c {device.isTurnOn ? 't???t' : 'b???t'} sau:
        </Text>
      )}

      <CountDown
        size={30}
        until={
          isRealLifeTime
            ? (new Date(turnOffTime!).getTime() -
                new Date().getTime() +
                42 * 1000) /
              1000
            : second
        }
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
        timeLabels={{m: 'Ph??t', s: 'Gi??y', h: 'Gi???'}}
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
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
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
              width: widthPercentageToDP(85),
              backgroundColor: Colors.WHITE,
              borderRadius: 14,
            }}>
            <TabView
              navigationState={stateTab}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={handleIndexChange}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Button
                title={'X??c nh???n'}
                onPress={handleConfirmTime}
                containerStyle={{
                  marginTop: 60,
                }}
                isShowIcon={false}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title={'C??i ?????t th???i gian ' + (device.isTurnOn ? 't???t' : 'b???t')}
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
  text: {
    fontWeight: '700',
    fontSize: 18,
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
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
