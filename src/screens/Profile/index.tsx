import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RenderShow} from './RenderShowInfo';
// import {RenderEdit} from './RenderFormEdit';
import {ModalLoading} from '../../components/ModalLoading';
import {RootState} from '../../stores/stores';
import { getUser } from '../../stores/factories/user';

export const Profile = ModalLoading()(() => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.user);

  const [isEdit, setIsEdit] = useState(false);
  const handleNavigation = () => {
    //   setIsEdit(true);
  };


  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <RenderShow onPress={handleNavigation} retrivedProfile={data!} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  containerChild: {
    width: '100%',
    height: '100%',
  },
});
