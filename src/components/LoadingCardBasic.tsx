import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../Config';

// import styles from './TopButtonStyles';

export const LoadingCardBasic = ({zIndex}) => (
  <View style={[styles.card, {
    zIndex: -2
  }]}>
    <Image source={require('../assets/img/loadingface.gif')} />

    <Text style={styles.text}>One Moment...</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ababab',
    backgroundColor: '#dbdbdb',
    marginBottom: 50,
    marginHorizontal: 15,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Raleway-Regular',
    paddingTop: 10,
    textTransform: 'uppercase',
  },
});
