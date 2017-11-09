import DeviceInfo from 'react-native-device-info'

const devUri = 'http://localhost:3080/'
const stgUri = 'https://pigeon.gtzh-play.51ijk.com/'
const prodUri = 'https://pigeon.ihealthlabs.com.cn/'

const devWsuri = 'ws://localhost:3080/feedback'
const stgWsuri = 'wss://pigeon.gtzh-play.51ijk.com/feedback'
const prodWsuri = 'wss://pigeon.ihealthlabs.com.cn/feedback'

// NOTE: should default to prod not staging here, but need to check async storage first
const getDefaultEnv = {
  uri: DeviceInfo.isEmulator() ? stgUri : stgUri,
  env: DeviceInfo.isEmulator() ? 'LOCAL' : 'STAGING',
  wsuri: DeviceInfo.isEmulator() ? stgWsuri : stgWsuri,
}
// NOTE: production
// const getDefaultEnv = {
//   uri: prodUri,
//   wsuri: prodWsuri,
//   env: 'PRODUCTION',
// }
export const uri = getDefaultEnv.uri
export const wsuri = getDefaultEnv.wsuri
const key = '8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo'
export const gqluri = uri + key

export const initialEnv = getDefaultEnv.env
