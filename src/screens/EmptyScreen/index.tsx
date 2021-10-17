import React from 'react';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const EmptyScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <AntDesign name={'close'} color={'#000'} size={35} />
      <Text style={{marginVertical: 8, color: '#000', fontWeight: '700'}}>
        Empty Screen
      </Text>
    </View>
  );
};
