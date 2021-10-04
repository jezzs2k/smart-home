import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CodeFieldComp} from '..';
import {Colors} from '../../../config';

interface VerifyOtpProps {
  email?: string;
}

let refInput: React.RefObject<TextInput>;

export const VerifyOtp = ({
  email = 'vuthanhhieu00@gmail.com',
}: VerifyOtpProps) => {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);

    if (value.length === 6) {
      console.log('handle');
      handleClearInput();
    }
  };

  const handleClearInput = () => {
    refInput?.current?.clear();
    setValue('');
  };

  const handleSetRef = (ref: React.RefObject<TextInput>) => {
    refInput = ref;
  };

  useEffect(() => {
    refInput?.current?.focus();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Vui lòng nhập mã xác minh</Text>
      </View>
      <View style={styles.otpField}>
        <CodeFieldComp
          value={value}
          onChange={handleChange}
          onSetRef={handleSetRef}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>
          Mã xác minh đã được gửi đến email {email} của bạn
        </Text>
        <TouchableOpacity style={styles.bottomStyle}>
          <Text style={styles.text}>
            Nếu bạn không nhận được mã code ?{' '}
            <Text style={styles.textURL}>Gửi lại</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 8,
  },
  otpField: {
    alignItems: 'center',
    marginVertical: 16,
  },
  textHeader: {
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: 16,
    maxWidth: '80%',
  },
  bottomStyle: {
    marginTop: 16,
  },
  text: {
    fontWeight: '600',
    color: Colors.TEXT,
  },
  textURL: {
    color: Colors.URL_COLOR,
  },
  footer: {
    maxWidth: '80%',
  },
});
