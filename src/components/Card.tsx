import React, {Component} from 'react';
import {View, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {UtilService, colors, normalize, width, isAndroid} from '../Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import {default as newnorm} from 'react-native-normalize';

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
    //   console.log(this.props.item.comedian)
    await this.setState({sharing: true});
    try {
      const file = await captureRef(this.pageView, {
        format: 'jpg',
        result: 'base64',
        quality: 0.3,
        //  collapsable: false
      });
      const shareOptions = {
        title: this.props.item.comedian,
        //     message: 'Download the app at https://dailyjokeapp.com/',
        //     subject: 'Joke of the day ' + this.props.item.date,
        url: 'data:image/png;base64, ' + file,
        failOnCancel: false,
      };
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
    const {item, onPressBack, toggleLike, fadeAnim} = this.props;
    //   const totalLikes = item && item.totalLikes.items.length;
    let setupFontSize = item && 33 - item.jokeSetup.length * 0.17;
    let punchlineFontSize = item && 33 - item.jokePunchline.length * 0.17;
    return (
      <View style={styles.card}>
        <View
          style={styles.imageAndComedian}
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
                      fontSize: isAndroid
                        ? newnorm(setupFontSize)
                        : newnorm(setupFontSize - 1),
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
                      fontSize: isAndroid
                        ? newnorm(punchlineFontSize)
                        : newnorm(punchlineFontSize - 1),
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
            {item.comedian !== '-' && (
              <Text style={styles.comedianText}>
                {'-   '}
                {item.comedian}
              </Text>
            )}
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

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {UtilService.getDateTime(item.date)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
  },
  icon: {
    fontSize: newnorm(30, 'height'),
    color: colors.TEXTGREY,
  },
  imageAndComedian: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: isAndroid
      ? width + newnorm(40, 'height')
      : width + newnorm(50, 'height'),
  },
  imageSection: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: width + 30,
  },
  image: {
    flex: 1,
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
    backgroundColor: 'green',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  comedianContainer: {
    justifyContent: 'center',
    backgroundColor: colors.LIGHTGREY,
    alignItems: 'flex-end',
    paddingHorizontal: 6,
    minHeight: 25,
  },
  comedianText: {
    fontSize: isAndroid ? newnorm(18, 'height') : newnorm(16, 'height'),
    fontFamily: 'RockSalt-Regular',
    letterSpacing: 1,
    //  textAlign: 'center',
    color: colors.TEXTGREY,
  },
  iconContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    //  paddingTop: 8,
    alignItems: 'center',
    backgroundColor: colors.LIGHTGREY,
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
    fontSize: newnorm(12),
    color: colors.TEXTGREY,
    textAlign: 'center',
    //  paddingBottom: 10,
  },
  dateContainer: {
    flex: 1.2,
    justifyContent: 'flex-end',
    paddingBottom: newnorm(4),
    backgroundColor: colors.LIGHTGREY,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bottomBit: {
    flex: 0.4,
  },
  linearGradient: {
    flex: 1,
  },
});

export default Card;
