import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, normalize} from '../Config';
import {getStatusBarHeight} from 'react-native-status-bar-height';


export const MenuButton =  ({ onPressButton, color }) => ( 
        <TouchableOpacity
          onPress={onPressButton}
          hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
          style={styles.menu}
          >
          <Ionicons 
          name={'md-menu'}
          style={styles.icon}
          color={color} />
        </TouchableOpacity> 
)

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  menu: {
    position: 'absolute',
    left: 14,
    top: 14 + (getStatusBarHeight(true) * 0.5),
    zIndex: 5,
  },
  icon: {
    textShadowColor: 'black',
    textShadowRadius: 5,
  //  textShadowOffset: { height: 2, width: -2 },
    color: 'white',
    fontSize: normalize(26)
  },
});
