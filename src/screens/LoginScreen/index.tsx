import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import {Form, InputComp} from '../../components';
import {Button} from '../../components';
import {Colors} from '../../config';
import {useNavigation} from '@react-navigation/core';

interface LoginScreenProps {}

interface LoginViewMode {
  email: string;
  password: string;
}

const initialValues = {email: '', password: ''};

export const LoginScreen = ({}: LoginScreenProps) => {
  const navigation = useNavigation();

  const handleSubmit = (values: LoginViewMode) => {
    console.log(values);
  };

  const handleToRegister = () => {
    navigation.navigate('Register');
  };
  const handleForgotPass = () => {};

  return (
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
          />
        </Form>
      )}
    </Formik>
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
