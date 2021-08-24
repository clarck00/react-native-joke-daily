import React, {Component} from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Animated,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, Item, Input} from 'native-base';
import Auth from '@aws-amplify/auth';
import {colors, isAndroid, height} from '../Config';

interface Props {
  navigation: any;
}
const logo = require('../assets/img/logoround.png');
const logoHeight = height / 2
class ForgotScreen extends Component<Props, any> {
  static navigationOptions = () => ({
    title: 'SignUp',
    header: null,
  });
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      authCode: '',
      newPassword: '',
      fadeIn: new Animated.Value(0), // Initial value for opacity: 0
      fadeOut: new Animated.Value(1), // Initial value for opacity: 1
      isHidden: false,
    };
  }
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
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  // Request a new password
  async forgotPassword() {
    const {username} = this.state;
    await Auth.forgotPassword(username)
      .then(data => console.log('New code sent', data))
      .catch(err => {
        if (!err.message) {
          console.log('Error while setting up the new password: ', err);
          Alert.alert('Error while setting up the new password: ', err);
        } else {
          console.log('Error while setting up the new password: ', err.message);
          Alert.alert('Error while setting up the new password: ', err.message);
        }
      })
      .then(() => {
        Alert.alert('Code sent - check your email');
      });
  }
  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const {username, authCode, newPassword} = this.state;
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        Alert.alert(
          'Success! You can now login with the new password you just provided',
        );
      })
      .then(() => {
        this.props.navigation.navigate('Login');
        console.log('the New password submitted successfully');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error while confirming the new password: ', err);
          Alert.alert('Error while confirming the new password: ', err);
        } else {
          console.log('Error while confirming the new password: ', err.message);
          Alert.alert('Error while confirming the new password: ', err.message);
        }
      });
  }
  render() {
    let {fadeOut, fadeIn, isHidden} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={styles.close}
          onPress={() => this.props.navigation.goBack()}>
          <Ionicons name={'ios-arrow-back'} size={30} color={colors.TEXT} />
        </TouchableHighlight>
        <StatusBar />

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
                    style={{opacity: fadeIn, width: 160, height: 167}}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{opacity: fadeOut, width: 160, height: 167}}
                  />
                )}
              </View>
              {/* Infos */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* Username */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-mail" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#fff"
                      keyboardType={'email-address'}
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={value =>
                        this.onChangeText('username', value)
                      }
                      onFocus={this.fadeOut.bind(this)}
                      onEndEditing={this.fadeIn.bind(this)}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.forgotPassword()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Send Code</Text>
                  </TouchableOpacity>
                  {/* the New password section  */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#fff"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('newPassword', value)
                      }
                      onFocus={this.fadeOut.bind(this)}
                      onEndEditing={this.fadeIn.bind(this)}
                    />
                  </Item>
                  {/* Code confirmation section  */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#fff"
                      keyboardType={'numeric'}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText('authCode', value)
                      }
                      onFocus={this.fadeOut.bind(this)}
                      onEndEditing={this.fadeIn.bind(this)}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.forgotPasswordSubmit()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Confirm the new password
                    </Text>
                  </TouchableOpacity>
                </View>
              </Container>
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
    backgroundColor: colors.SECONDARY,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  close: {
    position: 'absolute',
    left: 20,
    top: isAndroid ? 14 : 40,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: '#fff',
    fontSize: 28,
    marginRight: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.BUTTON,
    padding: 14,
    marginBottom: 20,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  socialIconStyle: {
    color: '#fff',
    fontSize: 22,
    marginRight: 10,
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

  socialButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: logoHeight - 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: logoHeight,
    bottom: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: colors.SECONDARY,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    padding: 0,
    marginBottom: 5,
    color: colors.TEXT,
    textDecorationLine: 'underline',
  },
});

export default ForgotScreen;
