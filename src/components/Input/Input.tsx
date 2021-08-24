import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Input = ({
  onChangeText, value, placeholder, secureTextEntry, style, onFocus, onEndEditing
}) => (
  <View>
    <TextInput
      placeholder={placeholder}
      returnKeyType="done"
      underlineColorAndroid="transparent"
      style={[styles.inputStyle, style]}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={onFocus}
      onEndEditing={onEndEditing}
      onSubmitEditing={Keyboard.dismiss}
    />
  </View>
);

export default Input;

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.shape(),
};

Input.defaultProps = {
  value: null,
  secureTextEntry: false,
  style: {},
};
