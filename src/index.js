import React from 'react'
import ApolloClient, { createNetworkInterface, IntrospectionFragmentMatcher } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import * as wechat from 'react-native-wechat'
import 'moment/locale/zh-cn'

import './errorHandling'
import { gqluri } from './endpoint'
import Wrapper from './modules/measurement/containers/DeviceLifeCycleWrapper'
import configureStore from './configureStore'
import { WX_APP_ID } from './constants'

const store = configureStore()

const Client = () => {
  console.log('db uri', gqluri)
  wechat.registerApp(WX_APP_ID)
  const networkInterface = createNetworkInterface({
    uri: gqluri,
  })

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: 'INTERFACE',
            name: 'NeedleChatMessage',
            possibleTypes: [
              { name: 'NeedleAudioMessage' },
              { name: 'NeedleTextMessage' },
              { name: 'NeedleImageMessage' },
            ],
          },
        ],
      },
    },
  })

  const client = new ApolloClient({
    networkInterface,
    fragmentMatcher,
  })

  return (
    <ApolloProvider client={client} store={store}>
      <Wrapper />
    </ApolloProvider>
  )
}

export default Client
