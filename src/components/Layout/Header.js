import React from 'react';
import {View, Text} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const Header = ({title}) => {
  return (
    <View style={GS.header}>
      <Text style={GS.titleBlack}>{title}</Text>
      <Icon name="home-outline" size={30} color="#000" />
    </View>
  );
};

export default Header;
