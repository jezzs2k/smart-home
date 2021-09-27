import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {EmptyScreen} from '../screens';

type HomeStackParamList = {
  Home: undefined;
};

type CreatesStackParamList = {
  Create: undefined;
};

type ShortsStackParamList = {
  Short: undefined;
};

type ChanelsStackParamList = {
  Chanel: undefined;
};

type SettingsStackParamList = {
  Setting: undefined;
};

interface StackScreenOptions {
  title: string;
  headerShown?: boolean;
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
const CreatesStack = createNativeStackNavigator<CreatesStackParamList>();
const ShortsStack = createNativeStackNavigator<ShortsStackParamList>();
const ChanelsStack = createNativeStackNavigator<ChanelsStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={StackScreenOptions({title: 'Home'})}>
      <HomeStack.Screen name="Home" component={EmptyScreen} />
    </HomeStack.Navigator>
  );
}

function ShortsStackScreen() {
  return (
    <ShortsStack.Navigator
      screenOptions={StackScreenOptions({
        title: 'Shorts',
      })}>
      <ShortsStack.Screen name="Short" component={EmptyScreen} />
    </ShortsStack.Navigator>
  );
}

function CreatesStackScreen() {
  return (
    <CreatesStack.Navigator
      screenOptions={StackScreenOptions({
        title: 'Creates',
      })}>
      <CreatesStack.Screen name="Create" component={EmptyScreen} />
    </CreatesStack.Navigator>
  );
}

function ChanelsStackScreen() {
  return (
    <ChanelsStack.Navigator
      screenOptions={StackScreenOptions({
        title: 'Chanels',
      })}>
      <ChanelsStack.Screen name="Chanel" component={EmptyScreen} />
    </ChanelsStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={StackScreenOptions({
        title: 'Library',
      })}>
      <SettingsStack.Screen name="Setting" component={EmptyScreen} />
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
          name="Shorts"
          component={ShortsStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <AntDesign name={'disconnect'} color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Creates"
          component={CreatesStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <AntDesign name={'pluscircleo'} color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Chanels"
          component={ChanelsStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <AntDesign name={'codesquareo'} color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={TabOptions({
            renderIcon: ({color, size}) => (
              <AntDesign name={'fastforward'} color={color} size={size} />
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
    backgroundColor: '#000000',
    borderTopColor: '#000000',
  },
  tabBarActiveTintColor: '#ffffff',
};

const StackScreenOptions = ({
  title,
  headerShown = true,
}: StackScreenOptions): {} => ({
  headerTitle: () => <Text style={styles.headerTitle}>{title}</Text>,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerShown,
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
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 20,
  },
});
