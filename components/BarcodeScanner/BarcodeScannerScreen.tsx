import { useEffect } from "react";
import { Alert, DeviceEventEmitter } from "react-native";
import DataWedgeIntents from 'react-native-datawedge-intents';

const DATAWEDGE_ACTION = 'com.logisticauno.ACTION';

export default function BarcodeScannerScreen() {
    useEffect(() => {
        console.log('Iniciandejecutanod');
        let mounted = true;

        const initializeDataWedge = async () => {
            try {
                console.log('Iniciando configuración de DataWedge...');

                // Esperamos un momento para asegurarnos que el módulo esté inicializado
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Registramos el receiver para los scans
                DataWedgeIntents.registerBroadcastReceiver({
                    filterActions: [
                        DATAWEDGE_ACTION,
                        'com.symbol.datawedge.api.RESULT_ACTION'
                    ],
                    filterCategories: [
                        'android.intent.category.DEFAULT'
                    ]
                });

                // Configuramos el listener para los eventos de escaneo
                console.log('Configurando listener de DataWedge...');
                const scanListener = DeviceEventEmitter.addListener('datawedge_broadcast_intent', (intent) => {
                    console.log('DataWedge - Intent recibido:', JSON.stringify(intent, null, 2));
                    
                    if (!mounted) {
                        console.log('Componente desmontado, ignorando datos');
                        return;
                    }

                    // Los datos del escaneo vienen en intent.extrasñ
                    if (intent.extras && intent.extras.hasOwnProperty('com.symbol.datawedge.data_string')) {
                        const scannedData = intent.extras['com.symbol.datawedge.data_string'];
                        console.log('Código escaneado:', scannedData);
                        Alert.alert('Código escaneado', scannedData);
                    }
                });

                // Configuración básica de DataWedge
                const profileConfig = {
                    PROFILE_NAME: "LogisticaUNO",
                    PROFILE_ENABLED: "true",
                    CONFIG_MODE: "UPDATE",
                    PLUGIN_CONFIG: {
                        PLUGIN_NAME: "BARCODE",
                        RESET_CONFIG: "true",
                        PARAM_LIST: {
                            scanner_selection: "auto",
                            scanner_input_enabled: "true",
                            scanner_hardware_trigger: "true",
                            scanner_hardware_trigger_keycode: "103",
                            decoder_code128: "true",
                            decoder_qr_code: "true"
                        }
                    }
                };

                // Enviamos la configuración del perfil
                await DataWedgeIntents.sendBroadcastWithExtras({
                    action: "com.symbol.datawedge.api.ACTION",
                    extras: {
                        "com.symbol.datawedge.api.CREATE_PROFILE": "LogisticaUNO",
                        "com.symbol.datawedge.api.PROFILE_CONFIG": JSON.stringify(profileConfig)
                    }
                });

                // Configuramos el intent output
                const intentConfig = {
                    PROFILE_NAME: "LogisticaUNO",
                    PROFILE_ENABLED: "true",
                    CONFIG_MODE: "UPDATE",
                    PLUGIN_CONFIG: {
                        PLUGIN_NAME: "INTENT",
                        RESET_CONFIG: "true",
                        PARAM_LIST: {
                            intent_output_enabled: "true",
                            intent_action: DATAWEDGE_ACTION,
                            intent_delivery: "2",
                            intent_use_content_provider: "false"
                        }
                    }
                };

                await DataWedgeIntents.sendBroadcastWithExtras({
                    action: "com.symbol.datawedge.api.ACTION",
                    extras: {
                        "com.symbol.datawedge.api.SET_CONFIG": JSON.stringify(intentConfig)
                    }
                });

                console.log('Configuración de DataWedge completada');

                return () => {
                    if (!mounted) return;
                    console.log('Limpiando configuración de DataWedge...');
                    scanListener.remove();
                };
            } catch (err) {
                console.warn('Error durante la inicialización de DataWedge:', err);
                console.log('Error detallado:', JSON.stringify(err, null, 2));
            }
        };

        initializeDataWedge();

        return () => {
            mounted = false;
        };
    }, []);

    return null;
}
