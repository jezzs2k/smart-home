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
  LoginScreen,
  RegisterScreen,
  ConnectEsp,
  DeviceDetails,
  FormUploadDevice,
  DeviceDetailsWatt,
  AlarmTimes,
  Profile,
  DeviceForm,
} from '../screens';
import {Colors} from '../config';
import {Button} from '../components';
import {ScanQrCode} from '../components/QRCode';
import {AddManually} from '../screens/Devices/Addmanually';
import {NavigationScreen} from '../config/NavigationScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../stores/stores';

type HomeStackParamList = {
  Home: undefined;
  AddDevice: undefined;
  Login: undefined;
  Register: undefined;
  ScanQRCode: undefined;
  ConnectEsp: undefined;
  DeviceDetails: undefined;
  FormUploadDevice: undefined;
  DeviceDetailsWatt: undefined;
  AlarmTimes: undefined;
  Profile: undefined;
  DeviceForm: undefined;
};

type SmartStackParamList = {
  Smart: undefined;
  AddDevice: undefined;
};

type SettingsStackParamList = {
  Setting: undefined;
  DeviceAtHome: undefined;
  Profile: undefined;
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
          renderHeader: ({route, navigation}) => {
            const {token} = useSelector((state: RootState) => state.auth);

            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '95%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    token
                      ? navigation.navigate(NavigationScreen.Profile)
                      : navigation.navigate(NavigationScreen.Login);
                  }}>
                  <AntDesign name={'user'} color={'#212329'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NavigationScreen.AddDevice);
                  }}>
                  <AntDesign name={'plus'} color={'#212329'} size={24} />
                </TouchableOpacity>
              </View>
            );
          },
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.AddDevice}
        component={DeviceScreens}
        options={StackScreenOptions({title: NavigationScreen.AddDevice})}
      />

      <HomeStack.Screen
        name={'Login'}
        component={LoginScreen}
        options={StackScreenOptions({
          title: 'Login',
          renderHeader: ({route, navigation}) => <View />,
        })}
      />
      <HomeStack.Screen
        name={'Register'}
        component={RegisterScreen}
        options={StackScreenOptions({
          title: 'Register',
          renderHeader: ({route, navigation}) => <View />,
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.ScanQRCode}
        component={ScanQrCode}
        options={StackScreenOptions({
          title: NavigationScreen.ScanQRCode,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>Qu??t m?? QR ????? k???t n???i</Text>
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.ConnectEsp}
        component={ConnectEsp}
        options={StackScreenOptions({
          title: NavigationScreen.ConnectEsp,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>K???t n??i wifi</Text>
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.DeviceDetails}
        component={DeviceDetails}
        options={StackScreenOptions({
          title: NavigationScreen.ConnectEsp,
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.DeviceDetailsWatt}
        component={DeviceDetailsWatt}
        options={StackScreenOptions({
          title: NavigationScreen.ConnectEsp,
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.FormUploadDevice}
        component={FormUploadDevice}
        options={StackScreenOptions({
          title: NavigationScreen.FormUploadDevice,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>Th??ng tin thi???t b???</Text>
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.AlarmTimes}
        component={AlarmTimes}
        options={StackScreenOptions({
          title: NavigationScreen.AlarmTimes,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>H???n gi??? b???t/t???t</Text>
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.Profile}
        component={Profile}
        options={StackScreenOptions({
          title: NavigationScreen.Profile,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>Th??ng tin t??i kho???n</Text>
            </View>
          ),
        })}
      />
      <HomeStack.Screen
        name={NavigationScreen.DeviceForm}
        component={DeviceForm}
        options={StackScreenOptions({
          title: NavigationScreen.DeviceForm,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>S???a thi???t b???</Text>
            </View>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}

function CreatesStackScreen() {
  return (
    <CreatesStack.Navigator
      screenOptions={StackScreenOptions({
        title: 'Smarts',
        renderHeader: ({route, navigation}) => {
          const {token} = useSelector((state: RootState) => state.auth);

          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '95%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  token
                    ? navigation.navigate(NavigationScreen.Profile)
                    : navigation.navigate(NavigationScreen.Login);
                }}>
                <AntDesign name={'user'} color={'#212329'} size={24} />
              </TouchableOpacity>
              <Button
                isShowText={false}
                onPress={() => {}}
                title={''}
                Icon={<AntDesign name={'plus'} color={'#ffffff'} size={18} />}
              />
            </View>
          );
        },
      })}>
      <CreatesStack.Screen name="Smart" component={SmartScreen} />
      <CreatesStack.Screen
        name={NavigationScreen.AddDevice}
        component={DeviceScreens}
        options={StackScreenOptions({title: NavigationScreen.AddDevice})}
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
          renderHeader: ({route, navigation}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: '98%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NavigationScreen.ScanQRCode);
                  }}
                  style={{marginHorizontal: 8}}>
                  <AntDesign name={'scan1'} color={'#212329'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{marginHorizontal: 8}}>
                  <AntDesign name={'setting'} color={'#212329'} size={24} />
                </TouchableOpacity>
              </View>
            );
          },
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
                C??c thi???t b??? ??i???n trong nh??
              </Text>
            </View>
          ),
        })}
      />
      <SettingsStack.Screen
        name={NavigationScreen.Profile}
        component={Profile}
        options={StackScreenOptions({
          title: NavigationScreen.Profile,
          renderHeader: ({route, navigation}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>Th??ng tin t??i kho???n</Text>
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
    borderWidth: 0,
  },
  headerShadowVisible: false,
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
