import DeviceInfo from 'react-native-device-info'

const devUri = 'http://localhost:3080/'
const stgUri = 'https://pigeon.gtzh-play.51ijk.com/'
const prodUri = 'https://pigeon.ihealthlabs.com.cn/'

// NOTE: should default to prod not staging here, but need to check async storage first
const getDefaultEnv = {
  uri: DeviceInfo.isEmulator() ? devUri : stgUri,
  env: DeviceInfo.isEmulator() ? 'LOCAL' : 'STAGING',
}
export const uri = getDefaultEnv.uri
const key = '8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo'
export const gqluri = uri + key

export const initialEnv = getDefaultEnv.env
