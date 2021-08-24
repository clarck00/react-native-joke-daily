import * as React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { colors } from '../Config';
// import styles from './TopButtonStyles';

export const ShuffleButton = ({onPressButton}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPressButton}
      hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
      style={styles.button}>
      <Icon name={'shuffle'} style={styles.icon}/>
{/*       <View style={styles.textContainer}>
        <Text style={[styles.text, {color: buttonColor}]}>Random</Text>
</View> */}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 30,
    flexDirection: 'column',
 //   backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    color: colors.TEXT,
    top: 0,
    fontSize: 20
  },
  text: {
    color: colors.TEXT,
    fontSize: 8,
    fontStyle: 'italic',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
});
