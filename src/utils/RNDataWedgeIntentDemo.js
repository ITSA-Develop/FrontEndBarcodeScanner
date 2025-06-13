import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import useDataWedge from '../../useDataWedge';
import {sh, sw} from './herlpers';

const RNDataWedgeIntentDemo = () => {
  const {debugInfo, scannedCodes, handleDelete} = useDataWedge();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.containerTitleScan}>
            <View
              style={
                debugInfo === 'Esperando por escaner...'
                  ? styles.statusScanWaiting
                  : styles.statusScanOk
              }>
              <Text>{}</Text>
            </View>
            <Text style={styles.listTitle}>
              Códigos Escaneados ({scannedCodes.length})
            </Text>
          </View>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.inputShareCode}
              placeholder="Termino de busqueda"
              showSoftInputOnFocus={false}
            />
          </View>
          <ScrollView style={styles.scrollView}>
            {scannedCodes.map((code, index) => (
              <View key={index} style={styles.codeItem}>
                <Text
                  style={styles.codeText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {code.codigo}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDelete(index)}
                  style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))}
            {scannedCodes.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay códigos escaneados</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTitleScan: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  containerInput: {
    width: '100%',
    paddingBottom: 5,
  },
  inputShareCode: {
    width: '100%',
    backgroundColor: 'white',
    height: sh(7.5),
    fontSize: sw(3.5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  statusScanOk: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    width: 10,
    height: 10,
  },
  statusScanWaiting: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    width: 10,
    height: 10,
  },
  container: {
    flex: 1,
    height: sh(77),
    backgroundColor: 'white',
    marginTop: sh(-2),
  },
  row: {
    margin: 2,
    flexDirection: 'column',
  },
  rowText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#555555',
    margin: 2,
  },
  debugTextWaiting: {
    fontSize: 10,
    textAlign: 'left',
    margin: 2,
    padding: 5,
    borderRadius: 5,
    color: '#FF0000',
    backgroundColor: '#FFE0E0',
  },
  debugTextReady: {
    fontSize: 10,
    textAlign: 'left',
    color: 'green',
    margin: 2,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(197, 255, 192)',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
  },
  codeItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  codeText: {
    fontSize: sw(6),
    color: 'black',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default RNDataWedgeIntentDemo;

//   <View style={styles.row}>
//   <Text style={styles.rowText}>Último escaneo: {lastScanTime}</Text>
// </View>

// <View style={styles.row}>
//   <Text style={styles.rowText}>Datos escaneados: {barcodeData}</Text>
// </View>

// <View style={styles.row}>
//   <Text style={styles.rowText}>Tipo de código: {barcodeType}</Text>
// </View>

// <View style={styles.row}>
//   <Text style={styles.rowText}>Fuente: {barcodeSource}</Text>
// </View>
