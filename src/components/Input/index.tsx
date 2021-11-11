import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
  KeyboardTypeOptions,
} from 'react-native';
import {Colors, RADIUS_DEFAULT_INPUT_BTN} from '../../config';
import useDebounce from '../../Hooks/useDebounce';

interface InputProps {
  defaultValue?: string;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  isSecureText?: boolean;
  isError?: boolean;
  errorMess?: string;
  label?: string;
  containerLabelStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;

  onConditionsValue?: (value: string) => string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const InputComp = ({
  defaultValue = '',
  placeholder = '',
  label = '',
  keyboardType = 'default',
  inputStyle = {},
  containerStyle = {},
  containerLabelStyle = {},
  labelStyle = {},
  isSecureText = false,
  isError = false,
  errorMess = '',

  onConditionsValue,
  onChange,
  onBlur,
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);

  useDebounce(
    () => {
      if (onConditionsValue) {
        setValue(onConditionsValue(value));
        onChange(onConditionsValue(value));
      } else {
        onChange(value);
      }
    },
    200,
    [value],
  );

  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!!errorMess && isError && (
        <Text style={[isError && styles.errorMess]}>{errorMess}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={handleChange}
        style={[styles.inputStyle, isError && styles.errorBorder, inputStyle]}
        onBlur={handleBlur}
        placeholder={placeholder}
        secureTextEntry={isSecureText}
        keyboardType={keyboardType ?? 'default'}
      />
      {!!label && (
        <View style={[containerLabelStyle]}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputStyle: {
    paddingHorizontal: 8,
    backgroundColor: Colors.BG_INPUT,
    borderRadius: RADIUS_DEFAULT_INPUT_BTN,
    fontSize: 15,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: Colors.RED,
  },
  errorMess: {
    fontSize: 14,
    color: Colors.RED,
    marginBottom: 5,
  },
  label: {
    fontWeight: '700',
    color: Colors.TEXT1,
  },
});
