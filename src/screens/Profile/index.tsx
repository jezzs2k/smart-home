import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RenderShow} from './RenderShowInfo';
// import {RenderEdit} from './RenderFormEdit';
import {ModalLoading} from '../../components/ModalLoading';
import {RootState} from '../../stores/stores';

export const Profile = ModalLoading()(() => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  const [isEdit, setIsEdit] = useState(false);
  const handleNavigation = () => {
    //   setIsEdit(true);
  };

  const handleSubmit = () => {
    //   setStatusModal(true);
  };

  // useEffect(() => {
  //   if (retrived && Object.entries(retrived).length > 0) {
  //     setIsEdit(false);
  //     dispatch(getUserInfo());
  //     dispatch(resetUpdate());
  //     setStatusModal(false);
  //   }
  // }, [retrived, dispatch, setStatusModal]);

  // useEffect(() => {
  //   if (error) {
  //     setStatusModal(false);
  //   }
  // }, [error, setStatusModal]);

  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <RenderShow onPress={handleNavigation} retrivedProfile={user!} />
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
