import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import database from '@react-native-firebase/database';

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
      //Navigation
      navigation.navigate(NavigationScreen.AddDevice);
    };

    const handleCheckData = (data?: DeviceT[] | null) => {
      if (!data) {
        return false;
      }

      return data.findIndex(item => item.isConnected === true) !== -1;
    };

    useEffect(() => {
      isFocused && dispatch(getDevices());
    }, [isFocused]);

    useEffect(() => {
      database()
        .ref('/36d57abd-7e84-4079-afc0-cc9693a6dd90')
        .once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
        });
    }, []);

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
