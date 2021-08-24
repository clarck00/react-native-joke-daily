import React, { useState, useEffect, Component } from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import { normalize } from '../Config';

export interface JokePunchlineProps {
    jokePunchline: string
    strLength: number
}


// const JokePunchline = ({jokePunchline}) => {
// const [fadeAnim] = useState(new Animated.Value(0))

// React.useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 1,
//         duration: 10000,
//       }
//     ).start();
//   }, [])

class JokePunchline extends React.Component<JokePunchlineProps, any> {
    constructor(props: JokePunchlineProps) {
      super(props);
      this.state = {
        fadeAnim: new Animated.Value(0)
      }
    }
  
    componentDidMount(){
        this.start()
    }

    start = () => {
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 10000
        }).start();
      };

    public render() {



    return (
        <Animated.Text
          style={[
            styles.jokeText,
            {
              textAlignVertical: 'top',
              fontFamily: 'CourierNewPS-BoldMT',
              fontSize: normalize(20),
              opacity: this.state.fadeAnim
              
     //         fontSize: strLength > 100 ? normalize(18) : normalize(20),
            },
          ]}>
          {this.props.jokePunchline}
        </Animated.Text>
    );
  }
}

export default JokePunchline;


const styles = StyleSheet.create({
    jokeText: {
      fontFamily: 'CourierNewPSMT',
      textTransform: 'lowercase',
      color: 'black',
    },
  });
  
