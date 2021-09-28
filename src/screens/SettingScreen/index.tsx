import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../config';

const HeaderProfile = () => (
  <TouchableOpacity
    onPress={() => {}}
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
        <Text style={{fontWeight: '700', fontSize: 18}}>Vu Thanh Hieu</Text>
        <Text style={{fontSize: 13, color: 'gray'}}>Sửa thông tin cá nhân</Text>
      </View>

      <TouchableOpacity onPress={() => {}}>
        <AntDesign name={'right'} size={20} color={'gray'} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

interface ItemType {
  Icon: React.ComponentType<any> | React.ReactElement | null | undefined;
  label: string;
}

const DataItem: ItemType[] = [
  {
    Icon: <AntDesign name={'home'} size={28} color={'#000000'} />,
    label: 'Quản lý nhà',
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

const ListItem = () => {
  const renderItem = ({item}: {item: ItemType}) => {
    const {label, Icon} = item;

    return (
      <TouchableOpacity
        onPress={() => {}}
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

export const SettingScreen = () => {
  return (
    <View style={{paddingTop: 16, backgroundColor: Colors.BG, height: '100%'}}>
      <HeaderProfile />
      <ListItem />
      <TouchableOpacity
        onPress={() => {}}
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
};
