import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../Config';

class Loading extends React.PureComponent {
  render() {
    return (
      <View style={styles.card}>

        <LottieView
          source={require('../assets/img/bluestopwatch.json')}
          style={{height: 100, width: 100}}
          autoPlay
          loop
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center'

  },
});



export default Loading;
