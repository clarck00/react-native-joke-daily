import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';

import LoginToSubmitModal from '../components/LoginToSubmitModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

// REDUX
import {connect} from 'react-redux';

import {colors, height, normalize} from '../Config';
import Button from '../components/Button';
import Input from '../components/Input';
import BigInput from '../components/BigInput';
import {ListUserJokes} from '../customGraphQL/queries';
import {CreateUserJoke} from '../customGraphQL/mutations';
import {graphql, compose} from 'react-apollo';
import uuid from 'uuid';
import awsconfig from '../aws-exports';
import {RNS3} from 'react-native-aws3';
import keys from '../keys';
import ThanksForSubmittingModal from '../components/ThanksForSubmittingModal';

const logo = require('../assets/img/logoround.png');

export interface Props {
  navigation: any;
}
class SubmitScreen extends Component<Props, any> {
  static navigationOptions = {
    title: 'Submit',
    header: null,
  };
  onToastRef = (ref: any) => (this.toast = ref);
  toast: any;

  showToast = (message: any) => this.toast.show(message, 2000);

  constructor(props: Props) {
    super(props);
    this.state = {
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(0),
      isHidden: false,
      loading: false,
      error: '',
      comedian: ' ',
      joke: ' ',
      info: ' ',
      loginModalVisible: false,
      photo: null,
      text: '',
      date: '',
      file: undefined,
      submitModalVisible: false,
    };
  }

  componentDidMount() {
    this.fadeIn();
    //    this.unsubscribeStore = store.subscribe(this.storeListener);
  }

