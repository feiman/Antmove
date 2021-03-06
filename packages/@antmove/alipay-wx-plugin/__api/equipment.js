/**
 * type:0 missing
 * type:1 diff
 * type:3 - diffType - 类型不同
 * 
 */
const utils = require('./utils')
const descObj = require('./desc.js')

const apiObj = {
  getSystemInfo: {
    fn(obj = {}) {
      const getSystemInfoReturnValue = descObj.getSystemInfo.body.returnValue.props
      wx.getSystemInfo({
        ...obj,
        success: (res) => {
          res.app = 'wechat'
          res = utils.defineGetter(
            res,
            getSystemInfoReturnValue,
            (obj, prop) => {
              utils.warn(
                `getSystemInfo的返回值不支持 ${prop} 属性!`,
                {
                  apiName: prop,
                  errorType: getSystemInfoReturnValue[prop].type,
                  type: 'api',
                },
              )
            },
          )
          obj.success && obj.success(res)
        },
      })
    },
  },
  getSystemInfoSync: {
    fn() {
      const ret = wx.getSystemInfoSync()
      const getSystemInfoSyncReturnValue = descObj.getSystemInfoSync.body.returnValue.props
      utils.defineGetter(
        ret,
        getSystemInfoSyncReturnValue,
        (obj, prop) => {
          utils.warn(
            `getSystemInfoSync的返回值不支持 ${prop} 属性!`,
            {
              apiName: prop,
              errorType: getSystemInfoSyncReturnValue[prop].type,
              type: 'api',
            },
          )
        },
      )
      ret.app = 'wechat'
      return ret
    },
  },
  getNetworkType: {
    fn(obj = {}) {
      const getNetworkTypeReturnValue = descObj.getNetworkType.body.returnValue.props
      wx.getNetworkType({
        ...obj,
        success(res) {
          if (res.networkType === 'none') {
            res.networkType = 'NOTREACHABLE'
          } else if (res.networkType === 'wifi') {
            res.networkType = 'Wi-Fi'
          } else {
            res.networkType = res.networkType.toUpperCase()
          }
          res = utils.defineGetter(
            res,
            getNetworkTypeReturnValue,
            (obj, prop) => {
              utils.warn(
                `getNetworkType的返回值不支持 ${prop} 属性!`,
                {
                  apiName: prop,
                  errorType: getNetworkTypeReturnValue[prop].type,
                  type: 'api',
                },
              )
            },
          )
          res.networkAvailable = true
          obj.success && obj.success(res)
        },
      })
    },
  },
  onNetworkStatusChange: {
    fn(obj = {}) {
      wx.onNetworkStatusChange({
        ...obj,
        success(res) {
          if (res.networkType === 'none') {
            res.networkType = 'NOTREACHABLE'
          } else if (res.networkType === 'wifi') {
            res.networkType = 'Wi-Fi'
          } else {
            res.networkType = res.networkType.toUpperCase()
          }
          obj.success && obj.success(res)
        },
      })
    },
  },
  getClipboard: {
    fn(obj = {}) {
      wx.getClipboardData({
        ...obj,
        success: (res) => {
          res.text = res.data
          delete res.data
          obj.success && obj.success(res)
        },
      })
    },
  },
  setClipboard: {
    fn(obj = {}) {
      obj.data = obj.text
      delete obj.text
      wx.setClipboardData(obj)
    },
  },
  offAccelerometerChange: {
    fn() {
      wx.stopAccelerometer()
    },
  },
  offGyroscopeChange: {
    fn() {
      wx.stopGyroscope()
    },
  },
  offCompassChange: {
    fn() {
      wx.stopCompass()
    },
  },
  makePhoneCall: {
    fn(obj = {}) {
      if (obj.number) {
        obj.phoneNumber = obj.number
        delete obj.number
      }
      return wx.makePhoneCall(obj)
    },
  },
  setScreenBrightness: {
    fn(obj = {}) {
      if (obj.brightness) {
        obj.value = obj.brightness
        delete obj.brightness
      }
      wx.setScreenBrightness(obj)
    },
  },
  getScreenBrightness: {
    fn(obj = {}) {
      wx.getScreenBrightness({
        success: (res) => {
          res.brightness = res.value
          delete res.value
          obj.success && obj.success(res)
        },
        fail: (res) => {
          obj.fail && obj.fail(res)
        },
      })
    },
  },
  scan: {
    fn(obj = {}) {
      const scanReturnValue = descObj.scan.body.returnValue.props
      if (obj.type) {
        obj.scanType = obj.type === 'qr' ? ['qrCode'] : ['barCode']
        delete obj.type
      }
      if (obj.hideAlbum) {
        obj.onlyFromCamera = obj.hideAlbum
        delete obj.hideAlbum
      }
      wx.scanCode({
        ...obj,
        success(res) {
          const _res = utils.defineGetter(res, scanReturnValue, (obj, prop) => {
            utils.warn(
              `scan的参数不支持 ${prop} 属性!`,
              {
                apiName: prop,
                errorType: scanReturnValue[prop].type,
                type: 'api',
              },
            )
          })
          _res.code = _res.result
          delete _res.result
          obj.success && obj.success(_res)
        },
      })
    },
  },
  getBLEDeviceCharacteristics: {
    fn(obj = {}) {
      const getBLEDeviceCharacteristicsReturnValue = descObj.getBLEDeviceCharacteristics.body.returnValue.props
      wx.getBLEDeviceCharacteristics({
        ...obj,
        success: (res) => {
          const _res = utils.defineGetter(res, getBLEDeviceCharacteristicsReturnValue, (obj, prop) => {
            utils.warn(
              `getBLEDeviceCharacteristics的参数不支持 ${prop} 属性!`,
              {
                apiName: prop,
                errorType: getBLEDeviceCharacteristicsReturnValue[prop].type,
                type: 'api',
              },
            )
          })
          if (_res.characteristics) {
            _res.characteristics.forEach((item) => {
              item.characteristicId = item.uuid
              delete item.uuid
            })
          }
          obj.success && obj.success(_res)
        },
      })
    },
  },
  getBLEDeviceServices: {
    fn(obj = {}) {
      const getBLEDeviceServicesReturnValue = descObj.getBLEDeviceServices.body.returnValue.props
      if (obj.serviceId) {
        utils.warn(
          'getBLEDeviceServices的参数不支持serviceId属性!',
          {
            apiName: 'getBLEDeviceServices/serviceId',
            errorType: 0,
            type: 'api',
          },
        )
      }
      wx.getBLEDeviceServices({
        ...obj,
        success: (res) => {
          const _res = utils.defineGetter(res, getBLEDeviceServicesReturnValue, (obj, prop) => {
            utils.warn(
              `getBLEDeviceServices的参数不支持 ${prop} 属性!`,
              {
                apiName: prop,
                errorType: getBLEDeviceServicesReturnValue[prop].type,
                type: 'api',
              },
            )
          })
          if (_res.services) {
            _res.services.forEach((item) => {
              item.characteristicId = item.uuid
              delete item.uuid
            })
            _res.characteristics = _res.services
            delete _res.services
          }
          obj.success && obj.success(_res)
        },
      })
    },
  },
  notifyBLECharacteristicValueChange: {
    fn(obj = {}) {
      const notifyBLECharacteristicValueChangeParams = descObj.notifyBLECharacteristicValueChange.body.params.props
      const params = utils.defineGetter(obj, notifyBLECharacteristicValueChangeParams, (obj, prop) => {
        utils.warn(
          `notifyBLECharacteristicValueChange的参数不支持 ${prop} 属性!`,
          {
            apiName: prop,
            errorType: notifyBLECharacteristicValueChangeParams[prop].type,
            type: 'api',
          },
        )
      })
      wx.notifyBLECharacteristicValueChange(params)
    },
  },
  onBLECharacteristicValueChange: {
    fn(obj = {}) {
      const onBLECharacteristicValueChangeParams = descObj.onBLECharacteristicValueChange.body.params.props
      const params = utils.defineGetter(obj, onBLECharacteristicValueChangeParams, (obj, prop) => {
        utils.warn(
          `onBLECharacteristicValueChange的参数不支持 ${prop} 属性!`,
          {
            apiName: prop,
            errorType: onBLECharacteristicValueChangeParams[prop].type,
            type: 'api',
          },
        )
      })
      wx.onBLECharacteristicValueChange(params)
    },
  },
  onBLEConnectionStateChanged: {
    fn(obj = {}) {
      wx.onBLEConnectionStateChange(obj)
    },
  },
  getBluetoothDevices: {
    fn(obj = {}) {
      const getBluetoothDevicesReturnValue = descObj.getBluetoothDevices.body.returnValue.props
      wx.getBluetoothDevices({
        success: (res) => {
          const _res = res.devices.map((item) => {
            return utils.defineGetter(item, getBluetoothDevicesReturnValue, (obj, prop) => {
              utils.warn(
                `getBluetoothDevices的success回调不支持 ${prop} 属性!`,
                {
                  apiName: prop,
                  errorType: getBluetoothDevicesReturnValue[prop].type,
                  type: 'api',
                },
              )
            })
          })
          obj.success && obj.success(_res)
        },
      })
    },
  },
  getConnectedBluetoothDevices: {
    fn(obj = {}) {
      if (obj.deviceId) {
        obj.services = [obj.deviceId]
        delete obj.deviceId
      }
      wx.getConnectedBluetoothDevices(obj)
    },
  },
  onBluetoothDeviceFound: {
    fn(cb) {
      const onBluetoothDeviceFoundReturnValue = descObj.onBluetoothDeviceFound.body.returnValue.props
      wx.onBluetoothDeviceFound((res) => {
        const arr = res.devices.map((item) => {
          return utils.defineGetter(item, onBluetoothDeviceFoundReturnValue, (obj, prop) => {
            utils.warn(
              `onBluetoothDeviceFound的返回值不支持 ${prop} 属性!`,
              {
                apiName: prop,
                errorType: onBluetoothDeviceFoundReturnValue[prop].type,
                type: 'api',
              },
            )
          })
        })
        res.devices = arr
        cb && cb(res)
      })
    },
  },
  openBluetoothAdapter: {
    fn(obj = {}) {
      const openBluetoothAdapterParams = descObj.openBluetoothAdapter.body.params.props
      const params = utils.defineGetter(obj, openBluetoothAdapterParams, (obj, prop) => {
        utils.warn(
          `openBluetoothAdapter的返回值不支持 ${prop} 属性!`,
          {
            apiName: prop,
            errorType: openBluetoothAdapterParams[prop].type,
            type: 'api',
          },
        )
      })
      wx.openBluetoothAdapter(params)
    },
  },
  getBeacons: {
    fn(obj = {}) {
      const getBeaconsReturnValue = descObj.getBeacons.body.returnValue.props
      wx.getBeacons({
        success: (res) => {
          const _res = utils.defineGetter(res, getBeaconsReturnValue, (obj, prop) => {
            utils.warn(
              `getBeacons的success回调不支持 ${prop} 属性!`,
              {
                apiName: prop,
                errorType: getBeaconsReturnValue[prop].type,
                type: 'api',
              },
            )
          })
          obj.success && obj.success(_res)
        },
        fail: (res) => {
          obj.fail && obj.fail(res)
        },
        complete: (res) => {
          obj.complete && obj.complete(res)
        },
      })
      return wx.getBeacons(obj)
    },
  },
  createWebViewContext: {
    fn() {
      utils.warn(
        '微信暂不支持 createWebViewContext',
        {
          apiName: 'createWebViewContext',
          errorType: 0,
          type: 'api',
        },
      )
    },
  },
}

module.exports = apiObj
