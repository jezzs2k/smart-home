import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../config';

interface ButtonProps {
  title: string;
  Icon?: React.ComponentType<any> | React.ReactElement | null | undefined;
  isShowIcon?: boolean;
  isShowText?: boolean;

  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const {width} = Dimensions.get('window');

export const Button = ({
  Icon,
  isShowIcon = true,
  isShowText = true,
  onPress,
  title,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, !isShowText && {borderRadius: width}]}>
      <View style={styles.contentBtn}>
        {isShowText && (
          <Text
            numberOfLines={1}
            style={[styles.textBtn, isShowIcon && styles.flexWithIcon]}>
            {title}
          </Text>
        )}
        <View style={styles.iconStyle}>
          {isShowIcon &&
            (Icon ?? <AntDesign name={'user'} size={16} color={'#ffffff'} />)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  contentBtn: {
    flexDirection: 'row',
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
  flexWithIcon: {
    marginRight: 8,
  },
  iconStyle: {},
});
