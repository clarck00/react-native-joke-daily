import React, {Component} from 'react';
import {View, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {UtilService, colors, normalize, width} from '../Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Octicons';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';

export interface Props {
  item: any;
  onPressBack: any;
  onShare: any;
  toggleLike: any;
  fadeAnim: any;
}

class Card extends Component<Props, any> {
  pageView: any;
  isAnimating: boolean;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      isShuffled: false,
      shuffling: false,
      shuffleJokes: [],
      sharing: false,
    };

    this.isAnimating = false;
  }

  takeSnapshot = async () => {
    await this.setState({sharing: true});
    try {
      const file = await captureRef(this.pageView, {
        format: 'jpg',
        result: 'base64',
        quality: 0.3,
        //  collapsable: false
      });
      const shareOptions = {
        title: 'Share file',
        url: 'data:image/png;base64, ' + file,
        failOnCancel: false,
      };

      //  console.log(file);

      await Share.open(shareOptions)
        .then(res => {
          console.log(res);
          this.setState({sharing: false});
        })
        .catch(err => {
          err && console.log(err);
          this.setState({sharing: false});
        });
    } catch (err) {
      console.log(err);
      this.state.sharing && this.setState({sharing: false});
    }
  };

  public render() {
    const {
      children,
      item,
      onPressBack,
      onShare,
      toggleLike,
      fadeAnim,
    } = this.props;
    //   const totalLikes = item && item.totalLikes.items.length;
    let setupFontSize = item && 25 - item.jokeSetup.length * 0.12;
    let punchlineFontSize = item && 25 - item.jokePunchline.length * 0.12;
    return (
      <View style={styles.card}>
        <View
          style={styles.imageSection}
          collapsable={false}
          ref={component => {
            this.pageView = component;
          }}>
          <FastImage
            style={styles.image}
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
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Animated.View style={[styles.setupContainer, {}]}>
                <Animated.Text
                  allowFontScaling={false}
                  style={[
                    styles.jokeText,
                    {
                      fontSize: normalize(setupFontSize),
                    },
                  ]}>
                  {item.jokeSetup}
                </Animated.Text>
              </Animated.View>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Animated.View
                style={[styles.punchlineContainer, {opacity: fadeAnim}]}>
                <Animated.Text
                  allowFontScaling={false}
                  style={[
                    styles.jokeText,
                    {
                      fontSize: normalize(punchlineFontSize),
                      textAlign: 'right',
                      opacity: !this.state.sharing ? fadeAnim : 1,
                    },
                  ]}>
                  {item.jokePunchline}
                </Animated.Text>
              </Animated.View>
            </View>
          </FastImage>

          <View style={styles.comedianContainer}>
            <LinearGradient
              colors={[colors.WHITE, '#ffecb8']}
              style={styles.linearGradient}>
              {item.comedian !== '-' && (
                <Text style={styles.comedianText}>{item.comedian}</Text>
              )}
            </LinearGradient>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
            onPress={onPressBack}>
            <Ionicons name="md-undo" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
            onPress={() => toggleLike(item)}>
            <Ionicons
              name="md-heart"
              style={[
                styles.icon,
                {
                  color:
                    item.userLike.items.length === 0
                      ? colors.TEXTGREY
                      : '#ff6b6b',
                },
              ]}
            />
            {/*  <Text style={{textAlign: 'center'}}>
              {totalLikes}
            </Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
            onPress={this.takeSnapshot}>
            <Ionicons name="md-share" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#ffecb8', '#e0e0e0']}
          style={[
            styles.linearGradient,
            {borderBottomRightRadius: 10, borderBottomLeftRadius: 10},
          ]}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {UtilService.getDateTime(item.date)}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  card: {
    flex: 1,
    borderRadius: 10,
  },
  icon: {
    fontSize: normalize(30),
    color: colors.TEXTGREY,
  },

  imageSection: {
    flex: 12,
    //  minHeight: width,
    height: width + 40,
  },
  image: {
    flex: 12,
    width: width - 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    borderBottomColor: 'rgba(196, 196, 196, 0.4)',
    borderBottomWidth: 1,
  },
  jokeText: {
    fontFamily: 'PatrickHandSC-Regular',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: normalize(23),
    marginVertical: 2,
  },
  bottomContainer: {
    flex: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  comedianContainer: {
    flex: 1,
    flexDirection: 'row',
    //   justifyContent: 'center',
    //  backgroundColor: 'red',
    //   alignItems: 'center',
    //    borderBottomRightRadius: 10,
    //   borderBottomLeftRadius: 10,
  },
  comedianText: {
    fontSize: normalize(16),
    fontFamily: 'LuckiestGuy-Regular',
    letterSpacing: 1,
    textAlign: 'center',
    //   textTransform: 'uppercase',

    color: colors.TEXTGREY,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  iconContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    //  paddingTop: 8,
    alignItems: 'flex-start',
    backgroundColor: colors.SECONDARY,
  },
  setupContainer: {
    //  flex: 1,
    justifyContent: 'center',
    marginVertical: normalize(8),
    marginHorizontal: normalize(8),
    paddingTop: 1,
    paddingHorizontal: 6,
    maxWidth: width - width / 6,
    backgroundColor: 'rgba(0,0,0, 0.85)',
    borderRadius: 4,
  },
  punchlineContainer: {
    justifyContent: 'center',
    marginVertical: normalize(6),
    marginHorizontal: normalize(8),
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    maxWidth: width - width / 6,
    borderRadius: 4,
  },
  dateText: {
    fontFamily: 'Raleway-Regular',
    fontSize: normalize(13),
    color: colors.TEXTGREY,
    //  paddingBottom: 10,
  },
  dateContainer: {
    flex: 1,
  },
  bottomBit: {
    flex: 0.4,
    //  backgroundColor: colors.CARDBACKGROUND
  },
  linearGradient: {
    flex: 1,
  },
});

export default Card;
