import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

import styles from './styles';

interface IModalLoadingState {
  loading: boolean;
}


export interface IModalLoadingPassProp {
  loading: boolean;
  onSetLoading: () => void;
  onCloseLoading: () => void;
}

export function ModalLoading<T>(): any {
  return (WrappedComponent: React.ComponentType<T>): React.ComponentType<T> =>
    class ModalLoading extends React.Component<T, IModalLoadingState> {
      constructor(props: T) {
        super(props);
        this.state = {
          loading: false,
        };
      }

      private handleLoading = () => {
        this.setState({loading: true});
      };

      private handleCloseLoading = () => {
        this.setState({loading: false});
      };

      render() {
        return (
          <>
            <WrappedComponent
              loading={this.state.loading}
              onSetLoading={this.handleLoading}
              onCloseLoading={this.handleCloseLoading}
              {...(this.props as T)}
            />
            <Modal
              visible={this.state.loading}
              animationType={'fade'}
              transparent>
              <View style={styles.bgLoading} />
              <View style={styles.spinner}>
                <View style={styles.loadingForm} />
              </View>
              <View style={styles.spinner}>
                <ActivityIndicator color={'#ffffff'} size={30} />
              </View>
            </Modal>
          </>
        );
      }
    };
}
