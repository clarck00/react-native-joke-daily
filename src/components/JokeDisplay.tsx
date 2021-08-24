import * as React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {height, width, normalize, UtilService, colors} from '../Config';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';

const windowHeight = Math.round((height / 7) * 4);

export interface JokeProps {
  item: any;
}

export default class JokeDisplay extends React.Component<JokeProps, any> {
  isAnimating: boolean;
    viewRef: React.RefObject<unknown>;
  constructor(props: JokeProps) {
    super(props);
    this.viewRef = React.createRef();
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    this.isAnimating = false;
  }

  componentDidMount() {
      console.log(this.props.item.comedian)
  }

  captureImage = () => {
    console.log(this.viewRef)
     captureRef(this.viewRef.current, {
      format: "jpg",
      quality: 0.8,
    }).then(
      uri => console.log("Image saved to", uri),
      error => console.error("Oops, snapshot failed", error)
    );
  };

  renderPunchline(item: any) {
    let strLength = item.jokeSetup.length + item.jokePunchline.length;
    return (
      <View>
        <Animated.Text
          style={[
            styles.jokeText,
            {
              textAlignVertical: 'top',
              fontFamily: 'CourierNewPS-BoldMT',
              fontSize: strLength > 100 ? normalize(18) : normalize(20),
              opacity: this.state.fadeAnim,
            },
          ]}>
          {item.jokePunchline}
        </Animated.Text>
      </View>
    );
  }

  public render() {
    const {item} = this.props;
    const strLength = item && item.jokeSetup.length + item.jokePunchline.length;
    return (
      <View ref={this.viewRef}>
        <FastImage
          style={{width: width - 42, height: windowHeight - 40}}
          source={{
            uri:
              'https://s3-' +
              item.file.region +
              '.amazonaws.com/' +
              item.file.bucket +
              '/' +
              item.file.key,
          }}>
          <View
            style={{
              flex: 1,
              opacity: 0.95,
              backgroundColor: 'white',
              height: windowHeight,
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 6,
              }}>
              <Icon name="quote" size={40} color="black" />
              <Text>{UtilService.getDateTime(item.date)}</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: normalize(8),
                height: height / 2,
                opacity: 1,
                paddingBottom: normalize(6),
              }}>
              <Text
                //     adjustsFontSizeToFit
                //     allowFontScaling
                style={[
                  styles.jokeText,
                  {fontSize: strLength > 100 ? normalize(18) : normalize(20)},
                ]}>
                {item.jokeSetup}
              </Text>
            </View>

            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  paddingHorizontal: normalize(8),
                  height: windowHeight / 2,
                  opacity: 1,
                }}>
                {this.renderPunchline(item)}
              </View>
            </View>
          </View>
        </FastImage>

        <View style={{marginRight: 15}}>
          <Text
            style={{
              fontSize: normalize(16),
              fontFamily: 'Raleway-Bold',
              textTransform: 'uppercase',
              padding: 4,
              paddingVertical: normalize(15),
              textAlign: 'right',
            }}>
            {' -   '}
            {item.comedian}{' '}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  backgroundColor: colors.BACKGROUND,
  },
  jokeText: {
    fontFamily: 'CourierNewPSMT',
    //  fontSize: 23,
    textTransform: 'lowercase',
    //    lineHeight: normalize(37),
    color: 'black',
  },
});
