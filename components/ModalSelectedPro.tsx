import { IProduct } from '@/interface/IProduct';
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

interface ModalSelectedProProps {
  isVisible: boolean;
  productSelected: IProduct | null;
  onClose: () => void;
  onSelectProduct: (product: IProduct) => void;
}

const mockProducts: IProduct[] = [
  { productoName: 'Producto 1', codigo: 'P001' },
  { productoName: 'Producto 2', codigo: 'P002' },
  { productoName: 'Producto 3', codigo: 'P003' },
  { productoName: 'Producto 4', codigo: 'P004' },
];
export const ModalSelectedPro: React.FC<ModalSelectedProProps> = ({
  isVisible,
  onClose,
  onSelectProduct,
  productSelected,
}) => {
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
        console.log('item =>', item);
        onSelectProduct(item);
        onClose();
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.productName}>{item.productoName}</Text>
      <Text style={styles.productCode}>{item.codigo}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar producto..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.codigo}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 56, 56, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
  flatList: {
    maxHeight: '80%',
  },
  flatListContent: {
    paddingVertical: 5,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'gray',
    marginVertical: 2,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
