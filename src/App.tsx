import React, {Component} from 'react';
import {Alert, AppState} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
// APPSYNC / AMPLIFY
import {ApolloProvider} from 'react-apollo';
import {Rehydrated} from 'aws-appsync-react';
import Amplify, {Auth} from 'aws-amplify';
import {MemoryStorage} from '@aws-amplify/core';
import AWSAppSyncClient, {AUTH_TYPE} from 'aws-appsync';
import config from './aws-exports';
// REDUX STUFF
import {Provider} from 'react-redux';
import {store, AmplifyBridge} from './store';

// import RootStack from './Routes';
import Loading from '../src/components/Loading';
import {Root} from 'native-base';

import NavigationService from './NavigationService';
import {createAppContainer} from 'react-navigation';
import MainSwitch from './Routes';
import {zeroIndex, needRefresh} from './actions';
import firebase from 'react-native-firebase';
import {admobFullId} from './Config';

firebase.admob().initialize(admobFullId);
// firebase.admob().openDebugMenu() 


const MEMORY_KEY_PREFIX = '@MyStorage:';
let dataMemory = {};

/** @class */
class MyStorage {
  static syncPromise = null;
  /**
   * This is used to set a specific item in storage
   */
  static setItem(key: string, value: string) {
    AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  /**
   * This is used to get a specific key from storage
   */
  static getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined;
  }

  /**
   * This is used to remove an item from storage
   */
  static removeItem(key) {
    AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key);
    return delete dataMemory[key];
  }

  /**
   * This is used to clear the storage
   */
  static clear() {
    dataMemory = {};
    return dataMemory;
  }

  /**
   * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
   */
  static sync() {
    if (!MemoryStorage.syncPromise) {
      MemoryStorage.syncPromise = new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys);
          const memoryKeys = keys.filter(key =>
            key.startsWith(MEMORY_KEY_PREFIX),
          );
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) rej(err);
            stores.map((result, index, store) => {
              const key = store[index][0];
              const value = store[index][1];
              const memoryKey = key.replace(MEMORY_KEY_PREFIX, '');
              dataMemory[memoryKey] = value;
            });
            res();
          });
        });
      });
    }
    return MemoryStorage.syncPromise;
  }
}

Amplify.configure(config);

Auth.configure({
  storage: MyStorage,
});

Auth.currentCredentials()
  .then(d => console.log('data: ', d))
  .catch(e => console.log('error: ', e));

new AmplifyBridge(store);

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint as string,
  region: config.aws_appsync_region as string,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
  offlineConfig: {
    storage: AsyncStorage,
  },
});

export interface AppProps {
  changeIndex: any;
}

const RootStack = createAppContainer(MainSwitch);

class App extends Component<AppProps, any> {
  notificationListener: any;
  notificationOpenedListener: any;
  messageListener: any;
  navigator: any;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();

    console.log('root admob.......', admobFullId)
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      //    this.showAlert('Your Firebase Token is:', fcmToken);
      //    console.log('Your Firebase Token is:', fcmToken);
    } else {
      //    console.log('Failed', 'No token received');
    }
  };

  requestPermission = async () => {
    try {
      setTimeout(
        async () => await firebase.messaging().requestPermission(),
        18000,
      );
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase.notifications().onNotification(() => {
      //   const {title, body} = notification;
      //    store.dispatch(needRefresh());
      //   store.dispatch(zeroIndex());
      console.log('Notifications received in foreground');
    });

    /*
     * If app is in background, listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(() => {
        //      const {title, body} = notificationOpen.notification;
        store.dispatch(needRefresh());
        store.dispatch(zeroIndex());
        NavigationService.navigate('Joke Swiper', {});
        //      this.showAlert(title, body);
        console.log('notification opened whilst app in background');
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      store.dispatch(needRefresh());
      store.dispatch(zeroIndex());
      NavigationService.navigate('Joke Swiper', {});
      //    const {title, body} = notificationOpen.notification;
      //      this.showAlert(title, body);
      console.log('closed app opened by notification open');
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  public render() {
    return (
      <ApolloProvider client={client as any}>
        <Rehydrated
          render={({rehydrated}) =>
            rehydrated ? (
              <Provider store={store as any}>
                <SafeAreaProvider>
                  <Root>
                    <RootStack
                      ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                      }}
                    />
                  </Root>
                </SafeAreaProvider>
              </Provider>
            ) : (
              <Loading />
            )
          }></Rehydrated>
      </ApolloProvider>
    );
  }
}

export default App;
