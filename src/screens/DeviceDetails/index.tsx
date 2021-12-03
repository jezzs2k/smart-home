import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import {DeviceT} from '../../stores/factories/device';
import {Button, DeviceComponent} from '../../components';
import {Colors} from '../../config';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';
import {NavigationScreen} from '../../config/NavigationScreen';
import {RootState, useAppDispatch} from '../../stores/stores';
import {getUser, WorkerT} from '../../stores/factories/user';
import {useSelector} from 'react-redux';
import {checkTimeOut} from '../../stores/factories/timeOut';

const OnImage = require('../../assets/images/power-off.png');
const OffImage = require('../../assets/images/power-on.png');
const BlueBg = require('../../assets/images/blue-bg.jpg');

let dataFirebase: any = {};

export interface DataWorkerT {
  isRunning: boolean;
  name?: string;
  seconds?: number;
  remainSeconds?: number;
  name1?: string;
  name2?: string;
  isRealLifeTime: boolean;
  dateOff?: string;
  dateOn?: string;
}

interface DeviceDetailsProps extends IModalLoadingPassProp {}

export const DeviceDetails = ModalLoading()(
  ({onCloseLoading, onSetLoading}: DeviceDetailsProps) => {
    const isFocused = useIsFocused();
    const [isTurnOn, setIsTurnOn] = useState(false);
    const [dataWorker, setDataWorker] = useState<DataWorkerT | null>(null);
    const [listItem, setListItem] = useState([
      {
        title: 'Thời gian sử dụng: ',
        value: '0 Phút',
      },
      {
        title: 'Lượng điện tiêu thụ: ',
        value: '0 KWH',
      },
    ]);

    const route = useRoute<RouteProp<{params: {item: DeviceT}}>>();
    const itemDevice = route.params.item;

    const dispatch = useAppDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const {data, loading} = useSelector((state: RootState) => state.user);
    const {data: dataTime} = useSelector((state: RootState) => state.timeOut);

    const handleBack = () => navigation.goBack();

    const handleToDetailWatt = () =>
      navigation.navigate(NavigationScreen.DeviceDetailsWatt, {
        item: itemDevice,
      });

    const handleSetDataMinute = (data: any) => {
      let valueEnrgy: any = {};
      data.energy.split(',').forEach((item: string, index: number) => {
        if (index === 0) {
          valueEnrgy[item.split(':')[0].split('{')[1]] = item.split(':')[1];
        }

        if (item !== '}') {
          valueEnrgy[item.split(':')[0]] = item.split(':')[1];
        }
      });

      setListItem(values =>
        values.map((item, index) => {
          if (index === 0) {
            return {
              ...item,
              value:
                String(
                  Math.round(
                    (data.totalTimeOn + new Date().getTime() - data.startTime) /
                      (1000 * 60),
                  ),
                ) + ' Phút',
            };
          } else {
            return {...item, value: String(valueEnrgy.power || 0) + ' KWH'};
          }
        }),
      );
    };

    const handleTurnOn = () => {
      database()
        .ref('/' + itemDevice.deviceId)
        .set({...dataFirebase, isTurnOn: String(!isTurnOn)}, e => {
          if (e == null) {
            setIsTurnOn(!isTurnOn);
          }
        });

      dispatch(checkTimeOut({deviceId: itemDevice.deviceId}));
    };

    const handleNavigateToOnOff = () => {
      navigation.navigate(NavigationScreen.AlarmTimes, {
        device: itemDevice,
        dataCountTime: dataWorker,
      });
    };

    const handleGetWorker = (workers: WorkerT[]) => {
      const worker = workers.find(item => item.name === itemDevice.deviceId);
      const worker1 = workers.find(
        item => item.name1 === itemDevice.deviceId + 'true',
      );

      if (!worker && !worker1) {
        return;
      }

      const currentDate = new Date();

      const startDate = new Date(worker?.createdAt!);

      if (worker1) {
        setDataWorker({
          isRunning: worker1?.isRunning!,
          remainSeconds: 0,
          dateOff: worker1?.dateOff,
          dateOn: worker1?.dateOn,
          isRealLifeTime: worker1.isRealLifeTime,
          name1: worker1?.name1,
          name2: worker1?.name2,
        });
      }

      if (worker) {
        setDataWorker({
          isRunning: worker?.isRunning!,
          name: worker?.name!,
          seconds: worker?.seconds!,
          remainSeconds:
            worker?.seconds! +
            38 -
            Math.round((currentDate.getTime() - startDate.getTime()) / 1000),
          isRealLifeTime: worker.isRealLifeTime,
        });
      }
    };

    useEffect(() => {
      if (dataTime?.success) {
        setDataWorker(null);
      }
    }, [dataTime]);

    useEffect(() => {
      if (data?.workers && !loading) {
        handleGetWorker(data.workers);
      } else {
        setDataWorker(null);
      }
    }, [data, loading]);

    useEffect(() => {
      if (isFocused) {
        setDataWorker(null);
        dispatch(getUser());
      }
    }, [isFocused]);

    useEffect(() => {
      if (isFocused) {
        if (itemDevice.deviceId) {
          onSetLoading();
          database()
            .ref('/' + itemDevice.deviceId)
            .on('value', snapshot => {
              onCloseLoading();
              const data = snapshot.val();
              dataFirebase = data;

              dataWorker && dispatch(getUser());

              handleSetDataMinute(data);

              if (data.isTurnOn === 'true') {
                !isTurnOn && setIsTurnOn(true);
              } else {
                isTurnOn && setIsTurnOn(false);
              }
            });
        }
      }

      return () => {
        database().ref(`/${itemDevice.deviceId}`).off();
      };
    }, [isFocused]);

    return (
      <ImageBackground
        source={BlueBg}
        style={[styles.bgTop]}
        resizeMode="cover">
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <AntDesign name={'arrowleft'} size={40} />
          </TouchableOpacity>
          <DeviceComponent
            isTurnOn={isTurnOn}
            title={itemDevice.deviceName}
            onPress={() => {}}
            keyItem={itemDevice.id}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnOnOff} onPress={handleTurnOn}>
            {isTurnOn ? (
              <Image source={OnImage} style={styles.image} />
            ) : (
              <Image source={OffImage} style={styles.image} />
            )}
          </TouchableOpacity>
          <FlatList
            style={styles.listsInfo}
            data={listItem}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Text style={[styles.text, styles.textBold]}>{item.title}</Text>
                <Text style={[styles.text, styles.textSmall]}>
                  {item.value}
                </Text>
                {item.title === 'Lượng điện tiêu thụ: ' && (
                  <TouchableOpacity
                    style={styles.timeCount}
                    onPress={handleToDetailWatt}>
                    <Text
                      style={[styles.text, styles.textSmall2, styles.textLink]}>
                      {'Xem chi tiết'}
                    </Text>
                    <AntDesign
                      name={'arrowright'}
                      size={22}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            ListFooterComponent={
              dataWorker ? (
                <Button
                  onPress={handleNavigateToOnOff}
                  title={'Xem hẹn giờ'}
                  Icon={
                    <AntDesign
                      name={'clockcircleo'}
                      size={22}
                      color={Colors.WHITE}
                    />
                  }
                />
              ) : (
                <Text style={[styles.text, styles.textSmall]}>
                  {'Bạn chưa cài đặt thời gian Bật/Tắt cho thiết bị này'}
                </Text>
              )
            }
          />
          {!dataWorker && (
            <TouchableOpacity
              style={styles.timeCount}
              onPress={handleNavigateToOnOff}>
              <Text style={[styles.text, styles.textSmall, styles.textLink]}>
                {'Cài đặt thời gian bật/tắt'}
              </Text>
              <AntDesign name={'arrowright'} size={26} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    );
  },
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 22,
    alignItems: 'center',
  },
  footer: {
    backgroundColor: Colors.WHITE,
    height: '60%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
  },
  bgTop: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 132,
    justifyContent: 'space-between',
  },
  backBtnContainer: {
    borderRadius: 10,
    marginLeft: 22,
    marginTop: 52,
    position: 'absolute',
  },
  backBtnStyle: {
    backgroundColor: Colors.WHITE,
    height: 40,
    width: 40,
  },
  image: {
    width: 70,
    height: 70,
  },
  btnOnOff: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  listsInfo: {
    paddingHorizontal: 22,
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    color: Colors.TEXT1,
  },
  textBold: {
    fontWeight: '700',
  },
  textSmall: {
    fontSize: 16,
  },
  textSmall2: {
    fontSize: 14,
  },
  timeCount: {
    paddingLeft: 8,
    paddingBottom: 22,
    flexDirection: 'row',
  },
  textLink: {
    color: Colors.primary,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});
