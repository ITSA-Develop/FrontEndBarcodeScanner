import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import CustomHeader from '../../components/Layout/Header';
import ModalDocumentsData from '../../components/ScannerDataWedge/Modals/ModalDocumentsData';
import Icon from '../../constants/Icons';
import {GRIS_OSCURO} from '../../constants/Colors';

const DispatchScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dataDespachos = [
    {id: '1', key: 'Item 1', value: 'Value 1'},
    {id: '2', key: 'Item 2', value: 'Value 2'},
    {id: '3', key: 'Item 3', value: 'Value 3'},
    {id: '4', key: 'Item 4', value: 'Value 4'},
    {id: '5', key: 'Item 5', value: 'Value 5'},
  ];

  return (
    <View style={GS.container}>
      <CustomHeader title="Despachos" />
      <View style={styles.containerBtnsFilter}>
        <View style={styles.containerBtnFilter}>
          <TouchableOpacity
            style={GS.btnTypeInputRow}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: GRIS_OSCURO}}>
              {selectedItem ? selectedItem.key : 'Seleccionar Despacho'}
            </Text>
            <Icon
              library="AntDesign"
              name="down"
              size={20}
              color={GRIS_OSCURO}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBtnFilter}>
          <TouchableOpacity
            style={GS.btnTypeInputRow}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: GRIS_OSCURO}}>
              {selectedItem ? selectedItem.key : 'Seleccionar producto'}
            </Text>
            <Icon
              library="AntDesign"
              name="down"
              size={20}
              color={GRIS_OSCURO}
            />
          </TouchableOpacity>
        </View>
      </View>
      {modalVisible && dataDespachos.length > 0 && (
        <ModalDocumentsData
          visible={modalVisible} // Control modal visibility
          onClose={() => setModalVisible(false)} // Handle modal close
          onSelect={(item) => {
            setSelectedItem(item);
          }} // Handle item selection
          selectedValue={selectedItem} // Currently selected value
          data={dataDespachos}
        />
      )}
    </View>
  );
};

export default DispatchScreen;

const styles = StyleSheet.create({
  containerBtnsFilter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerBtnFilter: {
    padding: 5,
  },
});
