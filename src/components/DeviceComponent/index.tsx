import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {LightBulb} from '../Svgs';

interface DeviceComponentProps {
  title: string;
  subTitle?: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  ICON?: React.ComponentType<any> | React.ReactElement | null;
  keyItem: string;
}

export const DeviceComponent = ({
  ICON,
  title,
  subTitle,
  keyItem,
  onPress,
}: DeviceComponentProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={keyItem}>
      {ICON ?? <LightBulb size={80} />}
      <View style={styles.text}>
        <Text numberOfLines={2} style={styles.textStyle}>
          {title}
        </Text>
        <Text style={styles.textStyle}>({subTitle ?? 'Wi-Fi'})</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 8,
  },
  text: {
    marginVertical: 8,
    maxWidth: 85,
  },
  textStyle: {
    textAlign: 'center',
  },
});
