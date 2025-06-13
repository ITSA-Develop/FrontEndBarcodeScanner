@echo off
echo ================================
echo Generando bundle para Android...
echo ================================

:: Crear carpeta assets si no existe
IF NOT EXIST android\app\src\main\assets (
    mkdir android\app\src\main\assets
)

:: Bundle de React Native
npx react-native bundle ^
  --platform android ^
  --dev false ^
  --entry-file index.js ^
  --bundle-output android/app/src/main/assets/index.android.bundle ^
  --assets-dest android/app/src/main/res

IF %ERRORLEVEL% NEQ 0 (
    echo Error al generar el bundle. Abortando.
    pause
    exit /b %ERRORLEVEL%
)

echo ================================
echo Compilando APK release...
echo ================================

cd android
gradlew assembleRelease

IF %ERRORLEVEL% NEQ 0 (
    echo Error al compilar APK release. Abortando.
    pause
    exit /b %ERRORLEVEL%
)

echo ================================
echo Instalando en dispositivo...
echo ================================

gradlew installRelease

IF %ERRORLEVEL% NEQ 0 (
    echo Error al instalar la app. Abortando.
    pause
    exit /b %ERRORLEVEL%
)

echo ================================
echo App instalada exitosamente 🎉
echo ================================

pause
