import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { store } from './store';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { default as newnorm } from 'react-native-normalize';

export const { width, height } = Dimensions.get('window');
export const pixelRatio = PixelRatio.get();

export const isAndroid = Platform.OS === 'android';

const admobappid_ios = 'ca-app-pub-7544815451272285~7812526436';
const admobappid_android = 'ca-app-pub-7544815451272285~2142888049';

export const admobFullId = isAndroid ? admobappid_android : admobappid_ios;

const interstatialAndroid = 'ca-app-pub-7544815451272285/5257750949';
const interstatialIOS = 'ca-app-pub-7544815451272285/7946783025';

export const admobInterstatialId = isAndroid ? interstatialAndroid : interstatialIOS;

const admobbannerid_ios = 'ca-app-pub-7544815451272285/5914665994';
const admobbannerid_android = 'ca-app-pub-7544815451272285/1811769458';

export const admobBannerId = isAndroid ? admobbannerid_android : admobbannerid_ios;

export const colors = {
	BACKGROUND: 'rgba(144,210,216, 1)',
	PRIMARY: 'rgba(246,166,178, 1)',
	SECONDARY: 'rgba(255,236,184, 1)',
	THREE: 'rgba(183,222,210, 1)',
	FOUR: 'rgba(247,194,151, 1)',
	FIVE: 'rgba(255,236,184, 1)',
	TEXT: '#111212',
	TEXTGREY: '#4a4a4a',
	LIGHTGREY: '#f0f0f0',
	CARDBACKGROUND: '#ffecb8',
	SIDEMENU: '#ffecb8',
	BUTTON: '#011829',
	GOOGLE: '#DD4B39',
	FACEBOOK: '#3A5998',
	WHITE: '#ffffff',
	BLACK: '#000000'
};

export const cardMarginBottom = isAndroid ? newnorm(130, 'height') : newnorm(115, 'height');
export const cardMarginTop = getStatusBarHeight(true) * 0.75 + newnorm(50, 'height');

export const topstyles = StyleSheet.create({
	topButtons: {
		flex: 1,
		position: 'absolute',
		top: getStatusBarHeight(true) * 0.5 + newnorm(10, 'height'),
		alignSelf: 'center',
		width: width - 2,
		flexDirection: 'row',
		paddingVertical: 2,
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});

export class UtilService {
	static getDateTime(date) {
		let d = new Date(date);
		let today = new Date();

		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};

		let current_date = padWithZero(d.getDate()) + '/' + padWithZero(d.getMonth() + 1) + '/' + d.getFullYear();
		d.setDate(today.getDate());
		let yesterday = padWithZero(d.getDate() - 1) + '/' + padWithZero(d.getMonth() + 1) + '/' + d.getFullYear();
		let today_date =
			padWithZero(today.getDate()) + '/' + padWithZero(today.getMonth() + 1) + '/' + today.getFullYear();

		if (current_date === today_date) {
			return 'Today';
		} else if (current_date === yesterday) {
			return 'Yesterday';
		} else {
			return current_date;
		}
	}

	////////////////////////
	///// date systeme /////
	////////////////////////
	static getDateTime2(date) {
		let d = new Date(date);
		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return d.getFullYear() + '-' + padWithZero(d.getMonth() + 1) + '-' + padWithZero(d.getDate());
	}

	static getHourMinutes(date) {
		let dd = new Date(date);
		let h = dd.getHours(),
			m = dd.getMinutes();
		let AP = ' AM';
		if (h > 12) {
			h = h - 12;
			AP = ' PM';
		}
		return h + '' + AP;
	}

	static getDay(date) {
		let dd = new Date(date);
		let h = dd.getDay();
		console.log('what is day ', h);
		if (h == 0) {
			AP = ' Sunday ';
		}
		if (h == 1) {
			AP = ' Monday ';
		}
		if (h == 2) {
			AP = ' Tuesday ';
		}
		if (h == 3) {
			AP = ' Wednesday ';
		}
		if (h == 4) {
			AP = ' Thursday ';
		}
		if (h == 5) {
			AP = ' Friday ';
		}
		if (h == 6) {
			AP = ' Saturday ';
		}
		return AP;
	}
}

const scale = width / 320;

export function normalize(size: number) {
	const newSize = size * scale;
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize));
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
	}
}

export function getProfile() {
	// grab current state
	const state = store.getState();
	if (state.profile.sub !== undefined) {
		return state.profile.sub;
	}
	return 'NO_USER';
}
