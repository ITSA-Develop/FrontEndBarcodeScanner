import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import Header from '../../components/Layout/Header';
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header title="Despachos" />
      <TouchableOpacity
        style={GS.btnPrimary}
        onPress={() => navigation.navigate('Invoices')}>
        <Text style={GS.btnTextPrimary}>Despachar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
