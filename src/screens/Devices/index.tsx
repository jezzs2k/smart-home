import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
} from 'react-native';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {request, PERMISSIONS} from 'react-native-permissions';

import {Colors} from '../../config';
import {AddAutomatics} from './AddAutomatics';
import {AddManually} from './Addmanually';
import {EmptyScreen} from '..';
import useToggle from '../../Hooks/useToggle';
import useModalNotification from '../../Hooks/useModalNotification';
import {NavigationScreen} from '../../config/NavigationScreen';
import useTimeout from '../../Hooks/useTimeout';

interface RouteType {
  key: string;
  title: string;
}

export const DeviceScreens = () => {
  const navigation = useNavigation<any>();
  const [isPermission, setPermission] = useToggle(false);

  const [stateTab, useStateTab] = useState({
    index: 0,
    routes: [
      {key: 'first', title: 'Thêm thủ công'},
      {key: 'second', title: 'Tự động quét'},
    ],
  });

  const permissionHandle = async () => {
    try {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        if (result === 'granted') {
          setPermission(true);
        } else {
          setPermission(false);
        }
      });

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Kết nối WIFI',
          message: 'Chúng tôi cần quyền truy cập WIFI của bạn',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (err) {
    }
  };

  const [ModalComponent, onSetModalVisible, _visible, setContent] =
    useModalNotification({
      customTextTitle:
        'Chúng tôi cần quyền truy cập camera và vị trí của thiết bị',
      customTextCancel: 'Đóng',
      customTextAccept: 'Cho phép',
      onCancel: () => navigation.navigate(NavigationScreen.Home),
      onAccept: () => {
        permissionHandle();
      },
      isJustShowCancel: true,
    });

  useEffect(() => {
    permissionHandle();
  }, []);

  useTimeout(() => {
    if (!isPermission) {
      onSetModalVisible();
    }
  }, 3000);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>;
    },
  ) => {
    const inputRange = props.navigationState.routes.map((x, i: number) => i);
    const handleBack = () => navigation.goBack();

    return (
      <View style={styles.tabBar}>
        <ModalComponent />
        {props.navigationState.routes.map((route: RouteType, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <React.Fragment>
              {i === 0 && (
                <TouchableOpacity
                  onPress={handleBack}
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 8,
                  }}>
                  <AntDesign name={'left'} color={'#000'} size={20} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => useStateTab(state => ({...state, index: i}))}>
                <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const handleIndexChange = (index: number) =>
    useStateTab(state => ({...state, index: index}));

  const renderScene = SceneMap({
    first: () => <AddManually />,
    second: () => <AddAutomatics />,
  });
  return (
    <View style={styles.container}>
      <TabView
        navigationState={stateTab}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
