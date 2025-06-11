import BarcodeScannerScreen from '@/components/BarcodeScanner/BarcodeScannerScreen';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DeviceEventEmitter, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IProduct } from '@/interface/IProduct';
import { ModalSelectedPro } from '@/components/ModalSelectedPro';
import { Colors } from '@/constants/Colors';
interface ScannedCode {
  codigo: string;
  orden: number;
}

export default function HomeScreen() {
  const [scannedCodes, setScannedCodes] = useState<ScannedCode[]>([]);
  const [productSelected, setProductSelected] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const validateExistCode = useCallback((code: string) => {
    return scannedCodes.some(c => c.codigo === code);
  }, [scannedCodes]);

  const [lastScan, setLastScan] = useState<{ code: string; time: number } | null>(null);

  useEffect(() => {
    const scanSubscription = DeviceEventEmitter.addListener('barcode_scan', (intent) => {
      const scannedData = intent.data;

      if (!scannedData) {
        console.log('No se encontró código escaneado:', intent);
        return;
      }

      const now = Date.now();
      const recentDuplicate =
        lastScan &&
        lastScan.code === scannedData &&
        now - lastScan.time < 1000; // 1 segundo

      if (recentDuplicate) {
        console.log('Código ignorado por duplicado rápido:', scannedData);
        return;
      }

      if (validateExistCode(scannedData)) {
        console.log('Código ya escaneado (por estado):', scannedData);
        return;
      }

      setLastScan({ code: scannedData, time: now });

      setScannedCodes(prev => [{
        codigo: scannedData,
        orden: prev.length + 1
      }, ...prev]);
    });

    return () => {
      scanSubscription.remove();
    };
  }, [validateExistCode, lastScan]);


  const handleDelete = (index: number) => {
    setScannedCodes(prev => prev.filter((_, i) => i !== index));
  };

  const dataDiferentCodes = useMemo(() => {
    const uniqueCodes = new Set(scannedCodes.map(c => c.codigo));
    const res = Array.from(uniqueCodes).map(codigo => ({
      codigo,
      orden: scannedCodes.find(c => c.codigo === codigo)?.orden || 0
    }));
    const filterCode = res.filter(c => c.codigo.toLowerCase().includes(searchText.toLowerCase()));
    return filterCode;
  }, [scannedCodes, searchText]); // ← AQUI

  const handleSelectProduct = (product: IProduct) => {
    setProductSelected(product);
    setIsModalVisible(false);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logística ITSA</Text>
      <View style={styles.listTitleContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.button}>
          <Text style={styles.inputText}>{productSelected?.productoName || 'Seleccionar Producto'}</Text>
          <Ionicons name="chevron-down" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('dataDiferentCodes =>', dataDiferentCodes)} style={styles.saveButton}>
          <Ionicons name="save" size={24} color="rgb(102, 101, 101)" />
        </TouchableOpacity>
      </View>


      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          Códigos Escaneados ({dataDiferentCodes.length})
        </Text>
        <TextInput placeholder='Buscar código escaneado' style={styles.input} value={searchText} onChangeText={setSearchText} />
        <ScrollView style={styles.scrollView}>
          {dataDiferentCodes.map((code, index) => (
            <View key={index} style={styles.codeItem}>
              <Text style={styles.codeText} numberOfLines={1} ellipsizeMode="tail">
                {code.codigo}
              </Text>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Ionicons name="trash" size={32} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          {dataDiferentCodes.length === 0 && (
            <Text style={styles.emptyText}>No hay códigos escaneados</Text>
          )}
        </ScrollView>
      </View>

      {/* El escáner siempre está presente pero solo se activa con el botón */}
      <BarcodeScannerScreen />
      {isModalVisible && (
        <ModalSelectedPro
          isVisible={isModalVisible}
          productSelected={productSelected}
          onClose={() => setIsModalVisible(false)}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.bordePrimary,
    width: '80%',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputText: {
    color: 'rgb(102, 101, 101)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.bordePrimary,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
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
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.bordePrimary,
    width: '16%',
    marginRight: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
