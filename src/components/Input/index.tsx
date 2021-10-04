import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
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

  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const InputComp = ({
  defaultValue = '',
  placeholder = '',
  inputStyle = {},
  containerStyle = {},
  isSecureText = false,
  isError = false,
  errorMess = '',

  onChange,
  onBlur,
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);

  useDebounce(
    () => {
      onChange(value);
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
      />
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
});
