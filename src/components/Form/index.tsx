import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../config';

interface FormProps {
  children: any;
  titleHeader: string;

  renderHeader?: React.ComponentType<any> | React.ReactElement | null;
  renderFooter?: React.ComponentType<any> | React.ReactElement | null;
}

export const Form = ({
  children,
  titleHeader,
  renderFooter = null,
  renderHeader = null,
}: FormProps) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}>
      {renderHeader ?? (
        <View style={styles.header}>
          <Text style={styles.textHeader}>{titleHeader}</Text>
        </View>
      )}
      {children}
      {renderFooter}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    backgroundColor: Colors.BG,
    flex: 1,
  },
  header: {
    marginBottom: 8,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    paddingVertical: 16,
  },
});