  onChangeText = (key: any, value: any) => {
    this.setState({[key]: value});
  };

  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    this.setState({isHidden: true});
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    this.setState({isHidden: false});
  }

  handleChoosePhoto = () => {
    if (!this.props.profile.sub) {
      this.setState({loginModalVisible: true});
      return;
    }
    const options = {
      noData: true,
      //    maxWidth: 300
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  sendPicS3 = async () => {
    console.log('localphoto', this.state.photo.uri);
    const bucket = awsconfig.aws_user_files_s3_bucket;
    const region = awsconfig.aws_user_files_s3_bucket_region;
    this.setState({loading: true});
    let pic = {
      uri: this.state.photo.uri,
      name: uuid(),
      type: 'image/jpeg',
      bucket,
      region,
    };
    const config = {
      keyPrefix: 'uploads/',
      bucket,
      region,
      accessKey: keys.accessKey,
      secretKey: keys.secretKey,
      successActionStatus: 201,
    };
    let file;
    RNS3.put(pic, config).then(async response => {
      if (response.status !== 201) {
        throw new Error('Failed to upload image to S3');
      } else {
        const fileData = response.body.postResponse;
        console.log('response is', response);
        console.log('file data is', fileData);
        file = {
          bucket: fileData.bucket,
          region: awsconfig.aws_user_files_s3_bucket_region,
          key: fileData.key,
          visibility: 'public',
        };
        console.log('file is', file);
        try {
          this.props.createUserJoke({
            id: pic.name,
            userId: this.props.profile.sub,
            userEmail: this.props.profile.email,
            userName: this.props.profile.name
              ? this.props.profile.name
              : 'NoName',
            comedian: this.state.comedian,
            jokeText: this.state.joke,
            info: this.state.info,
            file: file,
          });
          this.setState({
            comedian: ' ',
            joke: ' ',
            info: ' ',
            photo: null,
            submitModalVisible: true,
          });
        } catch (err) {
          console.log(err);
          Alert.alert('opps, file failed to upload!');
        }
        this.setState({
          loading: false,
        });
      }
    });
  };

  render() {
    let {fadeOut, fadeIn, isHidden, photo} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={styles.close}
          hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
          onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.navigate('Joke Swiper');
          }}>
          <Ionicons name={'ios-arrow-back'} size={30} color={colors.TEXT} />
        </TouchableHighlight>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ios: 'padding', android: undefined})}
            enabled>
            <TouchableWithoutFeedback
              style={styles.container}
              onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                {/* App Logo */}
                <View style={styles.logoContainer}>
                  {isHidden ? (
                    <Animated.Image
                      source={logo}
                      style={{opacity: fadeIn, width: 100, height: 100}}
                    />
                  ) : (
                    <Animated.Image
                      source={logo}
                      style={{opacity: fadeOut, width: 50, height: 50}}
                    />
                  )}
                </View>

                <View style={styles.secondaryContainer}>
                  <Text style={styles.text}>SUBMIT A JOKE!</Text>

                  {this.state.loading ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 50,
                      }}>
                      <ActivityIndicator size={'large'} color={'white'} />
                      <Text
                        style={{
                          padding: 40,
                          fontSize: normalize(20),
                          fontFamily: 'RockSalt-Regular',
                          textTransform: 'uppercase',
                          color: 'white',
                        }}>
                        Uploading...
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.container}>
                      <View style={{margin: 5}}></View>

                      <Text style={styles.error}>{this.state.error}</Text>

                      <Text style={styles.label}>Comedian / Author:</Text>

                      <Input
                        placeholder={'Lenny Bruce'}
                        onChangeText={text =>
                          this.onChangeText('comedian', text)
                        }
                        value={this.state.comedian}
                        onFocus={() => this.fadeOut()}
                        onEndEditing={() => this.fadeIn()}
                      />

                      <View style={{margin: 3}}></View>

                      <Text style={styles.label}>Joke</Text>

                      <BigInput
                        placeholder={
                          'The liberals can understand everything but people who don’t understand them'
                        }
                        onChangeText={text => this.onChangeText('joke', text)}
                        value={this.state.joke}
                        onFocus={() => this.fadeOut()}
                        onEndEditing={() => this.fadeIn()}
                      />
                      
                      <View style={{margin: 3}}></View>

                      <Text style={styles.label}>Any further info?</Text>

                      <BigInput
                        placeholder={'More info here'}
                        onChangeText={text => this.onChangeText('info', text)}
                        value={this.state.info}
                        onFocus={() => this.fadeOut()}
                        onEndEditing={() => this.fadeIn()}
                      />

                      <View style={{margin: 5}}></View>

                      <Text style={styles.label}>Image*:</Text>

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {this.state.photo ? (
                          <ImageBackground
                            source={{uri: photo.uri}}
                            style={styles.image}
                            imageStyle={{
                              borderRadius: 5,
                            }}>
                            <TouchableOpacity
                              hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
                              onPress={() => this.setState({photo: null})}>
                              <Ionicons
                                name="ios-close-circle"
                                size={25}
                                color="red"
                                style={{alignSelf: 'flex-end'}}
                              />
                            </TouchableOpacity>
                          </ImageBackground>
                        ) : (
                          <View
                            style={{
                              height: 100,
                              width: 100,
                              backgroundColor: 'white',
                              borderRadius: 15,
                              opacity: 0.8,
                              margin: 5,
                            }}></View>
                        )}

                        {!this.state.photo && (
                          <View style={{}}>
                            <Button
                              title="CHOOSE IMAGE"
                              onPress={this.handleChoosePhoto}
                              style={{backgroundColor: colors.BUTTON}}
                              logo={null}
                            />
                          </View>
                        )}

                        {this.state.photo && (
                          <View style={{}}>
                            <Button
                              title="SUBMIT"
                              onPress={this.sendPicS3}
                              style={{backgroundColor: colors.BUTTON}}
                              logo={null}
                            />
                            <Text
                              style={{
                                fontStyle: 'italic',
                                fontSize: 13,
                                paddingHorizontal: 30,
                                paddingTop: 5,
                              }}>
                              *please make sure you have permission to use this
                              image before you submit!
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <LoginToSubmitModal
              loginModalVisible={this.state.loginModalVisible}
              onPressOK={() => {
                this.setState({loginModalVisible: false});
                this.props.navigation.navigate('NotSigned');
              }}
              onPressCancel={() => {
                this.setState({loginModalVisible: false});
              }}
            />
            <ThanksForSubmittingModal
              submitModalVisible={this.state.submitModalVisible}
              onPressOK={() => {
                this.setState({submitModalVisible: false});
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  index: state.index,
});

const enhance = compose(
  connect(mapStateToProps),
  graphql(ListUserJokes, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      listUserJokes: props.data.listUserJokes
        ? props.data.listUserJokes.items
        : [],
    }),
  }),
  graphql(CreateUserJoke, {
    options: {
      update: (proxy, {data: {createUserJoke}}) => {
        const query = ListUserJokes;
        const data = proxy.readQuery({query});
        data.listUserJokes.items = [
          ...data.listUserJokes.items.filter(
            joke => joke.id !== createUserJoke.id,
          ),
          createUserJoke,
        ];
        proxy.writeQuery({query, data});
      },
    },
    props: props => ({
      createUserJoke: (input: any) => {
        props.mutate({
          variables: input,
          optimisticResponse: () => ({
            __typename: 'Mutation',
            createUserJoke: {
              ...input,
              id: uuid(),
              __typename: 'UserJoke',
              file: {...input.file, __typename: 'S3Object'},
            },
          }),
        });
      },
    }),
  }),
);

export default enhance(SubmitScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: 'center',
    //  justifyContent: 'flex-start',
    //   justifyContent: 'center',
    //    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.25,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: colors.BACKGROUND,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    padding: 0,
    margin: 10,
    color: colors.TEXT,
    textDecorationLine: 'underline',
  },
  close: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'android' ? 14 : 40,
    zIndex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: '10%',
    //   fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: normalize(11),
    color: colors.TEXT,
  },
  error: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'red',
    //  fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
  secondaryContainer: {
    flex: 1,
    paddingTop: 10,
    //  justifyContent: 'flex-start',
    //   bottom: logoHeight - 20,
    alignItems: 'center',
  },
  modal: {
    width: '50%',
    alignContent: 'center',
    alignSelf: 'center',
    bottom: 80,
    height: height / 12,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'CourierNewPSMT',
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: normalize(18),
    //   textTransform: 'lowercase',
    //    lineHeight: normalize(37),
    color: colors.TEXT,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
});
