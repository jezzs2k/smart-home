import * as React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  HomeScreen,
  SmartScreen,
  SettingScreen,
  DeviceScreens,
} from '../screens';
import {Colors} from '../config';
import {Button} from '../components';
import {ScanQrCode} from '../components/QRCode';
import {AddManually} from '../screens/Devices/Addmanually';

type HomeStackParamList = {
  Home: undefined;
  AddDevice: undefined;
};

type SmartStackParamList = {
  Smart: undefined;
  AddDevice: undefined;
};

type SettingsStackParamList = {
  Setting: undefined;
  ScanQRCode: undefined;
  DeviceAtHome: undefined;
};

interface StackScreenOptions {
  title: string;
  headerShown?: boolean;
  renderHeader?: ({
    route,
    navigation,
  }: {
    route: RouteProp<any>;
    navigation: any;
  }) => React.ComponentType<any> | React.ReactElement | null | undefined;
}

interface TabOptions {
  renderIcon: ({
    color,
    size,
  }: {
    color: string;
    size?: number;
  }) => React.ReactElement<any>;
  tabBarLabel?: string;
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CreatesStack = createNativeStackNavigator<SmartStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={StackScreenOptions({
          title: 'Home',
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '95%',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name={'user'} color={'#212329'} size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddDevice');
                }}>
                <AntDesign name={'plus'} color={'#212329'} size={24} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name={'AddDevice'}
        component={DeviceScreens}
        options={StackScreenOptions({title: 'AddDevice'})}
      />
    </HomeStack.Navigator>
  );
}

function CreatesStackScreen() {
  return (
    <CreatesStack.Navigator
      screenOptions={StackScreenOptions({
        title: 'Smarts',
        renderHeader: ({route, navigation}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
            }}>
            <TouchableOpacity onPress={() => {}}>
              <AntDesign name={'user'} color={'#212329'} size={24} />
            </TouchableOpacity>
            <Button
              isShowText={false}
              onPress={() => {}}
              title={''}
              Icon={<AntDesign name={'plus'} color={'#ffffff'} size={18} />}
            />
          </View>
        ),
      })}>
      <CreatesStack.Screen name="Smart" component={SmartScreen} />
      <CreatesStack.Screen
        name={'AddDevice'}
        component={DeviceScreens}
        options={StackScreenOptions({title: 'AddDevice'})}
      />
    </CreatesStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Setting"
        component={SettingScreen}
        options={StackScreenOptions({
          title: 'Settings',
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '98%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ScanQRCode');
                }}
                style={{marginHorizontal: 8}}>
                <AntDesign name={'scan1'} color={'#212329'} size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log(navigation);
                }}
                style={{marginHorizontal: 8}}>
                <AntDesign name={'setting'} color={'#212329'} size={24} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <SettingsStack.Screen
        name={'ScanQRCode'}
        component={ScanQrCode}
        options={StackScreenOptions({
          title: 'ScanQRCode',
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>Quét mã QR để kết nối</Text>
            </View>
          ),
        })}
      />
      <SettingsStack.Screen
        name={'DeviceAtHome'}
        component={AddManually}
        options={StackScreenOptions({
          title: 'DeviceAtHome',
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>
                Các thiết bị điện trong nhà
              </Text>
            </View>
          ),
        })}
      />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={NavigationScreenOptions}>
        <Tab.Screen
          name="Homes"
          component={HomeStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <AntDesign name={'home'} color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Smarts"
          component={CreatesStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <Feather name={'sun'} color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <EvilIcons name={'user'} color={color} size={size! + 6} />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const NavigationScreenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderTopColor: '#ffffff',
  },
  tabBarActiveTintColor: Colors.primary,
};

const StackScreenOptions = ({
  title,
  headerShown = true,
  renderHeader,
}: StackScreenOptions): {} => ({
  headerTitle: () => {
    const route = useRoute();
    const navigation = useNavigation();

    return renderHeader
      ? renderHeader({
          route,
          navigation,
        })
      : null;
  },
  headerStyle: {
    backgroundColor: Colors.BG,
    borderBottomColor: '#ffffff',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerShown: renderHeader ? headerShown : !!renderHeader,
});

interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

const TabOptions = ({renderIcon, tabBarLabel = ''}: TabOptions): {} => ({
  tabBarIcon: ({focused, color, size}: TabBarIcon) => renderIcon({color, size}),
  tabBarLabel,
});

const styles = StyleSheet.create({
  headerTitle: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 20,
  },
});
