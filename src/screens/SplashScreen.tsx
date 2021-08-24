import React, {Component} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {colors, getProfile, UtilService, width} from '../Config';
import Auth from '@aws-amplify/auth';
import {connect} from 'react-redux';
import {compose, graphql} from 'react-apollo';
import {AllJokesByDate} from '../customGraphQL/queries';
interface Props {
  item: any;
  listOfJokes: any;
  navigation: any;
  fetchJokes: any;
  jokes: any;
}
class Splash extends Component<Props, any> {
  static navigationOptions = () => ({
    title: 'Splash',
    header: null,
  });

  animatedValue: Animated.Value;
  animatedValue2: Animated.Value;
  unsubscribeStore: any;

  constructor(props: Props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
  }

  componentDidMount() {
    SplashScreen.hide();
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 4,
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.animatedValue2, {
      toValue: 1,
      delay: 200,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    this.checkUser();
  }

  checkUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.props.navigation.navigate('Main');
        console.log('Cognito: ', user);
      })
      .catch(error => {
        this.props.navigation.navigate('Main');
        console.log('no user', error.message);
      });
  };

  render() {
    const truckStyle = {
      transform: [{scale: this.animatedValue}],
    };

    const scaleText = {
      transform: [{scale: this.animatedValue2}],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.ring, truckStyle]}>
          <Animated.Image
            source={require('../assets/img/splashduck.png')}
            style={[
              {
                resizeMode: 'contain',
                width: 200,
                height: 200,
              },
            ]}
          />
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 20,
              width: width / 2,
              height: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
            },
            scaleText,
          ]}
        />
      </View>
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
  graphql(AllJokesByDate, {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        date: {le: UtilService.getDateTime2(new Date())},
        queryName: 'Joke',
        sortDirection: 'DESC',
        user: getProfile(),
      },
    }),
    props: props => ({
      jokesByDate: props.data.jokesByDate ? props.data.jokesByDate.items : [],
      nextToken: props.data.jokesByDate
        ? props.data.jokesByDate.nextToken
        : null,
      jokeCount: props.data.jokesByDate && props.data.jokesByDate.items.length,
      userjokes: props.data.jokesByDate
        ? props.data.jokesByDate.items.filter(
            item => item.userLike.items.length > 0,
          )
        : [],
      data: props.data,
      onFetchMore: (nextToken: any) => {
        return props.data.fetchMore({
          variables: {
            date: {le: UtilService.getDateTime2(new Date())},
            queryName: 'Joke',
            sortDirection: 'DESC',
            user: getProfile(),
            nextToken: nextToken,
          },
          updateQuery: (previousResult, {fetchMoreResult}) => ({
            ...previousResult,
            jokesByDate: {
              ...previousResult.jokesByDate,
              ...fetchMoreResult.jokesByDate,
              items: [
                ...previousResult.jokesByDate.items,
                ...fetchMoreResult.jokesByDate.items,
              ],
            },
            nextToken: fetchMoreResult.jokesByDate.nextToken,
          }),
        });
      },
    }),
  }),
);

export default enhance(Splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
  },
  ring: {
    backgroundColor: '#fff',
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#FFF',
    padding: 7,
  },
});
