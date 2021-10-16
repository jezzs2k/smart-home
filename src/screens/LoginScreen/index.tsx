import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import {Form, InputComp} from '../../components';
import {Button} from '../../components';
import {Colors} from '../../config';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {RootState, useAppDispatch} from '../../stores/stores';
import {login} from '../../stores/factories/login';
import {useSelector} from 'react-redux';
import {NavigationScreen} from '../../config/NavigationScreen';

interface LoginScreenProps {}

interface LoginViewMode {
  email: string;
  password: string;
}

const initialValues = {email: '', password: ''};

export const LoginScreen = ({}: LoginScreenProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const {loading, token} = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values: LoginViewMode) => {
    dispatch(login({username: values.email, password: values.password}));
  };

  const handleToRegister = () => {
    navigation.navigate(NavigationScreen.Register);
  };
  const handleForgotPass = () => {};

  useEffect(() => {
    if (token) {
      navigation.navigate(NavigationScreen.Home);
    }
  }, [token]);

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
            loading={loading}
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
