import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, height, width, normalize} from '../Config';

export const IndexDisplay =  ({ onPressButton, color, index }) => ( 
        <TouchableOpacity
          onPress={onPressButton}
          hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
          style={styles.menu}
          >
          <Text>Index is {index}</Text>
        </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  menu: {
    position: 'absolute',
    left: width/2,
    top: Platform.OS === 'android' ? 14 : 40,
    zIndex: 5,
  },
  icon: {
    textShadowColor: 'black',
    textShadowRadius: 10,
    textShadowOffset: { height: 2, width: -2 },
    color: colors.TEXT,
    fontSize: normalize(26)
  },
});
