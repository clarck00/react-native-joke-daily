import React from 'react';
import { StyleSheet } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

class AppToast extends React.Component {
	onRef = (ref: any) => {
		const { refProp } = this.props;
		refProp && refProp(ref);
	};

	render() {
		const { textStyle, ...props } = this.props;
		return <Toast ref={this.onRef} style={styles.toast} textStyle={[ styles.toastText, textStyle ]} {...props} />;
	}
}

const styles = StyleSheet.create({
	toast: {
		bottom: 54,
		maxWidth: '80%',
		borderRadius: 14,
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	toastText: {
		textAlign: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
		color: '#f8f8f8'
	}
});

export default AppToast;
