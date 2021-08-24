
import 'react-native-gesture-handler'
import {AppRegistry, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

  YellowBox.ignoreWarnings([
    '`-[RCTRootView',
    'Remote debugger is ',
    'Warning: componentWillMount',
    'Warning: componentWillReceiveProps ',
    'Warning: componentWillUpdate is deprecated',
    'Warning: ViewPagerAndroid has been',
    'Module RCTImageLoader requires',
  ]);

AppRegistry.registerComponent(appName, () => App);
