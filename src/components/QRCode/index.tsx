import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {request, PERMISSIONS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NavigationScreen} from '../../config/NavigationScreen';
import {IModalLoadingPassProp, ModalLoading} from '../ModalLoading';
import {Device} from '..';
import useModalNotification from '../../Hooks/useModalNotification';
import {useAppDispatch} from '../../stores/stores';
import {resetDevice} from '../../stores/device';

const SCREEN_WIDTH = Dimensions.get('window').width;

let valueSwich = 0;
let timeRunWhenFadeOut: NodeJS.Timer | null;
let timeRunWhenFadeIn: NodeJS.Timer | null;

interface ScanQRCodeProps extends IModalLoadingPassProp {
  indexActiveScreen: number;
}

export const ScanQrCode = ModalLoading()(
  ({indexActiveScreen = 1, onCloseLoading, onSetLoading}: ScanQRCodeProps) => {
    const isForcused = useIsFocused();
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<{params: {itemDevice: Device}}>>();
    const [flashOn, setFlashOn] = useState(RNCamera.Constants.FlashMode.off);
    const [scanAgain, setScanAgain] = useState(false);
    const dispatch = useAppDispatch();

    const [ModalComponent, onSetModalVisible, visible, setContent] =
      useModalNotification({
        customTextTitle: 'Kết nối ESP 8266',
        customTextCancel: 'Đóng',
        onCancel: () => navigation.navigate(NavigationScreen.Home),
      });

    const onSuccess = (e: any) => {
      //QR TYPE: {"ssid":"SMART_HOME_ESP8266","password":"11111111","idEsp":"36d57abd-7e84-4079-afc0-cc9693a6dd90"}
      handleClearTime();
      onSetLoading();
      let ssid = '';
      let password = '';
      const isWep = false;

      const newDate = JSON.parse(
        e?.data || {ssid: 'SMART_HOME_ESP8266', password: '11111111'},
      );

      ssid = newDate.ssid;
      password = newDate.password;

      navigation.navigate(NavigationScreen.FormUploadDevice, {
        itemDevice: route.params.itemDevice,
        wifiInfo: {
          ssid,
          password,
          isWep,
        },
        deviceId: uuid.v4(),
      });
    };

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = (value: number) => {
      if (Math.abs(value) >= rectDimensions) {
        timeRunWhenFadeIn && clearInterval(timeRunWhenFadeIn);
        timeRunWhenFadeIn = null;
        time();
        return;
      }

      Animated.timing(fadeAnim, {
        toValue: value,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    const fadeOut = (value: number) => {
      if (value >= 0) {
        timeRunWhenFadeOut && clearInterval(timeRunWhenFadeOut);
        timeRunWhenFadeOut = null;
        valueSwich = 0;
        time2();
        return;
      }
      Animated.timing(fadeAnim, {
        toValue: value,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      dispatch(resetDevice());
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        console.log('result', result);
      });
    }, []);

    useEffect(() => {
      if (!isForcused) {
        handleClearTime();
      } else {
        timeRunWhenFadeOut == null && timeRunWhenFadeIn == null && time2();
      }
    }, [isForcused]);

    useEffect(() => {
      if (indexActiveScreen === 1) {
        time2();
      } else {
        handleClearTime();
      }
    }, [indexActiveScreen]);

    useEffect(() => {
      return () => {
        handleClearTime();
      };
    }, []);

    const time2 = () => {
      if (timeRunWhenFadeIn) {
        return;
      }

      timeRunWhenFadeIn = setInterval(() => {
        fadeIn(valueSwich);
        valueSwich = valueSwich - 2;
      }, 40);
    };

    const time = () => {
      if (timeRunWhenFadeOut) {
        return;
      }

      timeRunWhenFadeOut = setInterval(() => {
        fadeOut(valueSwich);
        valueSwich = valueSwich + 2;
      }, 40);
    };

    const handleClearTime = () => {
      timeRunWhenFadeIn && clearInterval(timeRunWhenFadeIn);
      timeRunWhenFadeOut && clearInterval(timeRunWhenFadeOut);
      timeRunWhenFadeIn = null;
      timeRunWhenFadeOut = null;
    };

    const handleOnOffFlash = () => {
      setFlashOn(
        flashOn === RNCamera.Constants.FlashMode.off
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off,
      );
    };

    return (
      <React.Fragment>
        <ModalComponent />
        <QRCodeScanner
          cameraStyle={{
            height: Dimensions.get('window').height,
          }}
          reactivate={scanAgain}
          onRead={onSuccess}
          cameraType={'back'}
          showMarker
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay} />

              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <Icon
                    name="ios-scan-outline"
                    size={SCREEN_WIDTH * 0.7}
                    color={iconScanColor}
                  />
                  <Animated.View
                    style={[
                      styles.scanBar,
                      {
                        transform: [{translateY: fadeAnim}],
                      },
                    ]}
                  />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />
      </React.Fragment>
    );
  },
);

const overlayColor = 'rgba(0,0,0,0.5)';

const rectDimensions = SCREEN_WIDTH * 0.7;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = '#ffffff';

const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = '#22ff00';
const iconScanColor = '#ffffff';

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.7,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },
  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});
