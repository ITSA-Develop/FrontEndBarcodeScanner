import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import useDataWedge from './useDataWedge';

const RNDataWedgeIntentDemo = () => {
  const {debugInfo, scannedCodes, handleDelete} = useDataWedge();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.rowText}>Debug Info:</Text>
          <Text style={styles.debugText}>{debugInfo}</Text>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Códigos Escaneados ({scannedCodes.length})
          </Text>
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
  container: {
    flex: 1,
    height: Dimensions.get('window').height - 30,
    backgroundColor: 'white',
    padding: 2,
  },
  row: {
    margin: 5,
    flexDirection: 'column',
  },
  rowText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#555555',
    margin: 2,
  },
  debugText: {
    fontSize: 14,
    textAlign: 'left',
    color: '#FF0000',
    margin: 2,
    padding: 5,
    backgroundColor: '#FFE0E0',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  scrollView: {
    flex: 1,
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
    fontSize: 16,
    color: '#333',
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
