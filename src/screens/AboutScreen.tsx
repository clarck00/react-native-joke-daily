import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Linking,
  ScrollView,
} from 'react-native';
import {colors, normalize, isAndroid} from '../Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  navigation: any;
}

const aboutText: string = `We have nothing to offer but blood, toil, tears and jokes`;

class AboutScreen extends Component<Props, any> {
  static navigationOptions = () => ({
    title: 'About',
    header: null,
  });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={styles.close}
          hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
          onPress={() => this.props.navigation.navigate('Joke Swiper')}>
          <Ionicons name={'ios-arrow-back'} size={30} color={colors.TEXT} />
        </TouchableHighlight>
        <ScrollView
        // style={styles.scrollView}
        >
          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{marginRight: 15, marginTop: 20}}>
              <Text style={styles.title}>{' ABOUT '}</Text>
            </View>

            <Text style={[styles.smallT, {marginHorizontal: 12}]}>
              {aboutText}
            </Text>

            <Text style={[styles.smallT, {marginTop: 30}]}>
              {'View our '}
              <Text
                style={styles.small}
                onPress={() =>
                  Linking.openURL('https://www.dailyjokeapp.com/privacy.html')
                }>
                {'privacy policy'}
              </Text>
              {' or our '}

              <Text
                style={styles.small}
                onPress={() =>
                  Linking.openURL(
                    'https://www.dailyjokeapp.com/termsandconditions.html',
                  )
                }>
                {'terms and conditions'}
              </Text>
            </Text>

            <Text
              style={[
                {
                  fontSize: 20,
                  marginTop: 20,
                  color: 'white',
                  textDecorationLine: 'underline',
                },
              ]}
              onPress={() => Linking.openURL('https://www.dailyjokeapp.com/')}>
              {'www.dailyjokeapp.com'}
            </Text>

            <Text style={styles.question}>
              {'contact us at team@dailyjokeapp.com'}
            </Text>
          </View>

          <View
            style={{
              padding: 20,
            }}>
            <Text style={styles.title}>FAQ's</Text>
            <View
              style={{
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.question}>Who are you?</Text>

              <Text style={styles.answer}>
                A group of comedy nerds who love jokes and also know how to make
                apps (kind of)
              </Text>
              <Text style={styles.question}>
                I'm a comedian, how can I get my joke on here?
              </Text>

              <Text style={styles.answer}>
                Go to "submit a joke" on the side menu and pop it in there
              </Text>

              <Text style={styles.question}>
                I'm a comedian, I don't want my joke on here or you got it wrong
                and I want you to change it
              </Text>

              <Text style={styles.answer}>
                No problem, that can happen since our content is user generated.{' '}
                {'\n'}Just drop us an email and we'll sort it.
              </Text>

              <Text style={styles.question}>
                I really wish this app had a cool feature...
              </Text>

              <Text style={styles.answer}>
                Let us know!{'\n'}Send us an email, all suggestions are welcome
                - this app is brand new and we are developing it all the time
              </Text>

              <Text style={styles.question}>
                What's better for my mental wellbeing, this app or a meditation
                app?
              </Text>

              <Text style={styles.answer}>This.</Text>
              <Text style={styles.question}>
                I love this app, how can I show it?
              </Text>

              <Text style={styles.answer}>
                Please give us a good rating on the app store - you can access
                it directly from the side menu by pressing 'Rate us'
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },

  title: {
    fontSize: 30,
    fontFamily: 'Raleway-Bold',
    textTransform: 'uppercase',
    padding: 4,
    paddingVertical: 10,
    paddingTop: 20,
    textAlign: 'center',
    color: colors.TEXT,
  },
  note: {
    color: colors.WHITE,
    marginBottom: 18,
    marginTop: 18,
    fontSize: 15,
    textAlign: 'center',
  },

  small: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: colors.TEXT,
    fontFamily: 'CourierNewPSMT',
  },

  smallT: {
    textAlign: 'center',
    fontSize: normalize(20),
    fontWeight: '300',
    color: colors.TEXT,
    margin: 7,
    fontFamily: 'CourierNewPSMT',
  },
  close: {
    position: 'absolute',
    left: 20,
    top: isAndroid ? 14 : 40,
    zIndex: 1,
  },
  question: {
    fontFamily: 'Raleway-Bold',
    color: colors.TEXT,
    fontSize: 17,
    marginTop: 10,
  },
  answer: {
    fontFamily: 'Raleway-Regular',
    color: colors.TEXT,
    fontSize: 16,
    marginVertical: 3,
  },
});
