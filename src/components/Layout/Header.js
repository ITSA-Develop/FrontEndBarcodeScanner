import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../constants/Icons';
import {sh} from '../../utils/herlpers';
const CustomHeader = ({title, viewGoBack = false, viewSave = false}) => {
  const navigate = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        {viewGoBack && (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Icon library="AntDesign" name="left" size={20} color="black" />
          </TouchableOpacity>
        )}
        <Text style={GS.titleBlack}>{title}</Text>
        {viewSave && (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Icon library="FontAwesome5" name="save" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: sh(7),
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
});
