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
        backgroundColor: '#000000',
      }}>
      <AntDesign name={'close'} color={'#ffffff'} size={35} />
      <Text style={{marginVertical: 8, color: '#ffffff', fontWeight: '700'}}>
        Empty Screen
      </Text>
    </View>
  );
};
