import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const sh = (percentage) => (height * percentage) / 100;
export const sw = (percentage) => (width * percentage) / 100;
