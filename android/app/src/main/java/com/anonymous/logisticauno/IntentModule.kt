package com.itsa.logisticauno

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = IntentModule.NAME)
class IntentModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    const val NAME = "Intent"
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun sendBroadcast(action: String, extras: ReadableMap?) {
    val intent = Intent(action)

    extras?.let {
      val bundle = Bundle()
      val iterator = it.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        when (it.getType(key)) {
          ReadableType.String -> bundle.putString(key, it.getString(key))
          ReadableType.Boolean -> bundle.putBoolean(key, it.getBoolean(key))
          ReadableType.Number -> bundle.putDouble(key, it.getDouble(key))
          else -> {} // Ignorar tipos no soportados
        }
      }
      intent.putExtras(bundle)
    }

    reactApplicationContext.sendBroadcast(intent)
  }

  private val scanReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      if (intent?.action == "com.logisticauno.ACTION") {
        val decoded = intent.getStringExtra("com.symbol.datawedge.data_string")
        if (decoded != null) {
          val params = Arguments.createMap()
          params.putString("data", decoded)
          reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("barcode_scan", params)
        }
      }
    }
  }

  override fun initialize() {
    super.initialize()
    val filter = IntentFilter()
    filter.addAction("com.logisticauno.ACTION")
    reactApplicationContext.registerReceiver(scanReceiver, filter)
  }

  override fun onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy()
    reactApplicationContext.unregisterReceiver(scanReceiver)
  }
}
