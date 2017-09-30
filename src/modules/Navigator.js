import { StackNavigator, NavigationActions, TabBarBottom, TabNavigator } from 'react-navigation'
import { Platform } from 'react-native'
import {
  HistoryScreen,
  LoginScreen,
  MeasureScreen,
  ManualRecordScreen,
  PreferencesScreen,
  HomeScreen,
  AskScreen,
  AboutUsScreen,
  IntroductionScreen,
  AgreementScreen,
  ChatScreen,
} from '../screens'
import { PRIMARY_COLOR } from '../constants'

const headerStyle = {
  backgroundColor: PRIMARY_COLOR,
  justifyContent: 'center',
  borderBottomWidth: 0,
  elevation: 0,
}

const navigationOptions = {
  headerTintColor: 'white',
  headerBackTitle: null,
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
}
const navigationOptionsWithoutHeader = {
  headerTintColor: 'white',
  headerBackTitle: null,
  header: null,
}

const navigationWithHeaderStyle =
  Platform.OS === 'android'
    ? {
      ...navigationOptions,
      headerStyle,
      headerLeft: null,
    }
    : {
      ...navigationOptions,
      headerStyle,
    }

const navigationOptionsWithOutHeaderStyle =
  Platform.OS === 'android' ? { ...navigationOptions, headerLeft: null } : navigationOptions

const MainTabs = TabNavigator(
  {
    HomeTab: { screen: HomeScreen },
    AskTab: { screen: AskScreen },
    PreferencesTab: { screen: PreferencesScreen },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    // Disable animation so that iOS/Android have same behaviors
    animationEnabled: false,
    // Don't show the labels
    tabBarOptions: {
      activeTintColor: PRIMARY_COLOR,
      showLabel: true,
      labelStyle: {
        fontSize: 13,
      },
    },
  },
)
const NeedleStackNavigation = StackNavigator(
  {
    First: {
      screen: MainTabs,
      navigationOptions: { ...navigationOptions, headerStyle },
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: navigationWithHeaderStyle,
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: navigationWithHeaderStyle,
    },
    Measure: {
      screen: MeasureScreen,
      navigationOptions: navigationOptionsWithOutHeaderStyle,
    },
    ManualRecord: {
      screen: ManualRecordScreen,
      navigationOptions: navigationOptionsWithOutHeaderStyle,
    },
    AboutUs: {
      screen: AboutUsScreen,
      navigationOptions: navigationWithHeaderStyle,
    },
    Introduction: {
      screen: IntroductionScreen,
      navigationOptions: navigationOptionsWithoutHeader,
    },
    Agreement: {
      screen: AgreementScreen,
      navigationOptions: navigationWithHeaderStyle,
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: navigationWithHeaderStyle,
    },
  },
  {
    // headerMode: 'none'
  },
)

// Prevents double taps navigating twice
const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action
  return state &&
  type === NavigationActions.NAVIGATE &&
  routeName === state.routes[state.routes.length - 1].routeName
    ? state
    : getStateForAction(action, state)
}
NeedleStackNavigation.router.getStateForAction = navigateOnce(
  NeedleStackNavigation.router.getStateForAction,
)

export default NeedleStackNavigation
