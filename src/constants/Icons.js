import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const IconLibraries = {
  AntDesign,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
};

const Icon = ({
  library = 'MaterialCommunityIcons',
  name,
  size = 24,
  color = 'black',
  ...props
}) => {
  const IconComponent = IconLibraries[library];

  if (!IconComponent) {
    console.warn(
      `Icon library "${library}" not found. Using MaterialCommunityIcons as fallback.`,
    );
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        {...props}
      />
    );
  }

  return <IconComponent name={name} size={size} color={color} {...props} />;
};

export default Icon;
