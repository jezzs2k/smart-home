import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from '../../config';
import {AddAutomatics} from './AddAutomatics';
import {AddManually} from './Addmanually';
import {EmptyScreen} from '..';

interface RouteType {
  key: string;
  title: string;
}

export const DeviceScreens = () => {
  const navigation = useNavigation();

  const [stateTab, useStateTab] = useState({
    index: 0,
    routes: [
      {key: 'first', title: 'Thêm thủ công'},
      {key: 'second', title: 'Tự động quét'},
    ],
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>;
    },
  ) => {
    const inputRange = props.navigationState.routes.map((x, i: number) => i);
    const handleBack = () => navigation.goBack();

    return (
      <View style={styles.tabBar}>
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
    second: () => <EmptyScreen />,
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
