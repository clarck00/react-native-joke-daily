import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Animated,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, normalize, isAndroid} from '../Config';
import Button from '../components/Button';
import Input from '../components/Input';
const logo = require('../assets/img/logoround.png');

interface Props {
  navigation: any;
  user: any;
}
class SignUpScreen extends Component<Props, any> {
  static navigationOptions = () => ({
    title: 'SignUp',
    header: null,
  });
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      fadeIn: new Animated.Value(0), // Initial value for opacity is: 0
      fadeOut: new Animated.Value(1), // Initial value for opacity: 1
      isHidden: false,
      modalVisible: false,
      authCode: '',
      loading: false,
      error: '',
      status: '',
    };
  }
  // Get user input
  onChangeText = (key: any, value: any) => {
    this.setState({[key]: value});
  };
  // Methods for logo animation
  componentDidMount() {
    this.fadeIn();
  }
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
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    this.setState({isHidden: false});
  }

  // Sign up user with AWS Amplify Auth
  signUp = async () => {
    Keyboard.dismiss()
    this.setState({loading: true, error: ''});
    const {username, password} = this.state;
    // rename variable to conform with Amplify Auth field phone attribute
    if (username && password) {
      await Auth.signUp({
        username,
        password,
      })
        .then(data => {
          this.setState({
            loading: false,
            status: 'User confirmation pending...',
          });
          console.log(data);
          Alert.alert(
            'Check your email and grab the confirmation code',
          );
        })
        .catch(err => {
          if (!err.message) {
            this.setState({loading: false});
            console.log('Error when signing up: ', err);
            Alert.alert('Error when signing up: ', err);
          } else {
            this.setState({loading: false, error: err.message});
            console.log('Error when signing up: ', err.message);
            Alert.alert('Error when signing up: ', err.message);
          }
        });
    } else {
      this.setState({loading: false, error: 'Complete missing fields.'});
    }
  };
  // Confirm users and redirect them to the SignIn page
  confirmSignUp = async () => {
    Keyboard.dismiss()
    const {username, authCode} = this.state;
    if (this.state.authCode) {
      await Auth.confirmSignUp(username, authCode)
        .then(() => {
          this.props.navigation.navigate('SignIn');
          Alert.alert(
            'done - now login here with that username and password',
          );
        })
        .catch(err => {
          if (!err.message) {
            console.log('Error when entering confirmation code: ', err);
            Alert.alert('Error when entering confirmation code: ', err);
          } else {
            console.log('Error when entering confirmation code: ', err.message);
            Alert.alert('Error when entering confirmation code: ', err.message);
          }
        });
    } else {
      this.setState({loading: false, error: 'Passcode is required.'});
    }
  };
  // Resend code if not received already
  resendSignUp = async () => {
    const {username} = this.state;
    if (username) {
    await Auth.resendSignUp(username)
      .then(() => console.log('Confirmation code resent successfully'))
      .catch(err => {
        if (!err.message) {
          console.log('Error requesting new confirmation code: ', err);
          Alert.alert('Error requesting new confirmation code: ', err);
        } else {
          console.log('Error requesting new confirmation code: ', err.message);
          Alert.alert('Error requesting new confirmation code: ', err.message);
        }
      });
  }}
  render() {
    let {fadeOut, fadeIn, isHidden} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={styles.close}
          hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
          onPress={() => this.props.navigation.goBack()}>
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
                {this.state.loading && <ActivityIndicator />}
                <Text style={this.state.error ? styles.error : styles.status}>
                {this.state.error}
                {this.state.status}
              </Text>

                {/* username section  */}
                <Text style={styles.label}>EMAIL:</Text>
                <Input
                  placeholder="askjeevesmum@gmail.com"
                  onChangeText={text => this.onChangeText('username', text)}
                  value={this.state.username}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />

                {/*  password section  */}

                <Text style={styles.label}>PASSWORD:</Text>
                <Input
                  placeholder="Password123"
                  onChangeText={text => this.onChangeText('password', text)}
                  value={this.state.password}
                  secureTextEntry
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
                <View style={{margin: 2}}></View>
                <Button
                  title="SIGN UP"
                  onPress={this.signUp}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />
                <View style={{margin: 4}}></View>

                {/* code confirmation section  */}

                <Text style={styles.label}>CONFIRMATION CODE:</Text>
                <Input
                  placeholder="123456"
                  onChangeText={text => this.onChangeText('authCode', text)}
                  value={this.state.authCode}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />

                <Button
                  title="CONFIRM SIGN UP"
                  onPress={this.confirmSignUp}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />
                <Button
                  title="RESEND CODE"
                  onPress={this.resendSignUp}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.TEXT,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: colors.BACKGROUND,
  },
  itemStyle: {
    marginBottom: 8,
  },
  iconStyle: {
    color: colors.TEXT,
    fontSize: 22,
    marginRight: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.TEXT,
    padding: 7,
    marginBottom: 10,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BACKGROUND,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  small: {
    textDecorationLine: 'underline',
    fontSize: normalize(12),
    color: colors.WHITE,
  },
  smallT: {
    fontSize: normalize(12),
    color: colors.WHITE,
    marginTop: normalize(15),
  },
  close: {
    position: 'absolute',
    left: 20,
    top: isAndroid ? 14 : 40,
    zIndex: 1,
  },
  status: {
    marginTop: 10,
    paddingHorizontal: '10%',
    color: 'green',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
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
    letterSpacing: 2,
    fontSize: 12,
  },
  secondaryContainer: {
    flex: 1.7,
    paddingTop: 20,
    alignItems: 'center',
  },
});

export default SignUpScreen;
