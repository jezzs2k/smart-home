import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'local-channel',
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    bigText: remoteMessage.data.content,
    subText: 'Thông báo bật tắt thiết bị',
    bigLargeIcon: 'ic_launcher',
    // color: Colors.primary,
    /* iOS and Android properties */
    id: 0,
    title: remoteMessage.data.title, // (optional)
    message: remoteMessage.data.content, // (required)
    playSound: true,
    soundName: 'default',
    number: 10,
  });
});

AppRegistry.registerComponent(appName, () => App);
