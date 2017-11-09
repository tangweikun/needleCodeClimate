import React from 'react'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'

import { getMainDefinition } from 'apollo-utilities'
import { ApolloProvider } from 'react-apollo'
import * as wechat from 'react-native-wechat'
import 'moment/locale/zh-cn'

import './errorHandling'
import { gqluri, wsuri } from './endpoint'
import Wrapper from './modules/measurement/containers/DeviceLifeCycleWrapper'
import configureStore from './configureStore'
import { WX_APP_ID } from './constants'

const store = configureStore()

const Client = () => {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: gqluri,
  })
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: wsuri,
    options: {
      reconnect: true,
    },
  })
  // console.log('db uri', gqluri)
  // const subscriptionClient = new SubscriptionClient('wss://pigeon.gtzh-play.51ijk.com/feedback', {
  //   reconnect: true,
  // })

  wechat.registerApp(WX_APP_ID)
  // const networkInterface = createNetworkInterface({
  //   uri: gqluri,
  // })

  // const networkInterfaceWithPubSub = addGraphQLSubscriptions(networkInterface, subscriptionClient)

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

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  )
  const cache = new InMemoryCache({
    fragmentMatcher,
  })
  const client = new ApolloClient({
    link,
    cache,
    fragmentMatcher,
  })

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </ApolloProvider>
  )
}

export default Client
