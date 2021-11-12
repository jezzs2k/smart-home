import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from '../../components';
import {Colors} from '../../config';
import {User} from '../../stores/factories/user';

interface IRenderShow {
  retrivedProfile: User;
  onPress: () => void;
}

export const RenderShow = ({onPress, retrivedProfile}: IRenderShow) => {
  const handlePress = () => {
    onPress();
  };

  const {username, role, email, devicesEsp, firstname, lastname} =
    retrivedProfile || {};

  return (
    <View style={styles.statusUser}>
      <Text style={[styles.textBold, styles.spaceBetweentElement]}>
        {`${'Họ và tên'}`}:{' '}
        <Text style={[styles.textNomal, styles.textBlur]}>
          {(firstname ? firstname : '') + (lastname ? lastname : '') || (
            <Text style={{color: Colors.LIGHT_RED}}>
              Hoàn tất thông tin tài khoản
            </Text>
          )}
        </Text>
      </Text>
      <Text style={[styles.textBold, styles.spaceBetweentElement]}>
        {`${'Tên tài khoản'}`}:{' '}
        <Text style={[styles.textNomal, styles.textBlur]}>
          {(username && username) || (
            <Text style={{color: Colors.LIGHT_RED}}>
              Hoàn tất thông tin tài khoản
            </Text>
          )}
        </Text>
      </Text>
      <Text style={[styles.textBold, styles.spaceBetweentElement]}>
        {`${'Số lượng thiết bị đã kết nối'}`}:{' '}
        <Text style={[styles.textNomal, styles.textBlur]}>
          {/* {(nameChild && nameChild) || 'Hoàn tất thông tin tài khoản'} */}
          {devicesEsp.length}
        </Text>
      </Text>
      <Text style={[styles.textBold, styles.spaceBetweentElement]}>
        {`${'Email'}`}:{' '}
        <Text style={[styles.textNomal, styles.textBlur]}>
          {(email && email) || (
            <Text style={{color: Colors.LIGHT_RED}}>
              Hoàn tất thông tin tài khoản
            </Text>
          )}
        </Text>
      </Text>
      {/* <Text style={[styles.textBold, styles.spaceBetweentElement]}>
        {`${'Gói vip'}`}:{' '}
        <Text style={[styles.textNomal, styles.textBlur]}>
          {pay ? 'Có' : 'Không'}
        </Text>
      </Text> */}
      <View style={[styles.connectStyle, styles.spaceBetweentElement]}>
        {/* <Text style={styles.textBold}>
          {paired ? `${'Tài khoản đã kết nối'}` : `${'Tài khoản chưa kết nối'}`}
        </Text> */}
        {/* <AntDesign
          name={'checkcircleo'}
          size={30}
          color={'green'}
          style={styles.connectIconStyle}
        /> */}
      </View>
      <View style={styles.styleBtn}>
        <Button
          title={'Sửa thông tin'}
          containerStyle={{width: widthPercentageToDP(40)}}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  containerChild: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  statusUser: {
    padding: heightPercentageToDP(3),
    backgroundColor: Colors.BG,
    flex: 1,
  },
  textBold: {
    fontWeight: '700',
    fontSize: 14,
  },
  textlagre: {
    fontSize: 23,
  },
  textNomal: {
    fontSize: 16,
  },
  textTitle: {
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  textBlur: {
    color: '#485460',
  },
  connectStyle: {
    flexDirection: 'row',
  },
  spaceBetweentElement: {
    marginVertical: heightPercentageToDP(1),
  },
  connectIconStyle: {
    marginLeft: widthPercentageToDP(5),
  },
  styleBtn: {
    alignItems: 'flex-end',
    marginTop: heightPercentageToDP(6),
  },
});
