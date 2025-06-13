import {StyleSheet} from 'react-native';
import {sh} from '../utils/herlpers';

export const GS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnPrimary: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnTextPrimary: {
    color: 'white',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  btnTextSecondary: {
    color: 'black',
    fontSize: 16,
  },
  btnTypeInputRow: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    height: sh(8),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  titleBlack: {
    color: 'black',
    fontSize: 16,
  },
  titleWhite: {
    color: 'white',
    fontSize: 16,
  },
});
