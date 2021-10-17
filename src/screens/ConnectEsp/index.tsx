import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import database from '@react-native-firebase/database';

import {Button, Form, InputComp} from '../../components';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';
import {Colors} from '../../config';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {NavigationScreen} from '../../config/NavigationScreen';

interface WifiT {
  ssid: string;
  password: string;
}

interface ConnectEspProps extends IModalLoadingPassProp {}

const initialValues = {ssid: '', password: ''};

let dataRealTime = null;

export const ConnectEsp = ModalLoading()(
  ({onSetLoading, onCloseLoading, loading}: ConnectEspProps) => {
    const [isShowModal, setShowModal] = useState(false);

    const route = useRoute<RouteProp<{params: {idEsp: string}}>>();
    const navigation = useNavigation<NavigationProp<any>>();

    const handleSubmit = (values: WifiT) => {
      onSetLoading();
      fetch(
        `http://192.168.4.1/setup?ssid=${values.ssid}&password=${values.password}`,
      )
        .then(data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
          setTimeout(() => {
            if (loading) {
              onCloseLoading();
            }
          }, 10000);
        });
    };

    useEffect(() => {
      if (route.params?.idEsp) {
        database()
          .ref('/' + route.params?.idEsp)
          .once('value')
          .then(snapshot => {
            const data = snapshot.val();
            dataRealTime = data;
            onCloseLoading();

            if (data.isConnected) {
              Alert.alert(
                'Connect Success',
                'Please check your internet connection then try again!',
                [
                  {
                    text: 'Đóng',
                    onPress: () => {
                      navigation.navigate(NavigationScreen.Home);
                    },
                  },
                ],
              );
            } else {
              Alert.alert(
                'Connect Failed',
                'Please check your internet connection then try again!',
                [
                  {
                    text: 'Đóng',
                    onPress: () => {
                      navigation.navigate(NavigationScreen.Home);
                    },
                  },
                ],
              );
            }
            // setShowModal(true);
          });
      }
    }, []);

    return (
      <View style={styles.container}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <Form
              renderFooter={
                <View style={styles.footer}>
                  <TouchableOpacity style={styles.footer} onPress={() => {}}>
                    <Text style={styles.text}>Quên mật khẩu</Text>
                  </TouchableOpacity>
                </View>
              }
              titleHeader={'Đăng nhập'}>
              <InputComp
                defaultValue={values.ssid}
                onChange={handleChange('ssid')}
                onBlur={() => handleBlur('ssid')}
                placeholder={'Vui lòng nhập Wifi - SSID'}
              />
              <InputComp
                defaultValue={values.password}
                onChange={handleChange('password')}
                onBlur={() => handleBlur('password')}
                placeholder={'Mật khẩu'}
                isSecureText={true}
              />
              <Button
                isShowIcon={false}
                title={'Xác nhận'}
                onPress={handleSubmit}
                containerStyle={{
                  marginTop: 30,
                }}
                contentBtnStyle={{
                  padding: 13,
                }}
              />
            </Form>
          )}
        </Formik>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 16,
  },
  text: {
    fontWeight: '600',
    color: Colors.URL_COLOR,
  },
});
