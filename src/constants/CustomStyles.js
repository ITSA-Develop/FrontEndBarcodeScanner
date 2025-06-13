import {StyleSheet} from 'react-native';
import {sh} from '../utils/herlpers';
import {GRIS_CLARO} from './Colors';

export const GS = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
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
    padding: sh(2),
    borderRadius: 5,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: GRIS_CLARO,
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
