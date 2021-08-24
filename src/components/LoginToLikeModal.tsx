import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import {normalize, colors} from '../Config';
import Modal from 'react-native-modal';
import SmallButton from '../components/SmallButton';
const logo = require('../assets/img/logoround.png');

interface Props {
  onPressOK: any;
  onPressCancel: any;
  loginModalVisible: any;
}

export default class LoginToLikeModal extends PureComponent<Props, any> {
  render() {
    const {onPressOK, onPressCancel, loginModalVisible} = this.props;
    return (
      <View>
        <Modal
          isVisible={loginModalVisible}
          onBackdropPress={onPressCancel}
          backdropOpacity={0.5}
          useNativeDriver={true}
          onModalHide={() => {
            console.log('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 0.3,
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
            <Text style={styles.text}>you need to login to like jokes!</Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: normalize(20),
              }}>
              <SmallButton
                title="LOGIN"
                onPress={onPressOK}
                //     style={{backgroundColor: '#b5ffbf'}}
                style={{backgroundColor: colors.BUTTON}}
                logo={null}
              />

              <SmallButton
                title="CANCEL"
                onPress={onPressCancel}
                //    style={{backgroundColor: '#ff8682'}}
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
    //    lineHeight: normalize(37),
    textAlignVertical: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: normalize(16),

    //    lineHeight: normalize(37),
    textAlignVertical: 'center',
    color: 'black',
    textAlign: 'center',
    paddingTop: 10
  },
});
