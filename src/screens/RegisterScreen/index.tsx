import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {Button, Form, InputComp, ModalNotification} from '../../components';
import {Colors} from '../../config';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import { RootState, useAppDispatch } from '../../stores/stores';
import { useSelector } from 'react-redux';
import { registerAction } from '../../stores/factories/register';

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
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const [isVisible, setModalVisble] = useState(false);

  const {loading, userRegister, error} = useSelector((state: RootState) => state.auth);

  const handleOpenModal = () => {
    setModalVisble(true);
  }

  const handleSetModalVisible = (isModalVisible?: boolean) => {

    const isBool = typeof isModalVisible === 'boolean' ? isModalVisible : !isVisible;

    setModalVisble(isBool);
  };

  const handleSubmit = (values: RegisterView) => {
    if (!values || !values.email || !values.password || !values.email) {
      return;
    }
    dispatch(registerAction(tranferValuesObject(values)))
  };

  const handleToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (!loading && userRegister) {
      handleToLogin()
    }
  }, [userRegister, loading])

  useEffect(() => {
    !userRegister && error && handleOpenModal();
  }, [error])

  return (
    <React.Fragment>
      <ModalNotification 
        modalVisible={isVisible} 
        setModalVisible={handleSetModalVisible}  
        customTextContent={'Lỗi hệ thống làm ơn đăng ký lại !'}
        customTextAccept={'Đồng ý'}
        customTextTitle={'Thông báo lỗi'}
        customTextCancel={'Đóng'} 
      />

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
            loading={loading}
          />
        </Form>
      )}
    </Formik>
    </React.Fragment>
    
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
