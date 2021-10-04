import React, {useEffect} from 'react';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Text, StyleSheet, TextInput} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Colors} from '../../../config';

interface IPropsCodeField {
  value: string;

  onSetRef?: (ref: React.RefObject<TextInput>) => void;
  onChange: (text: string) => void;
}

const CELL_COUNT = 6;

export const CodeFieldComp = ({onSetRef, onChange, value}: IPropsCodeField) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props] = useClearByFocusCell({
    value,
    setValue: onChange,
  });

  useEffect(() => {
    ref && onSetRef?.(ref);
  }, []);

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onChange}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Text key={index} style={[styles.cell, isFocused && styles.focusCell]}>
          {symbol && <EntypoIcon key={index} name="dot-single" size={40} />}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 45,
    height: 45,
    lineHeight: 45,
    fontSize: 24,
    borderColor: Colors.BG_INPUT,
    textAlign: 'center',
    color: '#C4C4C4',
    borderRadius: 4,
    backgroundColor: Colors.BG_INPUT,
  },
  focusCell: {
    backgroundColor: '#c1eaec',
  },
  codeFieldRoot: {
    width: '95%',
  },
});
