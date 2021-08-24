import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {normalize, colors, isAndroid} from '../Config';
import Modal from 'react-native-modal';
import SmallButton from '../components/SmallButton';
const logo = require('../assets/img/logoround.png');

export interface Props {
  onPress: any;
  onModalShow: any;
  modalVisible: any;
}

export default class FirstTimeModal extends PureComponent<Props, any> {
  render() {
    const {onPress, onModalShow, modalVisible} = this.props;
    return (
      <View>
        <Modal
          isVisible={modalVisible}
          onModalShow={onModalShow}
          backdropOpacity={0.6}
          useNativeDriver={true}
          onModalHide={() => {
            console.log('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ebe8e8',
              alignItems: 'center',
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 15,
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                }}
                source={logo}
              />
            </View>

            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                //      backgroundColor: 'green',
              }}>
              <Text style={styles.jokeHeaderText}>Hello, sailor</Text>

              <View
                style={{
                  paddingHorizontal: 10,
                  flex: 1,
                  justifyContent: 'space-around',
                }}>
                <Text style={styles.text}>Swipe either way for more jokes</Text>

                {!isAndroid ? (
                  <Text style={styles.boldText}>
                    Make sure you allow notifications if you want a new joke
                    every day!
                  </Text>
                ) : (
                  <Text style={styles.boldText}>Enjoy!</Text>
                )}
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <SmallButton
                title="OK"
                onPress={onPress}
                style={{
                  backgroundColor: colors.BUTTON,
                }}
                logo={null}
              />
            </View>
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
  jokeHeaderText: {
    fontFamily: 'Raleway-Bold',
    fontSize: normalize(22),
    color: 'black',
    textAlign: 'center',
    margin: 15,
    textTransform: 'uppercase',
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: normalize(15),
    textAlignVertical: 'center',
    color: 'black',
    textAlign: 'center',
    margin: 5,
  },
  boldText: {
    fontFamily: 'Raleway-Bold',
    fontSize: normalize(15),
    textAlignVertical: 'center',
    color: 'black',
    textAlign: 'center',
  },
});
