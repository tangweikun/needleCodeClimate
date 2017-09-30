import DeviceInfo from 'react-native-device-info'

export const getDeviceContext = () => ({
  isEmulator: DeviceInfo.isEmulator(),
  brand: DeviceInfo.getBrand(),
  buildNumber: DeviceInfo.getBuildNumber(),
  bundleId: DeviceInfo.getBundleId(),
  deviceCountry: DeviceInfo.getDeviceCountry(),
  deviceId: DeviceInfo.getDeviceId(),
  deviceLocale: DeviceInfo.getDeviceLocale(),
  manufacturer: DeviceInfo.getManufacturer(),
  model: DeviceInfo.getModel(),
  readableVersion: DeviceInfo.getReadableVersion(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  timezone: DeviceInfo.getTimezone(),
  uniqueID: DeviceInfo.getUniqueID(),
  userAgent: DeviceInfo.getUserAgent(),
  appVersion: DeviceInfo.getVersion(),
  isTablet: DeviceInfo.isTablet(),
})

export const getUsefulDeviceContext = () => ({
  isEmulator: DeviceInfo.isEmulator(),
  bundleId: DeviceInfo.getBundleId(),
  deviceId: DeviceInfo.getDeviceId(),
  deviceLocale: DeviceInfo.getDeviceLocale(),
  model: DeviceInfo.getModel(),
  readableVersion: DeviceInfo.getReadableVersion(),
  systemVersion: DeviceInfo.getSystemVersion(),
  timezone: DeviceInfo.getTimezone(),
  uniqueID: DeviceInfo.getUniqueID(),
  isTablet: DeviceInfo.isTablet(),
})
