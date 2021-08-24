import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './TopButtonStyles';

export const BackToStartButton = ({onPressButton}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPressButton}
      hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
      style={styles.button}>
      <Icon name={'back-in-time'} style={styles.icon} />
      <View style={styles.textContainer}>
      <Text style={styles.text}>Today</Text>
      </View>
    </TouchableOpacity>
  </View>
);
