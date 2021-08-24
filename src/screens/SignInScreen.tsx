import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
// REDUX
import {connect} from 'react-redux';
// COMPONENTS
import Loading from '../components/Loading';
import {colors, normalize, isAndroid, height} from '../Config';
import Button from '../components/Button';
import Input from '../components/Input';

interface Props {
  navigation: any;
  user: any;
}

const logo = require('../assets/img/logoround.png');

class SignInScreen extends Component<Props, any> {
  static navigationOptions = {
    title: 'Sign In',
    header: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: {},
      loading: false,
      error: '',
      authCode: '',
      profile: {},
      modal: false,
      isSigninInProgress: false,
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(0),
      isHidden: false,
    };
  }

  componentDidMount() {
    this.fadeIn();
  }

  onChangeText = (key: any, value: any) => {
    this.setState({[key]: value});
  };

  fbSignIn = async () => {
    this.setState({loading: true});
    await Auth.federatedSignIn({provider: 'Facebook'})
      .then(user => {
        this.setState({user, loading: false});
        this.props.navigation.navigate('Joke Swiper');
        console.log(this.state.user);
      })
      .catch(error => {
        this.setState({loading: false, error: error.message});
      });
  };

  signIn = async () => {
    Keyboard.dismiss();
    this.setState({loading: true, error: ''});
    const {username, password, isSigninInProgress} = this.state;
    if (username && password) {
      await Auth.signIn(username, password)
        .then(user => {
          this.setState({user, loading: false});
          this.props.navigation.navigate('Joke Swiper');
          console.log(this.state.user);
        })
        .catch(error => {
          this.setState({loading: false, error: error.message});
        });
    } else {
      this.setState({loading: false, error: 'Complete missing fields'});
    }
  };

  googSignIn = async () => {
    this.setState({isSigninInProgress: true});
    try {
      await Auth.signOut(); // sign-out from any previously existing session
      await Auth.federatedSignIn({provider: 'Google'});
    } catch (error) {
      console.log('Fail google signin', error);
      Alert.alert('Sign in error');
    }
    this.setState({isSigninInProgress: false});
    this.props.navigation.navigate('Item');
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

  render() {
    let {fadeOut, fadeIn, isHidden, isSigninInProgress} = this.state;
    if (isSigninInProgress) {
      return <Loading />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={styles.close}
          hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
          onPress={() => this.props.navigation.navigate('Joke Swiper')}>
          <Ionicons name={'ios-arrow-back'} size={30} color={colors.TEXT} />
        </TouchableHighlight>

        <KeyboardAvoidingView
          style={styles.container}
          behavior={isAndroid ? undefined : 'padding'}
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
                    style={{opacity: fadeIn, width: 130, height: 130}}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{opacity: fadeOut, width: 100, height: 100}}
                  />
                )}
              </View>

              <View style={styles.secondaryContainer}>
                {this.state.loading && <ActivityIndicator />}

                <Text style={styles.error}>{this.state.error}</Text>

                <Text style={styles.label}>EMAIL:</Text>
                <Input
                  placeholder="askjeevesmum@hotmail.com"
                  onChangeText={text => this.onChangeText('username', text)}
                  value={this.state.username}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
                <Text style={styles.label}>PASSWORD:</Text>
                <Input
                  placeholder="Password1234"
                  onChangeText={text => this.onChangeText('password', text)}
                  value={this.state.password}
                  secureTextEntry
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
                <View style={{margin: 5}}></View>
                <Button
                  title="SIGN IN"
                  onPress={this.signIn}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Forgot')}>
                  <Text style={styles.textStyle}>Forgot password?</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => this.googSignIn()}
                    style={[
                      {backgroundColor: colors.GOOGLE},
                      styles.socialButtonStyle,
                    ]}>
                    <Ionicons
                      style={styles.socialIconStyle}
                      name="logo-google"
                    />
                    <Text style={styles.socialButtonText}>
                      Login with Google
                    </Text>
                  </TouchableOpacity> */}

                <Button
                  title="Register"
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />

                <Button
                  title="LogIn with Facebook*"
                  onPress={this.fbSignIn}
                  style={{backgroundColor: colors.FACEBOOK}}
                  logo="logo-facebook"
                />
                <Text style={styles.noPostStyle}>
                  * This app won't post anything to your facebook page!
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  user: state.user,
  profile: state.profile,
}))(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemStyle: {
    marginBottom: 6,
  },
  iconStyle: {
    color: colors.TEXT,
    fontSize: 20,
    marginRight: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.TEXT,
    padding: 6,
    marginVertical: 5,
    borderRadius: 7,
    marginHorizontal: 20,
  },
  socialButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginVertical: 4,
    borderRadius: 7,
    marginHorizontal: 35,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BACKGROUND,
  },
  socialButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
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
    margin: 7,
    color: colors.TEXT,
    textDecorationLine: 'underline',
  },
  noPostStyle: {
    alignSelf: 'center',
    fontStyle: 'italic',
    fontSize: 14,
    paddingHorizontal: 30,
    margin: 7,
    color: 'black',
    textAlign: 'center',
    marginTop: -1,
  },
  close: {
    position: 'absolute',
    left: 20,
    top: isAndroid ? 14 : 40,
    zIndex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: '10%',
    //   fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 10,
    color: 'black',
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
    flex: 1.6,
    paddingTop: 20,
    alignItems: 'center',
  },
});
