import * as React from 'react';
import {View, StyleSheet, Text, FlatList, SafeAreaView} from 'react-native';
import {compose, graphql} from 'react-apollo';
import {AllJokesByDate} from '../customGraphQL/queries';
import {connect} from 'react-redux';
import {
  UtilService,
  colors,
  normalize,
  width,
  height,
  getProfile,
  topstyles
} from '../Config';
import FastImage from 'react-native-fast-image';
import { ItemScreenMenuButton } from '../components/ItemScreenMenuButton';

interface AppProps {
  navigation: any;
  userjokes: any
}
class FaveScreen extends React.Component<AppProps, any> {
  static navigationOptions = {
    title: 'Faves',
    header: null,
  };
  constructor(props: AppProps) {
    super(props);
    this.state = {
      jokes: [],
    };
  }

  ListEmptyComponent = () => (
    <View style={{padding: 10}}>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontFamily: 'Raleway-Regular',
          fontSize: 19,
          marginTop: 30,
        }}>
        Like some jokes and they'll show up here...
      </Text>
    </View>
  );

  FlatListItemSeparator = () => <View style={styles.line} />;

  renderHeader = () => (
    <View>
      <Text style={styles.title}>FAVOURITES</Text>
    </View>
  );

  renderItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    const setup = item.jokeSetup.replace(/[\n\r]/g, '');
    const punchline = item.jokePunchline.replace(/[\n\r]/g, '');
    return (
      <View
        key={item.key}
        style={{flex: 1, padding: 5, flexDirection: 'row', marginRight: 5}}>
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 7}}>
          <FastImage
            style={{
              width: width / 7,
              height: width / 7,
              borderRadius: 30,
              margin: 4,
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
        </View>

        <View
          style={{
            flex: 5,
            marginLeft: 22,
          }}>
          <Text style={styles.jokeText}>{setup}</Text>
          <Text style={styles.jokeText}>{punchline}</Text>
          <View>
            {item.comedian !== '-' && (
              <Text style={styles.comedianText}>{item.comedian}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{backgroundColor: colors.BACKGROUND, flex: 1}}>
        <SafeAreaView style={{}}>
        <View style={topstyles.topButtons}>
        <ItemScreenMenuButton
          onPressButton={() => this.props.navigation.openDrawer()}
        />
      </View>
          <View style={{marginTop: 30}}>
            <FlatList
              data={this.props.userjokes}
              keyExtractor={(item, index) => item.id.toString()}
              initialNumToRender={3}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListEmptyComponent={this.ListEmptyComponent}
              ListHeaderComponent={this.renderHeader}
              extraData={this.props}
              scrollEnabled={true}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

// const userSub = this.props.profile.sub

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

export default enhance(FaveScreen);

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
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Mistral',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
  },
  line: {
    height: 0.5,
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  jokeText: {
    color: 'black',
    fontFamily: 'WalterTurncoat-Regular',
    fontSize: normalize(15)
  },
  comedianText: {
    color: 'black',
    fontFamily: 'RockSalt-Regular',
    fontSize: normalize(13),
    textAlign: 'right',
    //   marginTop: 2,
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
  }
});
