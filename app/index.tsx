import BarcodeScannerScreen from '@/components/BarcodeScanner/BarcodeScannerScreen';
import { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DataWedgeIntents from 'react-native-datawedge-intents';
import { Ionicons } from '@expo/vector-icons';
interface ScannedCode {
    codigo: string;
    orden: number;
}

export default function HomeScreen() {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedCodes, setScannedCodes] = useState<ScannedCode[]>([]);

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



    const toggleScanner = async () => {
        try {
            const newState = !isScanning;
            setIsScanning(newState);

            // Enviamos el comando para activar/desactivar el scanner
            await DataWedgeIntents.sendBroadcastWithExtras({
                action: "com.symbol.datawedge.api.ACTION",
                extras: {
                    "com.symbol.datawedge.api.SCANNER_INPUT_PLUGIN": newState ? "ENABLE_PLUGIN" : "DISABLE_PLUGIN",
                    "com.symbol.datawedge.api.SOFT_SCAN_TRIGGER": "TOGGLE_SCANNING"
                }
            });

            console.log(newState ? 'Scanner activado' : 'Scanner desactivado');
        } catch (error) {
            console.error('Error al toggle scanner:', error);
        }
    };

    const handleDelete = (index: number) => {
        setScannedCodes(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logística ITSA</Text>

            {/* Botón para activar/desactivar el escáner */}
            <TouchableOpacity
                style={[styles.button, isScanning ? styles.buttonActive : null]}
                onPress={toggleScanner}
            >
                <Text style={styles.buttonText}>
                    {isScanning ? 'Detener Escáner' : 'Iniciar Escáner'}
                </Text>
            </TouchableOpacity>

            {/* Lista de códigos escaneados */}
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>
                    Códigos Escaneados ({scannedCodes.length})
                </Text>
                <ScrollView style={styles.scrollView}>
                    {scannedCodes.map((code, index) => (
                        <View key={index} style={styles.codeItem}>
                            <Text style={styles.codeText}>{code.codigo}</Text>
                            <TouchableOpacity onPress={() => handleDelete(index)}>
                                <Ionicons name="trash" size={32} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {scannedCodes.length === 0 && (
                        <Text style={styles.emptyText}>No hay códigos escaneados</Text>
                    )}
                </ScrollView>
            </View>

            {/* El escáner siempre está presente pero solo se activa con el botón */}
            <BarcodeScannerScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        width: '80%',
        marginBottom: 20,
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
        padding: 15,
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
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 20,
    },
});
