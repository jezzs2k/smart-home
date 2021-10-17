import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  SectionListData,
} from 'react-native';
import {Colors} from '../../config';
import {NavigationScreen} from '../../config/NavigationScreen';
import {DeviceComponent} from '../DeviceComponent';
import {ElectricSvg, FanSVG, LightBulb, OutletIcon} from '../Svgs';

interface ListDeviceDataProps {}

interface Device {
  title: string;
  icon: React.ComponentType<any> | React.ReactElement | null;
}

const ListDeviceData = [
  {title: 'Thiết bị chiếu sáng', icon: <LightBulb />},
  {title: 'Thiết bị gia dụng', icon: <FanSVG />},
  {title: 'Thiết bị điện', icon: <OutletIcon />},
  {title: 'Thiết bị điện', icon: <ElectricSvg />},
];

export const ListDevice = ({}: ListDeviceDataProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const renderItem = ({
    section,
    index,
  }: {
    section: SectionListData<Device>;
    index: number;
  }) => {
    const handleToScanQr = () => {
      navigation.navigate(NavigationScreen.ScanQRCode);
    };
    const numColumns = 3;

    if (index % numColumns !== 0) return null;

    const items = [];

    for (let i = index; i < index + numColumns; i++) {
      if (i >= section.data.length) {
        break;
      }

      items.push(
        <React.Fragment key={section.data[i].title + Math.random()}>
          <DeviceComponent
            onPress={handleToScanQr}
            title={section.data[i].title}
            ICON={section.data[i].icon}
            keyItem={section.data[i].title + Math.random()}
          />
        </React.Fragment>,
      );
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {items}
      </View>
    );
  };

  const renderHeaderComponent = ({
    section: {title},
  }: {
    section: SectionListData<Device>;
  }) => {
    return (
      <View style={styles.header}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <SectionList
      sections={[
        {title: 'asdasda', data: ListDeviceData},
        {title: '12312321412414', data: ListDeviceData},
      ]}
      renderItem={renderItem}
      renderSectionHeader={renderHeaderComponent}
      keyExtractor={(_item, index) => `${index}`}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#9f9f9f',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9f9f9f',
    marginHorizontal: 16,
  },
});
