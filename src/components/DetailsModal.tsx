import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Text, 
  Alert
} from "react-native";

import { normalize } from "../Config"
import Modal from "react-native-modal";

interface Props{
  isVisible: boolean;
  content: string;
}

export default class DetailsModal extends Component<Props, any> {
  render() {
    const { children, onPress, onModalShow, isVisible, content } = this.props;
    return (
      <View style={{ marginTop: 22, zIndex: 10 }}>
        <Modal
          isVisible={isVisible}
 //         onModalShow={onModalShow}
          onModalHide={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              margin: 22,
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <Text style={styles.jokeHeaderText}>WELCOME</Text>
            <Text style={styles.jokeText}>Swipe for more jokes</Text>
            <Text style={styles.jokeText}>{content}</Text>
            <TouchableHighlight
                  onPress={onPress}
            //   onPress={() => {
            //     this.swiper.jumpToCardIndex(0);
            //     this.setState({swipedAllCards: false});
            //   }}
            >
              <Text
                style={[
                  styles.jokeHeaderText,
                  {
                    textDecorationLine: 'underline',
                    fontSize: 26,
                  },
                ]}>
                OK
              </Text>
            </TouchableHighlight>
          </View>

          <View
            style={{
              margin: 22,
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <TouchableHighlight
              onPress={onPress}
            >
            <Text style={[styles.jokeText, {
              textDecorationLine: 'underline',
              fontSize: 26
            }]}>OK</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  jokeHeaderText: {
    fontFamily: "CourierNewPS-BoldMT",
    fontSize: normalize(30),
    //    lineHeight: normalize(37),
    textAlignVertical: "center",
    color: "white",
    textAlign: "center",
    marginBottom: 20
  },
  jokeText: {
    fontFamily: "CourierNewPSMT",
    fontSize: normalize(22),

    //    lineHeight: normalize(37),
    textAlignVertical: "center",
    color: "white",
    textAlign: "center"
  }
});
