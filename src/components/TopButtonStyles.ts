import { StyleSheet } from 'react-native';
import { colors } from '../Config';

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.TEXT,
    position: 'absolute',
    top: 0,
    fontSize: 28
  },
  text: {
    color: colors.TEXT,
    fontSize: 9,
    fontStyle: 'italic',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2
  },
});

export default styles;
