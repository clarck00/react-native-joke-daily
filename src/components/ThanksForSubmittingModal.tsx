import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {normalize, colors} from '../Config';
import Modal from 'react-native-modal';
import SmallButton from '../components/SmallButton';
const logo = require('../assets/img/logoround.png');
interface Props {
  onPressOK: any;
  submitModalVisible: any;
}
export default class ThanksForSubmittingModal extends PureComponent<
  Props,
  any
> {
  render() {
    const {onPressOK, submitModalVisible} = this.props;
    return (
      <View>
        <Modal
          isVisible={submitModalVisible}
          //        onBackdropPress={onPressCancel}
          backdropOpacity={0.5}
          useNativeDriver={true}
          onModalHide={() => {
            console.log('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 0.45,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ebe8e8',
              paddingVertical: 20,
              marginHorizontal: 20,
              borderRadius: 15,
            }}>
            <Image
              style={{
                width: normalize(70),
                height: normalize(70),
                alignSelf: 'center',
              }}
              source={logo}
            />
            <Text style={styles.text}>You little ripper you!</Text>
            <Text style={styles.textSecondary}>
              Thanks for submitting that joke. We'll have a quick look and if it
              cuts the mustard, expect to see it on here soon!
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: normalize(20),
              }}>
              <SmallButton
                title="OK"
                onPress={onPressOK}
                style={{backgroundColor: colors.BUTTON}}
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
    fontFamily: 'CourierNewPS-BoldMT',
    fontSize: normalize(20),
    textAlignVertical: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Raleway-Bold',
    fontSize: normalize(16),
    textAlignVertical: 'center',
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  textSecondary: {
    fontFamily: 'Raleway-Regular',
    fontSize: normalize(13),
    textAlignVertical: 'center',
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
});
