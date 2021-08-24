import { StyleSheet } from 'react-native';
import { normalize, width } from '../../Config';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'grey',
 //   paddingHorizontal: 10,
 //   paddingVertical: 7,
    width: width * 0.2,
    height: width * 0.1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginVertical: 4,
 //   borderRadius: 7,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(14),
    textAlign: 'center',
 //   fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Raleway-Regular'
  },
  iconStyle: {
    color: 'black',
    fontSize: normalize(40),
    marginRight: 10,
  },
});

export default styles;
