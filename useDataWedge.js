import {useState, useEffect, useCallback, useRef} from 'react';
import DataWedgeIntents from 'react-native-datawedge-intents';
import {DeviceEventEmitter} from 'react-native';

const DATAWEDGE_ACTION = 'com.logisticaitsa.ACTION';

const useDataWedge = () => {
  const isMounted = useRef(true);
  const lastScanRef = useRef(null);
  const [state, setState] = useState({
    enumeratedScanners: 'Scanners will appear here',
    barcodeLabelType: '',
    barcodeData: '',
    barcodeSource: '',
    lastScanTime: '',
    debugInfo: 'Esperando por escaner...',
    scannedCodes: [],
  });

  const initializeDataWedge = useCallback(async () => {
    try {
      console.log('Iniciando configuración de DataWedge...');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      DataWedgeIntents.registerBroadcastReceiver({
        filterActions: [
          DATAWEDGE_ACTION,
          'com.symbol.datawedge.api.RESULT_ACTION',
        ],
        filterCategories: ['android.intent.category.DEFAULT'],
      });

      console.log('Configurando listener de DataWedge...');
      const scanListener = DeviceEventEmitter.addListener(
        'datawedge_broadcast_intent',
        (intent) => {
          if (!isMounted.current) return;

          //   console.log(
          //     'DataWedge - Intent recibido:',
          //     JSON.stringify(intent, null, 2),
          //   );
          const scannedData =
            intent['com.motorolasolutions.emdk.datawedge.data_string'];
          if (scannedData) {
            const now = Date.now();
            const recentDuplicate =
              lastScanRef.current &&
              lastScanRef.current.code === scannedData &&
              now - lastScanRef.current.time < 1000;

            if (recentDuplicate) {
              console.log('Código ignorado por duplicado rápido:', scannedData);
              return;
            }

            lastScanRef.current = {code: scannedData, time: now};

            setState((prevState) => ({
              ...prevState,
              barcodeData: scannedData,
              lastScanTime: new Date().toLocaleTimeString(),
              scannedCodes: [
                {
                  codigo: scannedData,
                  orden: prevState.scannedCodes.length + 1,
                },
                ...prevState.scannedCodes,
              ],
              debugInfo: 'Scan successful: ' + scannedData,
            }));
          }
        },
      );

      const profileConfig = {
        PROFILE_NAME: 'Logapp',
        PROFILE_ENABLED: 'true',
        CONFIG_MODE: 'UPDATE',
        PLUGIN_CONFIG: {
          PLUGIN_NAME: 'BARCODE',
          RESET_CONFIG: 'true',
          PARAM_LIST: {
            scanner_selection: 'auto',
            scanner_input_enabled: 'true',
            scanner_hardware_trigger: 'true',
            scanner_hardware_trigger_keycode: '103',
            decoder_code128: 'true',
            decoder_qr_code: 'true',
          },
        },
        APP_LIST: [
          {
            PACKAGE_NAME: 'com.itsa.logistica',
            ACTIVITY_LIST: ['*'],
          },
        ],
      };

      await DataWedgeIntents.sendBroadcastWithExtras({
        action: 'com.symbol.datawedge.api.ACTION',
        extras: {
          'com.symbol.datawedge.api.CREATE_PROFILE': 'Logapp',
          'com.symbol.datawedge.api.SET_CONFIG': profileConfig,
        },
      });

      const intentConfig = {
        PROFILE_NAME: 'Logapp',
        PROFILE_ENABLED: 'true',
        CONFIG_MODE: 'UPDATE',
        PLUGIN_CONFIG: {
          PLUGIN_NAME: 'INTENT',
          RESET_CONFIG: 'true',
          PARAM_LIST: {
            intent_output_enabled: 'true',
            intent_action: DATAWEDGE_ACTION,
            intent_delivery: '2',
            intent_use_content_provider: 'false',
          },
        },
      };

      await DataWedgeIntents.sendBroadcastWithExtras({
        action: 'com.symbol.datawedge.api.ACTION',
        extras: {
          'com.symbol.datawedge.api.SET_CONFIG': JSON.stringify(intentConfig),
        },
      });

      if (isMounted.current) {
        setState((prevState) => ({
          ...prevState,
          debugInfo: 'Escaner listo',
        }));
      }
      //console.log('Configuración de DataWedge completada');

      return scanListener;
    } catch (err) {
      console.warn('Error durante la inicialización de DataWedge:', err);
      console.log('Error detallado:', JSON.stringify(err, null, 2));
      if (isMounted.current) {
        setState((prevState) => ({
          ...prevState,
          debugInfo: 'Error: ' + err.message,
        }));
      }
      return null;
    }
  }, []);

  const handleDelete = (index) => {
    setState((prevState) => ({
      ...prevState,
      scannedCodes: prevState.scannedCodes.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    console.log('Component mounted, setting up listeners');
    let scanListener = null;

    const setupListener = async () => {
      scanListener = await initializeDataWedge();
    };

    setupListener();

    return () => {
      isMounted.current = false;
      if (scanListener) {
        scanListener.remove();
      }
    };
  }, [initializeDataWedge]);

  return {
    ...state,
    handleDelete,
  };
};

export default useDataWedge;
