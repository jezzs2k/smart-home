import React, {useEffect} from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import {
  Button,
  CodeFieldComp,
  DeviceComponent,
  ListDevice,
  ScreenDefault,
} from '../../components';
import {Colors} from '../../config';
import {ModalLoading} from '../../components/ModalLoading';
import useTimeout from '../../Hooks/useTimeout';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../stores/stores';
import {AuthStateReducer, start} from '../../stores/auth';
import {NavigationScreen} from '../../config/NavigationScreen';
import {DeviceT, getDevices} from '../../stores/factories/device';
import {getKey, setKey} from '../../utils';
import {KeyStogare} from '../../config/KeyStorage';
import {updateUsers} from '../../stores/factories/user';

interface HomeProps {
  loading: boolean;

  onSetLoading: () => void;
  onCloseLoading: () => void;
}

export const HomeScreen = ModalLoading()(
  ({onSetLoading, onCloseLoading}: HomeProps) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const {loading, data} = useSelector((state: RootState) => state.device);
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
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });

      return unsubscribe;
    }, []);

    useEffect(() => {
      PushNotification.configure({
        onRegister: async function (token) {
          const tokenSaved = await getKey(KeyStogare.DEVICE_TOKEN);

          if (!tokenSaved) {
            await setKey(KeyStogare.DEVICE_TOKEN, token.token);
            dispatch(updateUsers({deviceToken: token.token}));
          }
        },

        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
        },

        onAction: function (notification) {},

        onRegistrationError: function (err) {
          console.error(err.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: true,

        requestPermissions: true,
      });

      // PushNotification.createChannel(
      //   {
      //     channelId: 'local-channel',
      //     channelName: 'My channel',
      //     channelDescription: 'A channel to categorise your notifications',
      //     playSound: false,
      //     soundName: 'default',
      //     importance: Importance.HIGH,
      //     vibrate: true,
      //   },
      //   created => null,
      // );
    }, []);

    useEffect(() => {
      isFocused && dispatch(getDevices());
    }, [isFocused]);

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
            data={data}
            renderItem={renderItem}
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
