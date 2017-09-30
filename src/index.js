import React from 'react'
import ApolloClient, { createNetworkInterface, IntrospectionFragmentMatcher } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'moment/locale/zh-cn'
import './errorHandling'
import { gqluri } from './endpoint'
import Wrapper from './modules/measurement/containers/DeviceLifeCycleWrapper'
import configureStore from './configureStore'

const store = configureStore()

const Client = () => {
  console.log('db uri', gqluri)
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
