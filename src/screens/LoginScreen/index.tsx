import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import {Form, InputComp, ModalNotification} from '../../components';
import {Button} from '../../components';
import {Colors} from '../../config';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/core';
import {RootState, useAppDispatch} from '../../stores/stores';
import {login} from '../../stores/factories/login';
import {useSelector} from 'react-redux';
import {NavigationScreen} from '../../config/NavigationScreen';
import {getKey} from '../../utils';
import {KeyStogare} from '../../config/KeyStorage';
import useModalNotification from '../../Hooks/useModalNotification';

interface LoginScreenProps {}

interface LoginViewMode {
  email: string;
  password: string;
}

const initialValues = {email: '', password: ''};

export const LoginScreen = ({}: LoginScreenProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const {loading, token, error} = useSelector((state: RootState) => state.auth);

  const [ModalComponent, onSetModalVisible] = useModalNotification({
    customTextContent: 'Lỗi hệ thống làm ơn đăng nhập lại !',
    customTextAccept: 'Đồng ý',
    customTextTitle: 'Thông báo lỗi',
    customTextCancel: 'Đóng',
  });

  const handleOpenModal = () => {
    onSetModalVisible(true);
  };

  const handleSubmit = (values: LoginViewMode) => {
    if (!values || !values.email || !values.password) {
      return;
    }

    dispatch(login({username: values.email, password: values.password}));
  };

  const handleToRegister = () => {
    navigation.navigate(NavigationScreen.Register);
  };

  const handleForgotPass = () => {};

  const handleToken = async () => {
    const token = await getKey(KeyStogare.Token);

    if (token) {
      navigation.navigate(NavigationScreen.Home);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  useEffect(() => {
    if (token) {
      navigation.navigate(NavigationScreen.Home);
    }
  }, [token]);

  useEffect(() => {
    !token && error && handleOpenModal();
  }, [error]);

  return (
    <React.Fragment>
      <ModalComponent />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <Form
            renderFooter={
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.footer}
                  onPress={handleForgotPass}>
                  <Text style={styles.text}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToRegister}>
                  <Text style={styles.text}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            }
            titleHeader={'Đăng nhập'}>
            <InputComp
              defaultValue={values.email}
              onChange={handleChange('email')}
              onBlur={() => handleBlur('email')}
              placeholder={'Vui lòng nhập tài khoản'}
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
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
