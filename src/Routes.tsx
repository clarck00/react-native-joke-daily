import React from 'react';

import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { createStackNavigator } from 'react-navigation-stack';

import { width, colors } from './Config';

import SideMenu from './components/SideMenu';
import ListScreen from './screens/ListScreen';
import ItemScreen from './screens/ItemScreen';
import FaveScreen from './screens/FaveScreen';
import AboutScreen from './screens/AboutScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotScreen from './screens/ForgotScreen';
import ProfileScreen from './screens/ProfileScreen';
import SubmitScreen from './screens/SubmitScreen';
import Splash from './screens/SplashScreen';

interface Props {
	navigationProps: any;
}

const ItemStack = createStackNavigator(
	{
		Item: {
			screen: ItemScreen
		}
	},
	{
		//   inititalRouteName: 'Item',
	}
);

const ListStack = createStackNavigator(
	{
		List: {
			screen: ListScreen
		}
	},
	{
		//   inititalRouteName: 'Item',
	}
);

const FaveStack = createStackNavigator(
	{
		Fave: {
			screen: FaveScreen
		}
	},
	{
		//  inititalRouteName: 'Item',
	}
);

const AboutStack = createStackNavigator(
	{
		About: {
			screen: AboutScreen
		}
	},
	{
		//   initialRouteName: 'About',
	}
);

const SubmitStack = createStackNavigator(
	{
		About: {
			screen: SubmitScreen
		}
	},
	{
		//   initialRouteName: 'Submit',
	}
);

const SignerStack = createStackNavigator(
	{
		SignIn: { screen: SignInScreen },
		SignUp: { screen: SignUpScreen },
		Forgot: { screen: ForgotScreen }
	},
	{
		initialRouteName: 'SignIn'
	}
);

const AuthSwitch = createSwitchNavigator(
	{
		NotSigned: { screen: SignerStack },
		Signed: { screen: ProfileScreen }
	},
	{
		initialRouteName: 'NotSigned'
	}
);

const DrawerNav = createDrawerNavigator(
	{
		'Joke Swiper': {
			screen: ItemStack,
			navigationOptions: {}
		},
		'Joke List': {
			screen: ListStack,
			navigationOptions: {}
		},
		Faves: {
			screen: FaveStack,
			navigationOptions: {}
		},
		About: {
			screen: AboutStack,
			navigationOptions: {}
		},
		Submit: {
			screen: SubmitStack,
			navigationOptions: {}
		},
		Auth: {
			screen: AuthSwitch,
			navigationOptions: {
				//   header: null
			}
		}

		// About: {screen: AboutScreen},
	},
	{
		contentComponent: (props) => <SideMenu {...props} />,
		drawerBackgroundColor: colors.BACKGROUND,
		drawerWidth: width - 30,
		initialRouteName: 'Joke Swiper'
	}
);

const MainSwitch = createSwitchNavigator(
	{
		Splash: { screen: Splash },
		Main: { screen: DrawerNav }
	},
	{
		initialRouteName: 'Splash'
	}
);

export default MainSwitch;

// const RootStack = createAppContainer(MainSwitch);

// export default RootStack;
