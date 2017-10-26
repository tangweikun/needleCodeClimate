import { StackNavigator, NavigationActions, TabBarBottom, TabNavigator } from 'react-navigation'
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
  VerifyMobileScreen,
  FirstScreen,
  AboutMeScreen,
  LaboratoryExaminationScreen,
  BodyFileScreen,
  DietTokenScreen,
  OutpatientServiceScreen,
  FeedbackScreen,
  UserGuidanceScreen,
  AccountBindingScreen,
} from './screens'
import { PRIMARY_COLOR, MINI_FONT, TABBAR_BACKGROUND_COLOR, REGULAR_FONT } from './constants'

const navigationOptions = {
  headerTintColor: 'white',
  headerBackTitle: null,
}

const navigationOptionsWithoutHeader = {
  headerTintColor: 'white',
  headerBackTitle: null,
  header: null,
  headerTitleStyle: {
    fontSize: REGULAR_FONT,
  },
}

const navigationWithHeaderStyle = {
  ...navigationOptions,
  headerStyle: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    fontSize: REGULAR_FONT,
  },
}

const MainTabs = TabNavigator(
  {
    HomeTab: { screen: HomeScreen },
    AskTab: { screen: AskScreen },
    PreferencesTab: { screen: PreferencesScreen },
  },
  {
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    // Disable animation so that iOS/Android have same behaviors
    animationEnabled: false,
    // Don't show the labels
    tabBarOptions: {
      activeTintColor: PRIMARY_COLOR,
      showLabel: true,
      labelStyle: {
        fontSize: MINI_FONT,
      },
      style: {
        height: 50,
        backgroundColor: TABBAR_BACKGROUND_COLOR,
      },
    },
  },
)

const LoginNavigation = StackNavigator({
  LoginOrSignUp: {
    screen: LoginScreen,
    navigationOptions: navigationOptionsWithoutHeader,
  },
  VerifyMobile: {
    screen: VerifyMobileScreen,
    navigationOptions: { ...navigationWithHeaderStyle, headerBackTitle: null },
  },
})

const NeedleStackNavigation = StackNavigator({
  First: {
    screen: MainTabs,
    navigationOptions: {
      ...navigationWithHeaderStyle,
      headerTitleStyle: { alignSelf: 'center', fontSize: REGULAR_FONT },
    },
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  Measure: {
    screen: MeasureScreen,
    navigationOptions,
  },
  ManualRecord: {
    screen: ManualRecordScreen,
    navigationOptions,
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
  AboutMe: {
    screen: AboutMeScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  LaboratoryExamination: {
    screen: LaboratoryExaminationScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  BodyFile: {
    screen: BodyFileScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  DietToken: {
    screen: DietTokenScreen,
    navigationOptions,
  },
  OutpatientService: {
    screen: OutpatientServiceScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  Feedback: {
    screen: FeedbackScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  UserGuidance: {
    screen: UserGuidanceScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  AccountBinding: {
    screen: AccountBindingScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
})

const InitialNavigation = StackNavigator(
  {
    Initial: { screen: FirstScreen },
  },
  {
    headerMode: 'none',
  },
)

const AppNavigation = TabNavigator(
  {
    InitialScreen: { screen: InitialNavigation },
    LoginNavigation: { screen: LoginNavigation },
    MainStackNavigator: { screen: NeedleStackNavigation },
  },
  {
    animationEnabled: false,
    swipeEnabled: false,
    navigationOptions: {
      tabBarVisible: false,
    },
    // backBehavior: 'none',
  },
)

// Prevents double taps navigating twice (just work on ios)
const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? state
    : getStateForAction(action, state)
}
AppNavigation.router.getStateForAction = navigateOnce(AppNavigation.router.getStateForAction)

export default AppNavigation
