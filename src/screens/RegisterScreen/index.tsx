import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {Button, Form, InputComp} from '../../components';
import {Colors} from '../../config';
import {useNavigation} from '@react-navigation/core';

interface RegisterScreenProps {}

const initialValues = {
  email: '',
  username: '',
  password: '',
  re_password: '',
};

interface RegisterView {
  email: string;
  username: string;
  password: string;
  re_password: string;
}

interface RegisterViewMode {
  email: string;
  username: string;
  password: string;
}

const tranferValuesObject = (obj: RegisterView): RegisterViewMode => {
  return {
    email: obj.email,
    password: obj.password,
    username: obj.username,
  };
};

export const RegisterScreen = ({}: RegisterScreenProps) => {
  const navigation = useNavigation();

  const handleSubmit = (values: RegisterView) => {
    console.log(values);

    console.log('Right value', tranferValuesObject(values));
  };

  const handleToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <Form
          renderFooter={
            <View style={styles.footer}>
              <TouchableOpacity onPress={handleToLogin}>
                <Text>
                  Nếu bạn đã có tài khoản,{' '}
                  <Text style={styles.text}>Đăng nhập</Text>
                </Text>
              </TouchableOpacity>
            </View>
          }
          titleHeader={'Đăng ký'}>
          <InputComp
            defaultValue={values.email}
            onChange={handleChange('email')}
            onBlur={() => handleBlur('email')}
            placeholder={'Vui lòng nhập emal'}
          />
          <InputComp
            defaultValue={values.username}
            onChange={handleChange('username')}
            onBlur={() => handleBlur('username')}
            placeholder={'Vui lòng nhập tên tài khoản'}
          />
          <InputComp
            defaultValue={values.password}
            onChange={handleChange('password')}
            onBlur={() => handleBlur('password')}
            placeholder={'Mật khẩu'}
            isSecureText={true}
          />
          <InputComp
            defaultValue={values.re_password}
            onChange={handleChange('re_password')}
            onBlur={() => handleBlur('re_password')}
            placeholder={'Nhập lại Mật khẩu'}
            isSecureText={true}
            isError={
              !!values.password &&
              !!values.re_password &&
              values.password !== values.re_password
            }
            errorMess={'Mật khẩu nhập không khớp !'}
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
  container: {},
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
