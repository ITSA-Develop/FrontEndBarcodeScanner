import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Header = ({title, viewGoBack = false}) => {
  const navigate = useNavigation();
  return (
    <View style={GS.header}>
      <View style={styles.titleContainer}>
        {viewGoBack && (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Icon name="caret-back-circle" size={30} color="#000" />
          </TouchableOpacity>
        )}
        <Text style={GS.titleBlack}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
