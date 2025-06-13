import {Dimensions, Platform, NativeModules} from 'react-native';
const {width, height} = Dimensions.get('window');

// Get safe area insets
const getSafeAreaInsets = () => {
  if (Platform.OS === 'ios') {
    return NativeModules.SafeAreaInsets?.getSafeAreaInsets() || {bottom: 0};
  }
  return {bottom: 0};
};

// Get physical button height (if any)
const getPhysicalButtonHeight = () => {
  if (Platform.OS === 'android') {
    // For Android, we can check if the device has physical buttons
    // This is a basic implementation, you might need to adjust based on your needs
    return NativeModules.DeviceInfo?.hasPhysicalButtons ? 48 : 0;
  }
  return 0;
};

export const sh = (percentage) => {
  const safeArea = getSafeAreaInsets();
  const physicalButtonHeight = getPhysicalButtonHeight();
  const validHeight = height - safeArea.bottom - physicalButtonHeight;
  return (validHeight * percentage) / 100;
};

export const sw = (percentage) => (width * percentage) / 100;
