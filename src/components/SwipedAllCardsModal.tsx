import React, { PureComponent } from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Modal from 'react-native-modal';
export interface Props {
  onPress: any
  isVisible: any
}

export default class SwipedAllCardsModal extends PureComponent<Props, any> {
  public render() {
    const { children, onPress, isVisible } = this.props;
    return (
      <View>
        <Modal isVisible={isVisible}>
          <View
            style={{
              margin: 22,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={[
                styles.noJokesModalText,
                {fontFamily: 'CourierNewPS-BoldMT', marginBottom: 20},
              ]}>
              bugger me we're out of jokes
            </Text>
            <Text style={[styles.noJokesModalText, {color: 'white'}]}>
              check back tomorrow for another
            </Text>
          </View>

          <View
            style={{
              margin: 22,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <TouchableHighlight
                  onPress={onPress}
            //   onPress={() => {
            //     this.swiper.jumpToCardIndex(0);
            //     this.setState({swipedAllCards: false});
            //   }}
            >
              <Text
                style={[
                  styles.noJokesModalText,
                  {
                    textDecorationLine: 'underline',
                    fontSize: 26,
                  },
                ]}>
                OK
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noJokesModalText: {
    textAlign: 'center',
    fontFamily: 'CourierNewPSMT',
    fontSize: 30,
    color: 'white',
  },
});
