import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, ScreenDefault} from '../../components';
import {Colors} from '../../config';

export const SmartScreen = () => {
  const handleSmartScreen = () => {
    //Navigation smart screen
  };

  return (
    <View style={styles.container}>
      <ScreenDefault
        titleScreen={
          'Thực thi tự động theo điều kiện và trạng thái thiết bị được cài đặt'
        }
        onPress={handleSmartScreen}
        ButtonComp={
          <Button
            title={'Thêm cài đặt'}
            onPress={handleSmartScreen}
            isShowIcon={false}
          />
        }
        Icon={<AntDesign name={'retweet'} color={'#9b9b9d'} size={46} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
});
