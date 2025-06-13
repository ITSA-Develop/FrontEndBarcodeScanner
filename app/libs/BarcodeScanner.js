import {NativeModules, DeviceEventEmitter} from 'react-native';

const {BarcodeScanner} = NativeModules;

function createBarcodeScanner() {
  var mounted = true;
  var scanListener = null;

  function initializeScanner() {
    console.log('Iniciando configuración del escáner...');

    // Configurar el listener para los eventos de escaneo
    scanListener = DeviceEventEmitter.addListener('BarcodeScanned', (event) => {
      if (!mounted) {
        console.log('Componente desmontado, ignorando datos');
        return;
      }

      const scannedData = event.data;
      console.log('Código escaneado:', scannedData);
    });

    // Iniciar el escáner
    BarcodeScanner.startScanning()
      .then(() => {
        console.log('Escáner iniciado correctamente');
      })
      .catch((error) => {
        console.warn('Error al iniciar el escáner:', error);
      });
  }

  function cleanup() {
    mounted = false;
    if (scanListener) {
      console.log('Limpiando configuración del escáner...');
      scanListener.remove();
      BarcodeScanner.stopScanning();
    }
  }

  initializeScanner();
  return {cleanup: cleanup};
}

module.exports = createBarcodeScanner;
