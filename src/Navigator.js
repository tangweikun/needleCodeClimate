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
  DietHomePageScreen,
  SelectDigestiveStateScreen,
  SelectFoodScreen,
  ReviewMealSelectionScreen,
  DietRecordScreen,
  NewPatientScreen,
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
    DietTab: { screen: DietHomePageScreen },
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

const NeedleStackNavigation = StackNavigator({
  Initial: {
    screen: FirstScreen,
    navigationOptions: navigationOptionsWithoutHeader,
  },
  LoginOrSignUp: {
    screen: LoginScreen,
    navigationOptions: navigationOptionsWithoutHeader,
  },
  VerifyMobile: {
    screen: VerifyMobileScreen,
    navigationOptions: { ...navigationWithHeaderStyle, headerBackTitle: null },
  },
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
  SelectDigestiveState: {
    screen: SelectDigestiveStateScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  SelectFood: {
    screen: SelectFoodScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  ReviewMealSelection: {
    screen: ReviewMealSelectionScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  DietRecord: {
    screen: DietRecordScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
  NewPatient: {
    screen: NewPatientScreen,
    navigationOptions: navigationWithHeaderStyle,
  },
})

// Prevents double taps navigating twice (just work on ios)
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
