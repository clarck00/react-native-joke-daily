import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {cardMarginBottom, cardMarginTop} from '../Config';
import LottieView from 'lottie-react-native';

// import styles from './TopButtonStyles';

export default class LoadingCard extends React.PureComponent {
  render() {
    return (
      <View style={styles.card}>
      <View style={styles.clock}>
        <LottieView
          source={require('../assets/img/stopwatch.json')}
          autoPlay
          loop
          style={{height: 200, width: 200}}
          
        />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ababab',
    backgroundColor: '#dbdbdb',
    top: cardMarginTop,
    bottom: cardMarginBottom,
    left: 6,
    right: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Raleway-Regular',
    paddingTop: 10,
    textTransform: 'uppercase',
  },
  clock: {

  }
});
