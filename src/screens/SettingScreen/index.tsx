import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../../config';
import {resetAuth} from '../../stores/auth';
import {RootState, useAppDispatch} from '../../stores/stores';
import {removeKey} from '../../utils';
import {KeyStogare} from '../../config/KeyStorage';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';
import {ModalNotification} from '../../components';
import {useSelector} from 'react-redux';
import {NavigationScreen} from '../../config/NavigationScreen';
import useModalNotification from '../../Hooks/useModalNotification';

const HeaderProfile = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(NavigationScreen.Profile);
      }}
      style={{flexDirection: 'row', paddingHorizontal: 16}}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 150,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name={'user'} size={45} color={'#000000'} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          marginLeft: 16,
        }}>
        <View>
          <Text style={{fontWeight: '700', fontSize: 18}}>
            {user?.username}
          </Text>
          <Text style={{fontSize: 13, color: 'gray'}}>
            Sửa thông tin cá nhân
          </Text>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <AntDesign name={'right'} size={20} color={'gray'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

interface ItemType {
  Icon: React.ComponentType<any> | React.ReactElement | null | undefined;
  label: string;
  nameNavigate?: string;
}

const DataItem: ItemType[] = [
  {
    Icon: <AntDesign name={'home'} size={28} color={'#000000'} />,
    label: 'Quản lý nhà',
    nameNavigate: 'DeviceAtHome',
  },
  {
    Icon: <AntDesign name={'message1'} size={28} color={'#000000'} />,
    label: 'Trung tâm tin nhắn',
  },
  {
    Icon: <AntDesign name={'questioncircleo'} size={28} color={'#000000'} />,
    label: 'Câu hỏi thường gặp',
  },
];

enum NameNavigate {
  AddDevice = 'AddDevice',
  Home = 'Home',
  DeviceAtHome = 'DeviceAtHome',
}

type HomeStackParamList = {
  Home: undefined;
  AddDevice: undefined;
  DeviceAtHome: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'DeviceAtHome'
>;

const ListItem = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const renderItem = ({item}: {item: ItemType}) => {
    const {label, Icon} = item;

    const nameNavigate: string | undefined | null = item?.nameNavigate;

    return (
      <TouchableOpacity
        onPress={() => {
          NameNavigate.DeviceAtHome === nameNavigate
            ? navigation.navigate(NameNavigate.DeviceAtHome)
            : null;
        }}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {Icon}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            marginLeft: 16,
          }}>
          <View>
            <Text style={{fontWeight: '600', fontSize: 16}}>{label}</Text>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <AntDesign name={'right'} size={16} color={'gray'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={{
        backgroundColor: '#ffffff',
        marginVertical: 16,
        marginHorizontal: 16,
        borderRadius: 8,
      }}
      data={DataItem}
      renderItem={renderItem}
      keyExtractor={(_item, index) => `${index}`}
    />
  );
};

interface IPropsSettingScreen extends IModalLoadingPassProp {}

export const SettingScreen = ModalLoading()(
  ({onSetLoading, onCloseLoading}: IPropsSettingScreen) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const {token} = useSelector((state: RootState) => state.auth);

    const handleOpenModal = () => {
      if (!token) {
        navigation.navigate(NavigationScreen.Login);
        return;
      }
      onSetModalVisible();
    };

    const handleAccept = async () => {
      onSetLoading();
      await removeKey(KeyStogare.Token);
      dispatch(resetAuth());

      setTimeout(() => {
        onCloseLoading();
        navigation.navigate(NameNavigate.Home);
      }, 1500);
    };

    const [ModalComponent, onSetModalVisible] = useModalNotification({
      onAccept: handleAccept,
      customTextContent: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống !',
      customTextAccept: 'Đồng ý',
      customTextTitle: 'Đăng xuất',
      customTextCancel: 'Đóng',
    });

    return (
      <View
        style={{paddingTop: 16, backgroundColor: Colors.BG, height: '100%'}}>
        <ModalComponent />
        <HeaderProfile />
        <ListItem />
        <TouchableOpacity
          onPress={handleOpenModal}
          style={{
            marginVertical: 16,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16, color: 'gray', paddingVertical: 14}}>
            Thoát
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);
