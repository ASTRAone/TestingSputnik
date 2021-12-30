import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

export const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color='black' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});