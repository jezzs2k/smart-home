import {StyleSheet, Dimensions} from 'react-native';
import {RADIUS_DEFAULT_INPUT_BTN} from '../../config';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  bgLoading: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.1,
  },
  loadingForm: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: RADIUS_DEFAULT_INPUT_BTN,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.4,
  },
  spinner: {
    position: 'absolute',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
