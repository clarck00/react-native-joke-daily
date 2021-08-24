import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import Auth from '@aws-amplify/auth';
import {Toast} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// REDUX
import {connect} from 'react-redux';
import {store, updateProfile} from '../store';
import {colors, height, normalize, isAndroid} from '../Config';
import Button from '../components/Button';
import Input from '../components/Input';
const logo = require('../assets/img/logoround.png');

interface Props {
  navigation: any;
}
class ProfileScreen extends Component<Props, any> {
  static navigationOptions = {
    title: 'Sign In',
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
      name: '',
      premium: '',
      username: '',
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

  signOut = async () => {
    Auth.signOut()
      .then(data => {
        console.log(data);
        Toast.show({
          text: 'Signed Out!',
          textStyle: styles.modalText,
          duration: 2000,
          style: styles.modal,
        });
      })
      .catch(err => console.log(err));
    this.props.navigation.navigate('Joke Swiper');
  };

  changeUserDetails = async () => {
    Keyboard.dismiss();
    this.setState({loading: true, error: ''});
    const {name} = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.updateUserAttributes(user, {
          name: name,
        });
      })
      .then(data => {
        this.setState({loading: false});
        this.props.navigation.navigate('Joke Swiper');
        console.log('name changed ok', data);
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error changing details: ', err);
        } else {
          console.log('Error changing details: ', err.message);
        }
      })
      .catch(err => {
        console.log('Error maate ', err);
      });
  };

  undoPurchase = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.updateUserAttributes(user, {
          ['custom:cogpremium']: '',
        });
      })
      .then(data => this.savePremiumSuccess(data))
      .catch(err => {
        if (!err.message) {
          console.log('Error changing premium: ', err);
        } else {
          console.log('Error changing premium: ', err.message);
        }
      });
    this.showToast('success');
  };

  changeUserDetailsName = async () => {
    Keyboard.dismiss();
    this.setState({loading: true, error: ''});
    const {name} = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.updateUserAttributes(user, {
          name: name,
        });
      })
      .then(data => this.saveNameSuccess(data))

      .catch(err => {
        if (!err.message) {
          console.log('Error changing details: ', err);
        } else {
          console.log('Error changing details: ', err.message);
        }
      });
    //   this.showToast('success');
  };

  saveNameSuccess(data) {
    console.log('saved user profile', data);
    this.setState({loading: false});
    store.dispatch(updateProfile({name: this.state.name}));
    this.props.navigation.navigate('Joke Swiper');
  }

  savePremiumSuccess(data) {
    console.log('saved user premium', data);
    store.dispatch(updateProfile({['custom:cogpremium']: null}));
  }

  render() {
    let {fadeOut, fadeIn, isHidden} = this.state;
    const {profile} = this.props;
    const username =
      profile.name === undefined ? 'Enter your name' : profile.name;
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
                    style={{opacity: fadeIn, width: 170, height: 170}}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{opacity: fadeOut, width: 100, height: 100}}
                  />
                )}
              </View>

              <View style={styles.secondaryContainer}>
                <Text style={styles.text}>Email: {profile.email}</Text>
                <View style={{margin: 5}}></View>

                {this.state.loading && <ActivityIndicator />}

                <Text style={styles.error}>{this.state.error}</Text>
                <Text style={styles.label}>USERNAME:</Text>
                <Input
                  placeholder={username}
                  onChangeText={text => this.onChangeText('name', text)}
                  value={this.state.name}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
                <View style={{margin: 5}}></View>

                <Button
                  title="SAVE PROFILE"
                  onPress={this.changeUserDetailsName}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />

                <Button
                  title="SIGN OUT"
                  onPress={this.signOut}
                  style={{backgroundColor: colors.BUTTON}}
                  logo={null}
                />

                {/* <Text style={styles.textHeaderStyle}>Your Account is {premium}</Text> */}

                {/*                   <TouchableOpacity
                    onPress={() => this.undoPurchase()}>
                    <Text style={styles.textStyle}>Undo Premium</Text>
                    </TouchableOpacity> */}
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
}))(ProfileScreen);

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
    flex: 0.7,
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
    top: isAndroid ? 14 : 40,
    zIndex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: '10%',
    //   fontWeight: 'bold',
    letterSpacing: 2,
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
    paddingTop: 20,
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
    fontSize: normalize(14),
    color: colors.TEXT,
  },
});
