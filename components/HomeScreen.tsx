import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarcodeScannerScreen } from './BarcodeScanner/BarcodeScannerScreen';

export function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logística UNO</Text>
            {/* El BarcodeScannerScreen se ejecutará en segundo plano */}
            <BarcodeScannerScreen />
            
            {/* Aquí puedes agregar más componentes de UI según necesites */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
}); 