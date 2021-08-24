import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './TopButtonStyles';

export const ItemScreenMenuButton = ({onPressButton}) => (
  <View style={[styles.container, {zIndex: 20 }]}>
    <TouchableOpacity
      onPress={onPressButton}
      hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
      style={styles.button}>
      <Ionicons name={'md-menu'} style={[styles.icon, {fontSize: 35}]} />

{/*       <View style={styles.textContainer}>
        <Text style={styles.text}>Menu</Text>
</View> */}
    </TouchableOpacity>
  </View>
);
