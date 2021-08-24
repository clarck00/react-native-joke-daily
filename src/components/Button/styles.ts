import {StyleSheet} from 'react-native';
import {normalize, colors, width} from '../../Config';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.BUTTON,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: normalize(7),
    width: width * 0.8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Raleway-Regular',
  },
  iconStyle: {
    color: '#fff',
    fontSize: 19,
    marginRight: 10,
  },
});

export default styles;
