import {
  NavigationProp,
  RouteProp,
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
import {DeviceComponent} from '../../components';
import {Colors} from '../../config';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';

const OnImage = require('../../assets/images/power-off.png');
const OffImage = require('../../assets/images/power-on.png');
const BlueBg = require('../../assets/images/blue-bg.jpg');

const ListItem = [
  {
    title: 'Thời gian sử dụng: ',
    value: '30 P',
  },
  {
    title: 'Lượng điện tiêu thụ: ',
    value: '30 KWH',
  },
];

let dataFirebase = {};

interface DeviceDetailsProps extends IModalLoadingPassProp {}

export const DeviceDetails = ModalLoading()(
  ({onCloseLoading, onSetLoading}: DeviceDetailsProps) => {
    const [isTurnOn, setIsTurnOn] = useState(false);

    const route = useRoute<RouteProp<{params: {item: DeviceT}}>>();
    const itemDevice = route.params.item;

    const navigation = useNavigation<NavigationProp<any>>();

    const handleBack = () => navigation.goBack();

    const handleTurnOne = () => {
      onSetLoading();
      database()
        .ref('/' + itemDevice.deviceId)
        .set({...dataFirebase, isTurnOn: String(!isTurnOn)}, e => {
          if (e == null) {
            setIsTurnOn(!isTurnOn);
          }
          setTimeout(onCloseLoading, 1000);
        });
    };

    useEffect(() => {
      onSetLoading();
      if (itemDevice.deviceId) {
        database()
          .ref('/' + itemDevice.deviceId)
          .once('value')
          .then(snapshot => {
            onCloseLoading();
            const data = snapshot.val();
            dataFirebase = data;

            if (data.isTurnOn == 'true') {
              setIsTurnOn(true);
            } else {
              setIsTurnOn(false);
            }
          })
          .catch(() => {
            onCloseLoading();
          });
      }

      return () => {
        database().ref(`/${itemDevice.deviceId}`).off();
      };
    }, []);

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
          <TouchableOpacity style={styles.btnOnOff} onPress={handleTurnOne}>
            {isTurnOn ? (
              <Image source={OnImage} style={styles.image} />
            ) : (
              <Image source={OffImage} style={styles.image} />
            )}
          </TouchableOpacity>
          <FlatList
            style={styles.listsInfo}
            data={ListItem}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Text style={[styles.text, styles.textBold]}>{item.title}</Text>
                <Text style={[styles.text, styles.textSmall]}>
                  {item.value}
                </Text>
              </View>
            )}
            ListFooterComponent={
              <Text style={[styles.text, styles.textSmall]}>
                {'Bạn chưa cài đặt thời gian Bật/Tắt cho thiết bị này'}
              </Text>
            }
          />
          <TouchableOpacity style={styles.timeCount}>
            <Text style={[styles.text, styles.textSmall, styles.textLink]}>
              {'Cài đặt thời gian bật/tắt'}
            </Text>
            <AntDesign name={'arrowright'} size={26} color={Colors.primary} />
          </TouchableOpacity>
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
    backgroundColor: '#ffffff',
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
  backBtnStyle: {backgroundColor: '#fff', height: 40, width: 40},
  image: {
    width: 100,
    height: 100,
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
    fontSize: 18,
  },
  textBold: {
    fontWeight: '700',
  },
  textSmall: {
    fontSize: 16,
  },
  timeCount: {
    paddingHorizontal: 22,
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
