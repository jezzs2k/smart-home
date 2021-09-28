import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../config';

interface ScreenDefaultProps {
  titleScreen: string;
  Icon?: React.ComponentType<any> | React.ReactElement | null | undefined;
  isShowIcon?: boolean;
  ButtonComp: React.ComponentType<any> | React.ReactElement | null | undefined;

  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const ScreenDefault = ({
  onPress,
  titleScreen,
  Icon,
  isShowIcon = true,
  ButtonComp,
}: ScreenDefaultProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {isShowIcon &&
          (Icon ?? (
            <AntDesign name={'pluscircleo'} color={'#9b9b9d'} size={35} />
          ))}
      </TouchableOpacity>
      <Text style={styles.textStyle}>{titleScreen}</Text>
      {ButtonComp}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BG,
  },
  textStyle: {
    marginVertical: 8,
    color: '#9b9b9d',
    fontWeight: '700',
    maxWidth: 200,
    textAlign: 'center',
  },
});
