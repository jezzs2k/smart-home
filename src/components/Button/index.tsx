import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, RADIUS_DEFAULT_INPUT_BTN} from '../../config';

interface ButtonProps {
  title: string;
  Icon?: React.ComponentType<any> | React.ReactElement | null | undefined;
  isShowIcon?: boolean;
  isShowText?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentBtnStyle?: StyleProp<ViewStyle>;
  loading?: boolean;

  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const {width} = Dimensions.get('window');

export const Button = ({
  Icon,
  isShowIcon = true,
  isShowText = true,
  onPress,
  title,
  containerStyle = {},
  contentBtnStyle = {},
  loading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        !isShowText && {borderRadius: width},
        containerStyle,
      ]}>
      <View style={[styles.contentBtn, contentBtnStyle]}>
        {isShowText && (
          <Text
            numberOfLines={1}
            style={[styles.textBtn, isShowIcon && styles.flexWithIcon]}>
            {title}
          </Text>
        )}
        <View style={styles.iconStyle}>
          {loading && <ActivityIndicator style={styles.loading} />}

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
    borderRadius: RADIUS_DEFAULT_INPUT_BTN,
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
  loading: {
    paddingHorizontal: 8,
  },
});
