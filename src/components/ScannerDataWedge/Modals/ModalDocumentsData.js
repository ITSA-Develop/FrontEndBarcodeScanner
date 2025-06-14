import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ModalDocumentsData = ({
  visible,
  onClose,
  onSelect,
  selectedValue,
  data = [],
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(selectedValue);
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.key.toLowerCase().includes(searchText.toLowerCase()) ||
        item.value.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, data]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    onSelect?.(item);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchText}
            onChangeText={setSearchText}
            showSoftInputOnFocus={false}
          />
          <FlatList
            data={filteredData}
            ListEmptyComponent={
              <View style={styles.containerNoData}>
                <Text style={styles.noDataText}>Sin resultados</Text>
              </View>
            }
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  selectedItem?.id === item.id && styles.selectedItem,
                ]}
                onPress={() => handleItemPress(item)}>
                <Text style={styles.itemKey}>{item.key}</Text>
                <Text style={styles.itemValue}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '95%',
    maxHeight: '95%',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  itemKey: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerNoData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default ModalDocumentsData;
