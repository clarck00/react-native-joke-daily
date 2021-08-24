import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const BigInput = ({
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
      multiline={true}
      textAlignVertical={'top'}
    />
  </View>
);

export default BigInput;

BigInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.shape(),
};

BigInput.defaultProps = {
  value: null,
  secureTextEntry: false,
  style: {},
};
