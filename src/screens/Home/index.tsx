import React, {useEffect} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {useNetInfo} from '@react-native-community/netinfo';

import {Button, DeviceComponent, ScreenDefault} from '../../components';
import {Colors} from '../../config';
import {ModalLoading} from '../../components/ModalLoading';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../stores/stores';
import {NavigationScreen} from '../../config/NavigationScreen';
import {DeviceT, getDevices} from '../../stores/factories/device';
import {updateUsers} from '../../stores/factories/user';
interface HomeProps {
  loading: boolean;

  onSetLoading: () => void;
  onCloseLoading: () => void;
}

export const HomeScreen = ModalLoading()(
  ({onSetLoading, onCloseLoading}: HomeProps) => {
    const netInfo = useNetInfo();

    const navigation = useNavigation<NavigationProp<any>>();
    const {loading, data} = useSelector((state: RootState) => state.device);
    const {token: tokenAcc} = useSelector((state: RootState) => state.auth);
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();

    const handleAddDevices = () => {
      navigation.navigate(NavigationScreen.AddDevice);
    };

    const handleCheckData = (data?: DeviceT[] | null) => {
      if (!data) {
        return false;
      }

      return data.findIndex(item => item.isConnected === true) !== -1;
    };

    useEffect(() => {
      if (tokenAcc) {
        messaging()
          .getToken()
          .then(token => {
            dispatch(updateUsers({deviceToken: token}));
          });
      }
    }, [tokenAcc]);

    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        if (remoteMessage && remoteMessage.notification) {
          PushNotification.localNotification({
            channelId: 'local-channel',
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_notification',
            bigText: remoteMessage.notification.body,
            subText: 'Thông báo bật tắt thiết bị',
            bigLargeIcon: 'ic_launcher',
            color: Colors.primary,
            id: 0,
            title: remoteMessage.notification.title, 
            message: remoteMessage.notification.body!, 
            playSound: true,
            soundName: 'default',
          });
        }
      });
      return unsubscribe;
    }, []);

    useEffect(() => {
      if (tokenAcc) {
        PushNotification.configure({
          onRegister: async function (token) {
            if (token) {
              dispatch(updateUsers({deviceToken: token}));
            }
          },

          onNotification: function (notification) {
            PushNotification.localNotification({
              channelId: 'local-channel',
              largeIcon: 'ic_launcher',
              smallIcon: 'ic_notification',
              bigText: notification.data.content,
              subText: 'Thông báo bật tắt thiết bị',
              bigLargeIcon: 'ic_launcher',
              color: Colors.primary,
              id: 0,
              title: notification.data.title, 
              message: notification.data.content, 
              playSound: true,
              soundName: 'default',
              number: 10,
            });
            dispatch(getDevices());
          },

          onAction: function (notification) {},

          onRegistrationError: function (err) {
          },

          permissions: {
            alert: true,
            badge: true,
            sound: true,
          },

          popInitialNotification: true,

          requestPermissions: Platform.OS === 'ios',
        });

        PushNotification.createChannel(
          {
            channelId: 'local-channel', 
            channelName: 'My channel', 
            channelDescription: 'A channel to categorise your notifications',
            playSound: false,
            soundName: 'default',
            importance: Importance.HIGH,
            vibrate: true,
          },
          created => true,
        );
      }
    }, [tokenAcc]);

    useEffect(() => {
      isFocused && dispatch(getDevices());
    }, [isFocused, netInfo]);

    useEffect(() => {
      if (loading && !data) {
        onSetLoading();
      }

      if (!loading) {
        onCloseLoading();
      }
    }, [loading]);

    if (loading && !data) {
      return null;
    }

    const renderItem = ({item}: {item: DeviceT}) => {
      if (!item.isConnected) {
        return null;
      }
      return (
        <DeviceComponent
          isTurnOn={item.isTurnOn}
          title={item.deviceName}
          onPress={() => {
            navigation.navigate(NavigationScreen.DeviceDetails, {item});
          }}
          keyItem={item.id}
        />
      );
    };

    if (handleCheckData(data)) {
      return (
        <View style={styles.container}>
          <FlatList
            data={data?.filter(item => item.isConnected)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScreenDefault
          titleScreen={'Không có thiết bị, vui lòng thêm'}
          onPress={handleAddDevices}
          ButtonComp={
            <Button
              onPress={handleAddDevices}
              title={'Thêm thiết bị'}
              isShowIcon={false}
            />
          }
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
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
