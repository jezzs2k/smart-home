import React from 'react';
import {StyleSheet, View} from 'react-native';

import {ScanQrCode} from '../../../components/QRCode';
import {Colors} from '../../../config';

interface AddAutomaticsProps {
  indexActiveScreen: number;
}

export const AddAutomatics = ({indexActiveScreen}: AddAutomaticsProps) => {
  return <ScanQrCode indexActiveScreen={indexActiveScreen} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
  },
});
