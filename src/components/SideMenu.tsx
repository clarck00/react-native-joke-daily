import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {colors, normalize, width} from '../Config';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rate, {AndroidMarket} from 'react-native-rate';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import {ItemScreenMenuButton} from './ItemScreenMenuButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {default as newnorm} from 'react-native-normalize';
import NavigationService from '../NavigationService';

export interface SideMenuProps {
  navigation: any;
  profile: any;
}

class SideMenu extends Component<SideMenuProps, any> {
  constructor(props: SideMenuProps) {
    super(props);
    this.state = {
      rated: false,
    };
  }

  signOut = async () => {
    Auth.signOut()
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const {profile} = this.props;
    const username = profile.name === undefined ? profile.email : profile.name;
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.topButtons}>
          <ItemScreenMenuButton
            onPressButton={() => this.props.navigation.closeDrawer()}
          />
        </View>

        <View style={styles.itemsContainer}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                //            this.props.navigation.navigate('Joke Swiper', {cardIndex: 0})
                NavigationService.closeDrawer();
                this.props.navigation.navigate('Joke Swiper');
              }}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Icon name="cards-outline" style={styles.icon} />
                </View>
              </View>
              <Text style={styles.sectionHeadingStyle}>Joke Cards</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                NavigationService.closeDrawer();
                this.props.navigation.navigate('Joke List');
              }}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons name="ios-list" style={styles.icon} />
                </View>
              </View>
              <Text style={styles.sectionHeadingStyle}>List</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                NavigationService.closeDrawer();
                this.props.navigation.navigate('Faves');
              }}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons name="ios-thumbs-up" style={styles.icon} />
                </View>
              </View>
              <Text style={styles.sectionHeadingStyle}>Faves</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.props.navigation.navigate('Submit')}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons name="ios-share" style={styles.icon} />
                </View>
              </View>
              <Text style={styles.sectionHeadingStyle}>{'Submit'}</Text>
            </TouchableOpacity>
          </View>

          {this.props.profile.sub ? (
            <>
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={[styles.menuItem, {}]}
                  onPress={() => this.props.navigation.navigate('Signed')}>
                  <View style={styles.iconContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Ionicons name="md-happy" style={styles.icon} />
                    </View>
                  </View>
                  <Text style={styles.sectionHeadingStyle}>
                    {'Logged in as'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Signed')}>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      marginLeft: normalize(65),
                      marginTop: normalize(-8),
                      color: 'black',
                    }}>
                    {username}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={[styles.menuItem, {}]}
                  onPress={() => this.props.navigation.navigate('NotSigned')}>
                  <View style={styles.iconContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Ionicons name="ios-person" style={styles.icon} />
                    </View>
                  </View>
                  <Text style={styles.sectionHeadingStyle}>{'Login'}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.props.navigation.navigate('About')}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons name="md-information" style={styles.icon} />
                </View>
              </View>
              <Text style={styles.sectionHeadingStyle}>{'About'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                let options = {
                  AppleAppID: '1461744227',
                  GooglePackageName: 'com.dailyjokeapp.dailyjoke',
                  preferredAndroidMarket: AndroidMarket.Google,
                  preferInApp: false,
                  openAppStoreIfInAppFails: true,
                  fallbackPlatformURL: 'https://dailyjokeapp.com/',
                };
                Rate.rate(options, success => {
                  if (success) {
                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                    this.setState({rated: true});
                  } else console.log('didnt rate');
                });
              }}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons name="ios-star" style={styles.icon} />
                </View>
              </View>
              <Text style={styles.sectionHeadingStyle}>Rate us </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SIDEMENU,
  },
  menuContainer: {
    flex: 1,
    //   backgroundColor: colors.BACKGROUND,
    left: 5,
    marginVertical: 4,
  },
  itemsContainer: {
    flex: 0.8,
    marginTop: normalize(50),
    marginLeft: normalize(5),
  },
  menuItem: {
    flexDirection: 'row',
  },
  iconContainer: {
    height: 50,
    width: 50,
  },
  icon: {
    textShadowColor: 'white',
    textShadowRadius: 3,
    //  textShadowOffset: { height: 2, width: -2 },
    color: 'black',
    fontSize: 40,
  },
  sectionHeadingStyle: {
    marginLeft: normalize(10),
    fontSize: normalize(18),
    lineHeight: normalize(35),
    fontFamily: 'WalterTurncoat-Regular',
    textTransform: 'uppercase',
    color: 'black',
    textAlignVertical: 'center',
    textShadowColor: 'white',
    textShadowRadius: 3,
  },
  topButtons: {
    flex: 1,
    //  backgroundColor: 'red',
    position: 'absolute',
    top: getStatusBarHeight(true) * 0.5 + newnorm(10, 'height'),
    alignSelf: 'center',
    width: width - 30,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default connect(state => ({
  profile: state.profile,
}))(SideMenu);
