import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button, CodeFieldComp, ScreenDefault} from '../../components';
import {Colors} from '../../config';
import {ModalLoading} from '../../components/ModalLoading';
import useTimeout from '../../Hooks/useTimeout';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../stores/stores';
import {AuthStateReducer, start} from '../../stores/auth';

interface HomeProps {
  loading: boolean;

  onSetLoading: () => void;
  onCloseLoading: () => void;
}

export const HomeScreen = ModalLoading()(
  ({onSetLoading, onCloseLoading}: HomeProps) => {
    const navigation = useNavigation();

    const auth = useSelector<RootState>(
      state => state.auth,
    ) as AuthStateReducer;

    const dispatch = useAppDispatch();

    console.log(auth);

    const handleAddDevices = () => {
      //Navigation
      navigation.navigate('AddDevice');
    };

    useTimeout(() => {
      dispatch(start());
    }, 1000);

    useTimeout(() => {
      onCloseLoading();
    }, 3000);

    useEffect(() => {
      if (auth.loading) {
        onSetLoading();
      }
    }, [auth]);

    return (
      <View style={styles.container}>
        <ScreenDefault
          titleScreen={'Không có thiết bị, vui lòng thêm'}
          onPress={handleAddDevices}
          ButtonComp={
            <Button
              onPress={handleAddDevices}
              title={'Thêm thiết bị'}
              isShowIcon={false}
            />
          }
        />
      </View>
    );
  },
);

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
