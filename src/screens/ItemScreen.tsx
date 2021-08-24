import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  AppState,
  Vibration,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {compose, graphql} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-deck-swiper';
import {Toast} from 'native-base';
import normalize from 'react-native-normalize';
// GraphQL
import {AllJokesByDate} from '../customGraphQL/queries';
import {CreateJokeLike, DeleteJokeLike} from '../customGraphQL/mutations'
// Components
import LoadingCard from '../components/LoadingCard';
import FirstTimeModal from '../components/FirstTimeModal';
import LoginToLikeModal from '../components/LoginToLikeModal';
import {ItemScreenMenuButton} from '../components/ItemScreenMenuButton';
import {BackToStartButton} from '../components/BackToStartButton';
import SwipedAllCardsModal from '../components/SwipedAllCardsModal';
import {ShuffleButton} from '../components/ShuffleButton';
import Card from '../components/Card';
import {
  colors,
  height,
  width,
  UtilService,
  getProfile,
  cardMarginBottom,
  cardMarginTop,
  topstyles,
  admobBannerId,
  admobInterstatialId,
} from '../Config';

import {connect} from 'react-redux';
import {changeIndex, doneRefresh} from '../actions'
// FIREBASE
import firebase from 'react-native-firebase';
import { DrawerActions } from 'react-navigation-drawer';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
// const advert = firebase.admob().interstitial(admobInterstatialId);
// advert.loadAd(request.build());

interface Props {
  navigation: any;
  jokesByDate: any;
  data: any;
  profile: any;
  user: any;
  cardIndex: number;
  incrementIndex: any;
  changeIndex: any;
  decrementIndex: any;
  index: number;
}

