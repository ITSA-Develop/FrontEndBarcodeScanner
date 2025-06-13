import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GS} from '../../constants/CustomStyles';
import CustomHeader from '../../components/Layout/Header';
import ModalDocumentsData from '../../components/ScannerDataWedge/Modals/ModalDocumentsData';
import Icon from '../../constants/Icons';
import {GRIS_OSCURO} from '../../constants/Colors';
import RNDataWedgeIntentDemo from '../../utils/RNDataWedgeIntentDemo';
import {sw} from '../../utils/herlpers';

const DispatchScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModalProductos, setOpenModalProductos] = useState(false);
  const [selectedItemProducto, setSelectedItemProducto] = useState(null);

  const dataDespachos = [
    {id: '1', key: 'Despacho 14520', value: 'Value 1'},
    {id: '2', key: 'Despacho 24521', value: 'Value 2'},
    {id: '3', key: 'Despacho 34522', value: 'Value 3'},
    {id: '4', key: 'Despacho 44523', value: 'Value 4'},
    {id: '5', key: 'Despacho 54524', value: 'Value 5'},
  ];

  const dataProductos = [
    {id: '1', desId: '1', key: 'Producto 1', value: 'Value 1'},
    {id: '2', desId: '1', key: 'Producto 2', value: 'Value 2'},
    {id: '3', desId: '2', key: 'Producto 3', value: 'Value 3'},
    {id: '4', desId: '3', key: 'Producto 4', value: 'Value 4'},
    {id: '5', desId: '3', key: 'Producto 5', value: 'Value 5'},
  ];

  const dataProductsFiltered = useMemo(() => {
    return dataProductos.filter((item) => item.desId === selectedItem?.id);
  }, [selectedItem, dataProductos]);

  return (
    <View style={GS.container}>
      <CustomHeader title="Despachos" viewGoBack={true} viewSave={true} />
      <View style={styles.containerBtnsFilter}>
        <View style={styles.containerBtnFilter}>
          <TouchableOpacity
            style={GS.btnTypeInputRow}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: GRIS_OSCURO, fontSize: sw(3.5)}}>
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
            onPress={() => setOpenModalProductos(true)}>
            <Text
              style={{color: GRIS_OSCURO, fontSize: sw(3.5)}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {selectedItemProducto
                ? selectedItemProducto.key
                : 'Seleccionar producto'}
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
      <RNDataWedgeIntentDemo />
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
      {openModalProductos && (
        <ModalDocumentsData
          visible={openModalProductos} // Control modal visibility
          onClose={() => setOpenModalProductos(false)} // Handle modal close
          onSelect={(item) => {
            setSelectedItemProducto(item);
          }} // Handle item selection
          selectedValue={selectedItemProducto} // Currently selected value
          data={dataProductsFiltered}
        />
      )}
    </View>
  );
};

export default DispatchScreen;

const styles = StyleSheet.create({
  containerBtnsFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
  },
  containerBtnFilter: {
    padding: 5,
    width: '50%',
  },
});
