import { IProduct } from '@/interface/IProduct';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const mockProducts = [
  { productoName: 'Producto 1', codigo: 'P001' },
  { productoName: 'Producto 2', codigo: 'P002' },
  { productoName: 'Producto 3', codigo: 'P003' },
  { productoName: 'Producto 4', codigo: 'P004' },
];

interface IModalSelectedPro {
  isVisible: boolean;
  productSelected: IProduct | null;
  onClose: () => void;
  onSelectProduct: (product: IProduct) => void;
}

export const ModalSelectedPro = ({
  isVisible,
  productSelected,
  onClose,
  onSelectProduct,
}: IModalSelectedPro) => {
  const [searchText, setSearchText] = useState('');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(
      (product) =>
        product.productoName.toLowerCase().includes(searchText.toLowerCase()) ||
        product.codigo.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const renderItem = ({ item }: { item: IProduct }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onSelectProduct?.(item);
        onClose?.();
      }}
    >
      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={styles.productName}>{item.productoName}</Text>
        <Text style={styles.productCode}>{item.codigo}</Text>
      </View>
      {productSelected?.codigo === item.codigo && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="checkbox-outline" size={24} color="green" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Buscar producto..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.codigo}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'rgb(236, 248, 255)',
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCode: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