class ItemScreen extends Component<Props, any> {
  static navigationOptions = {
    title: 'Item',
    header: null,
  };
  isAnimating: boolean | undefined;
  swiper: any;
  focusListener: any;
  blurListener: any;
  toast: any;
  willFocusListener: any;
  onShare: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isFolded: false,
      modalVisible: false,
      loginModalVisible: false,
      loading: false,
      appState: AppState.currentState,
      fadeAnim: new Animated.Value(0),
      isShuffled: false,
      shuffling: false,
      shuffleJokes: [],
    };
    this.isAnimating = false;
  }

  componentDidMount() {
    console.log('admob............................', admobBannerId)
    this.checkIfNeedOpenModal();
    this.stopAnimation();
    if (this.props.index.needRefresh) {
      this.props.changeIndex(0);
      this.stopAnimation();
      this.setState({
        loading: true,
      });
      this.props.doneRefresh();
      this.props.data.refetch();
      setTimeout(() => {
        this.setState({loading: false});
        this.swiper.jumpToCardIndex(0);
        this.startAnimation(3000);
      }, 1000);
      
    } 
    // advert.loadAd(request.build());
    // setTimeout(() => {
    //   if (advert.isLoaded()) {
    //     console.log('Interstatial Advert ready to show.');
    //     advert.show();
    //   } else {
    //     console.log('Unable to show interstitial - not loaded yet');
    //   }
    // }, 60000);

    this.focusListener = this.props.navigation.addListener(
      'didFocus',
       () => {
        if (this.state.loading){ return }
        this.setState({loading: true})  
    //    console.log('focused swiper screen');
        setTimeout(() => {
        this.setState({loading: false})  
        this.swiper.jumpToCardIndex(this.props.index.cardIndex);
        this.startAnimation(2000);
      }, 50);
      },
    );

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
  //    console.log('blurred swiper screen');
      this.stopAnimation();
    });
    // setInterval(() => this.autoSwipe(), 3000);
  }

  componentDidUpdate() {
    if (this.props.index.needRefresh) {
      this.stopAnimation();
      this.setState({
        loading: true,
      });
      this.props.doneRefresh();
      this.props.data.refetch();
      setTimeout(() => {
        this.setState({loading: false});
        this.props.changeIndex(0);
        this.swiper.jumpToCardIndex(0);
        this.startAnimation(3000);
      }, 1000);
    }
  }

  autoSwipe = () => {
    this.stopAnimation(); 
    this.swiper.swipeLeft();
    this.startAnimation(1000);
  };

  componentWillUnmount() {
    //  AppState.removeEventListener('change', this._handleAppStateChange);
    this.blurListener.remove();
    this.focusListener.remove();
  }

  setModalVisible(visible: boolean) {
    this.setState({modalVisible: visible});
  }

  checkIfNeedOpenModal = async () => {
    try {
      const isFirstOpen = await AsyncStorage.getItem('IS_FIRST_OPEN');
      if (!isFirstOpen || isFirstOpen !== 'true') {
        // Check if key IS_FIRST_OPEN doesnt have value or not 'true'
        // isFirstOpen is null or not 'true' so this is first time app open

        this.setModalVisible(true);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  saveModalOpen = async () => {
    try {
      await AsyncStorage.setItem('IS_FIRST_OPEN', 'true');
    } catch (error) {
      // Error saving data
    }
  };
  onModalShow = () => {
    this.saveModalOpen();
  };

  onStartSwipe = () => {
    this.stopAnimation();
  };

  onEndSwipe = () => {
    this.startAnimation(2500);
  };

  startAnimation = (delay: number) => {
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.isAnimating = false;
    });
  };

  stopAnimation = () => {
    if (this.isAnimating) {
      this.state.fadeAnim.stopAnimation();
    }
    this.state.fadeAnim.setValue(0);
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
  };

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

  onPressBack = () => {
    try {
      this.swiper.jumpToCardIndex(this.props.index.cardIndex - 1);
      this.props.changeIndex(this.props.index.cardIndex - 1);
    } catch (err) {
      console.log(err);
    }
  };

  onPressShuffle = () => {
    let randomNum = Math.floor(Math.random() * this.props.jokeCount);
    Vibration.vibrate(200);
    this.stopAnimation();
    this.setState({
      loading: true,
    });
    this.props.changeIndex(randomNum);

    setTimeout(() => {
      this.setState({loading: false});
      this.swiper.jumpToCardIndex(randomNum);
      this.startAnimation(2000);
    }, 300);
  };

  onPressBackToStart = async () => {
    this.stopAnimation();
    this.setState({
      isShuffled: false,
      loading: true,
    });
    this.props.changeIndex(0);
    setTimeout(() => {
      this.setState({loading: false});
      this.startAnimation(2000);
    }, 200);
  };

  renderCard = (item: any) => {
    if (!item) {
      return 
    }

    return (
      <View style={styles.card}>
        <Card
          item={item}
          onPressBack={this.onPressBack}
          onShare={this.onShare}
          toggleLike={this.toggleLike}
          fadeAnim={this.state.fadeAnim}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          {!this.props.jokesByDate || this.state.loading ? (
            <LoadingCard />
          ) : (
            <Swiper
              ref={(swiper: any) => {
                this.swiper = swiper;
              }}
              cards={
                !this.state.isShuffled
                  ? this.props.jokesByDate
                  : this.state.shuffleJokes
              }
              renderCard={this.renderCard}
              cardIndex={this.props.index.cardIndex}
              cardHorizontalMargin={6}
              cardVerticalMargin={0}
              marginBottom={cardMarginBottom}
              marginTop={cardMarginTop}
              //       keyExtractor={(item, index) => index.toString()}
              backgroundColor={colors.BACKGROUND}
              animateCardOpacity
              showSecondCard
              stackSize={3}
              disableBottomSwipe={true}
              disableTopSwipe={true}
              swipeAnimationDuration={50}
              swipeBackCard
              onSwipedAborted={this.onEndSwipe}
              dragStart={this.onStartSwipe}
              dragEnd={this.onEndSwipe}
              onSwipedAll={this.onSwipedAllCards}
          //    stackAnimationTension={80} // spring animation tension (speed) default 40
         //     stackAnimationFriction={10} // spring animation friction (bounciness), default is 7
              stackSeparation={normalize(12)}
              onSwipedRight={(cardIndex: any) => {
                this.props.changeIndex(cardIndex + 1);
              }}
              onSwipedLeft={(cardIndex: any) => {
                this.props.changeIndex(cardIndex + 1);
              }}
              animateOverlayLabelsOpacity></Swiper>
          )}

          <SwipedAllCardsModal
            onPress={() => {
              this.swiper.jumpToCardIndex(0);
              this.props.changeIndex(0);
              this.setState({swipedAllCards: false});
            }}
            isVisible={this.state.swipedAllCards}
          />
          <FirstTimeModal
            modalVisible={this.state.modalVisible}
            onModalShow={this.onModalShow}
            onPress={() => {
              this.stopAnimation();
              this.setState({modalVisible: false});
              this.startAnimation(2000);
            }}
          />

          <LoginToLikeModal
            loginModalVisible={this.state.loginModalVisible}
            onPressOK={() => {
              this.setState({loginModalVisible: false});
              this.props.navigation.navigate('NotSigned');
            }}
            onPressCancel={() => {
              this.setState({loginModalVisible: false});
            }}/>

          <View style={topstyles.topButtons}>
            <ItemScreenMenuButton
            onPressButton={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <ShuffleButton
              onPressButton={!this.state.loading ? this.onPressShuffle : null}
              //      onPressButton={() => this.setState({loading: !this.state.loading})}
            />

            <BackToStartButton
              onPressButton={
                !this.state.loading ? this.onPressBackToStart : null
              }
            />
          </View>
        </SafeAreaView>
        <View style={styles.advertContainer}>
          <Banner
            unitId={admobBannerId}
            size={'LARGE_BANNER'}
            request={request.build()}
            style={{alignSelf: 'center'}}
            onAdLoaded={() => {
              console.log('Advert loaded', admobBannerId);
            }}
            onAdFailedToLoad={result => {
              console.log('result~~~~~~~~~~~~~~', result);
              console.log('Ad failed to load', arguments);
            }}
          />
        </View>
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
    doneRefresh: () => {
      dispatch(doneRefresh());
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

export default enhance(ItemScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ababab',
    backgroundColor: 'white',
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
    height: 100,
  }
});
