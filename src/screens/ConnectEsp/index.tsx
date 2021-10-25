import {Formik} from 'formik';
import React, {useEffect} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import useModalNotification from '../../Hooks/useModalNotification';

interface WifiT {
  ssid: string;
  password: string;
}

interface ConnectEspProps extends IModalLoadingPassProp {}

const initialValues = {ssid: '', password: ''};

let dataRealTime = null;
let count = 0;

export const ConnectEsp = ModalLoading()(
  ({onSetLoading, onCloseLoading, loading}: ConnectEspProps) => {
    const [ModalComponent, onSetModalVisible, _visible, setContent] = useModalNotification({customTextTitle: 'Kết nối ESP 8266', 
                                                                                           customTextCancel: 'Đóng', 
                                                                                           onCancel: () =>  navigation.navigate(NavigationScreen.Home), 
                                                                                           isJustShowCancel: true
                                                                                          });

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
          }, 3000);
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
              setContent('Thiết bị của bạn đã được kết nối thành công!')
            } else {
              setContent('Vui lòng kiểm tra lại internet của bạn và kết nối lại!');
            }

            onSetModalVisible(true);
          });
      }

      return () => {
        onCloseLoading();
        database()
          .ref('/' + route.params?.idEsp)
          .off();
      };
    }, []);

    return (
      <View style={styles.container}>
        <ModalComponent />
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
              titleHeader={'Kết nối với WIFI nhà bạn'}>
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
