import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  width,
  UtilService,
  height,
  normalize,
  colors,
  getProfile,
  cardMarginTop,
  topstyles,
  admobBannerId,
} from '../Config';
import {graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';
import {FlatList} from 'react-navigation';
import {SearchBar} from 'react-native-elements';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import {Toast} from 'native-base';
import {changeIndex} from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginToLikeModal from '../components/LoginToLikeModal';
import {SearchJokes, AllJokesByDate} from '../customGraphQL/queries';
import {DeleteJokeLike, CreateJokeLike} from '../customGraphQL/mutations';
import ToggleSwitch from 'toggle-switch-react-native';

// FIREBASE
import firebase from 'react-native-firebase';
import {ItemScreenMenuButton} from '../components/ItemScreenMenuButton';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

interface Props {
  navigation: any;
  jokesByDate: any;
  onSearch: any;
  profile: any;
  user: any;
  cardIndex: number;
  incrementIndex: any;
  changeIndex: any;
  decrementIndex: any;
  index: number;
  data: any;
}

class ListScreen extends Component<Props, any> {
  static navigationOptions = {
    title: 'List',
    header: null,
  };
  focusListener: any;
  blurListener: any;
  willFocusListener: any;
  willBlurListener: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      refreshing: false,
      searchQuery: '',
      jokes: [],
      query: '',
      loginModalVisible: false,
      showPunchline: false,
      switchOn4: false,
    };
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
    //    console.log('focused search screen');
      },
    );
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur',
      () => {
    //    console.log('blurred search screen');
        this.props.onSearch('');
        this.setState({searchQuery: ''});
      },
    );
  }

  componentWillUnmount() {
    //  AppState.removeEventListener('change', this._handleAppStateChange);
    this.willFocusListener.remove();
    this.willBlurListener.remove();
  }

  toggleLike = (item: any) => {
    if (!this.props.profile.sub) {
      this.setState({loginModalVisible: true});
      return;
    }
    if (item.userLike.items.length === 0) {
      this.props.createJokeLike({
        id: this.props.profile.sub + '/' + item.id,
        jokeId: item.id,
        userId: this.props.profile.sub,
      });
      Toast.show({
        text: 'liked!',
        textStyle: styles.modalText,
        duration: 1000,
        style: styles.modal,
      });
    } else if (item.userLike.items.length !== 0) {
      this.props.deleteJokeLike({
        id: this.props.profile.sub + '/' + item.id,
        jokeId: item.id,
      });
      Toast.show({
        text: 'unliked!',
        textStyle: styles.modalText,
        duration: 1000,
        style: styles.modal,
      });
    }
  };

  FlatListItemSeparator = () => <View style={styles.line} />;

  ListEmptyComponent = () => (
    <View>
      <ActivityIndicator
        color={'white'}
        size={'large'}
        style={{
          paddingTop: 50,
        }}
      />
    </View>
  );
  updateSearch = (searchQuery: any) => {
    this.setState({searchQuery});
    this.handleFilter(searchQuery);
  };
  handleFilter = debounce(val => {
    this.props.onSearch(val);
  }, 250);

  handleLoadMore = () => {
    console.log('endoflistreached');
    this.props.nextToken && this.props.onFetchMore(this.props.nextToken);
    //   this.props.data.fetchMore()
  };

  renderItem = ({item}) => {
    const setup = item.jokeSetup.replace(/[\n\r]/g, '');
    const punchline = item.jokePunchline.replace(/[\n\r]/g, '');
    return (
      <View key={item.key} style={{}}>
        <TouchableOpacity
          onPress={() => {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const date = new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
            );
            const firstDate = new Date(date);
            const secondDate = new Date(item.date);
            const diffDays = Math.round(
              Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
            );
            console.log('list screen index dispatch', diffDays);
            this.props.onSearch('');
            this.setState({searchQuery: ''});
            this.props.changeIndex(diffDays);
            this.props.navigation.navigate('Joke Swiper');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <FastImage
              style={{
                width: width / 8,
                height: width / 8,
                borderRadius: 30,
                margin: 4,
                marginTop: 10,
              }}
              source={{
                uri:
                  'https://s3-' +
                  item.file.region +
                  '.amazonaws.com/' +
                  item.file.bucket +
                  '/' +
                  item.file.key,
                priority: FastImage.priority.normal,
                headers: {},
              }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View
              style={{
                flex: 5,
                marginVertical: 5,
                paddingLeft: 15,
              }}>
              <Text style={styles.jokeText}>
                {setup}
                {'... '}
              </Text>
              {this.state.showPunchline && (
                <Text style={styles.jokeText}>
                  {''}
                  {punchline}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <View style={{flexDirection: 'row-reverse'}}>
            <View style={{paddingHorizontal: 10}}>
              <TouchableOpacity
                hitSlop={{top: 30, left: 30, bottom: 30, right: 30}}
                onPress={() => this.toggleLike(item)}>
                <Icon
                  name="md-heart"
                  size={30}
                  style={{
                    color: item.userLike.items.length === 0 ? 'black' : 'red',
                    textShadowRadius: 3,
                    textShadowColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View>
              {item.comedian !== '-' && (
                <Text style={styles.comedianText}>{item.comedian}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {loading} = this.props.data;

    return (
      <View style={{backgroundColor: colors.BACKGROUND, flex: 1}}>
        <View style={{flex: 1}}>
          <View style={topstyles.topButtons}>
            <ItemScreenMenuButton
              onPressButton={() => this.props.navigation.openDrawer()}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <Text
                style={{
                  color: colors.TEXT,
                  fontSize: 12,
                }}>
                show punchlines?{' '}
              </Text>
              <ToggleSwitch
                isOn={this.state.showPunchline}
                onColor="green"
                offColor="red"
                //    label="show punchlines?"
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="small"
                onToggle={() =>
                  this.setState({showPunchline: !this.state.showPunchline})
                }
              />
            </View>
          </View>
          <View style={{marginTop: cardMarginTop - 15, flex: 0.9}}>
            <SearchBar
              lightTheme
              //    clearIcon
              placeholder="Search"
              containerStyle={{backgroundColor: 'transparent', marginTop: 20}}
              inputStyle={{backgroundColor: '#E9E9EF'}}
              onChangeText={text => this.updateSearch(text)}
              value={this.state.searchQuery}
            />
          </View>
          <View style={{flex: 6}}>
            <FlatList
              data={loading ? [] : this.props.jokesByDate}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={10}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListEmptyComponent={this.ListEmptyComponent}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              extraData={this.props}
              scrollEnabled={true}
            />
          </View>

          <LoginToLikeModal
            loginModalVisible={this.state.loginModalVisible}
            onPressOK={() => {
              this.setState({loginModalVisible: false});
              this.props.navigation.navigate('NotSigned');
            }}
            onPressCancel={() => {
              this.setState({loginModalVisible: false});
            }}
          />
        </View>
        <Banner
          unitId={admobBannerId}
          size={'SMART_BANNER'}
          request={request.build()}
          style={{alignSelf: 'center'}}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={result => {
            console.log('result~~~~~~~~~~~~~~', result);
            console.log('Ad failed to load', arguments);
          }}
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

const mapDispatchToProps = dispatch => {
  return {
    changeIndex: (index: number) => {
      dispatch(changeIndex(index));
    },
  };
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(AllJokesByDate, {
    options: () => ({
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
      onSearch: (searchQuery: any) => {
        searchQuery = searchQuery.toLowerCase();
        return props.data.fetchMore({
          query: searchQuery === '' ? AllJokesByDate : SearchJokes,
          variables: {
            searchQuery,
            date: {le: UtilService.getDateTime2(new Date())},
            queryName: 'Joke',
            sortDirection: 'DESC',
            user: getProfile(),
          },
          updateQuery: (previousResult, {fetchMoreResult}) => ({
            ...previousResult,
            jokesByDate: {
              ...previousResult.jokesByDate,
              items: fetchMoreResult.jokesByDate.items,
            },
          }),
        });
      },
    }),
  }),
  graphql(CreateJokeLike, {
    options: {
      update: (dataProxy, {data: {createJokeLike}}) => {
        const data = dataProxy.readQuery({
          query: AllJokesByDate,
          variables: {
            date: {le: UtilService.getDateTime2(new Date())},
            queryName: 'Joke',
            sortDirection: 'DESC',
            user: getProfile(),
          },
        });
        data.jokesByDate.items
          .filter(item => item.id === createJokeLike.jokeId)[0]
          .userLike.items.push(createJokeLike);
        //     data.listJokes.items.filter(item => item.id === createJokeLike.jokeId)[0].totalLikes.items.push(createJokeLike)

        dataProxy.writeQuery({
          query: AllJokesByDate,
          variables: {
            date: {le: UtilService.getDateTime2(new Date())},
            queryName: 'Joke',
            sortDirection: 'DESC',
            user: getProfile(),
          },
          data,
        });
      },
    },
    props: props => ({
      createJokeLike: (input: any) => {
        props.mutate({
          variables: input,
          optimisticResponse: () => ({
            __typename: 'Mutation',
            createJokeLike: {...input, __typename: 'JokeLike'},
          }),
        });
      },
    }),
  }),
  graphql(DeleteJokeLike, {
    options: {
      update: (dataProxy, {data: {deleteJokeLike}}) => {
        const data = dataProxy.readQuery({
          query: AllJokesByDate,
          variables: {
            date: {le: UtilService.getDateTime2(new Date())},
            queryName: 'Joke',
            sortDirection: 'DESC',
            user: getProfile(),
          },
        });
        data.jokesByDate.items
          .filter(item => item.id === deleteJokeLike.jokeId)[0]
          .userLike.items.pop(deleteJokeLike);
        dataProxy.writeQuery({
          query: AllJokesByDate,
          variables: {
            date: {le: UtilService.getDateTime2(new Date())},
            queryName: 'Joke',
            sortDirection: 'DESC',
            user: getProfile(),
          },
          data,
        });
      },
    },
    props: props => ({
      deleteJokeLike: (input: any) => {
        props.mutate({
          variables: input,
          optimisticResponse: () => ({
            deleteJokeLike: {...input, __typename: 'JokeLike'},
          }),
        });
      },
    }),
  }),
);
export default enhance(ListScreen);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
  },
  menu: {
    position: 'absolute',
    left: 20,
    top: 14,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
  },
  input: {
    height: 40,
    width: 300,
    padding: 7,
    fontSize: 15,
  },
  line: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  jokeText: {
    color: 'black',
    fontFamily: 'WalterTurncoat-Regular',
    fontSize: normalize(15),
    marginRight: 10,
  },
  comedianText: {
    color: 'black',
    fontFamily: 'RockSalt-Regular',
    fontSize: normalize(12),
    marginRight: 4,
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
  advertContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
});
