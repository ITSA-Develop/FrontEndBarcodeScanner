import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import Header from '../../components/Layout/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="Logistica ITSA" />
      <View style={styles.btnsContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={GS.btnPrimary}
            onPress={() => navigation.navigate('Dispatch')}>
            <Text style={GS.btnTextPrimary}>Despachos</Text>
            <Octicons name="sign-out" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={GS.btnPrimary}
            onPress={() => navigation.navigate('Dispatch')}>
            <Text style={GS.btnTextPrimary}>Ingresos</Text>
            <Octicons name="sign-in" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={GS.btnPrimary}
            onPress={() => navigation.navigate('Dispatch')}>
            <Text style={GS.btnTextPrimary}>Facturas</Text>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  },
  btnContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    elevation: 5,
  },
});
