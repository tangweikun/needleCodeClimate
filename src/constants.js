import { Dimensions } from 'react-native'

const white = '#fff'
const black = '#000'
const nickGreen = 'rgb(74, 144, 226)'
const nickGray = 'rgba(0, 0, 0,.25)'
const lightGray = 'rgb(211, 211, 211)'
const lightGreen = 'rgb(2 ,179, 68)'
const darkRed = 'rgb(254, 74, 36)'
const lightOrange = 'rgb(255, 82, 0)'
const lightWhite = 'rgba(255, 255, 255, .7)'
const nickDarkerGray = 'rgb(83, 83, 83)'
const darkBlack = 'rgb(34, 34, 34)'
const gray85 = 'rgb(85, 85, 85)'
const gray206 = 'rgb(206, 206, 206)'
const gray230 = 'rgb(230, 230, 230)'
const gray136 = 'rgb(136, 136, 136)'
const orange = 'rgb(255, 163, 46)'
const rgb102 = 'rgb(102, 102, 102)'
const rgb68 = 'rgb(68, 68, 68)'
const rgb252 = 'rgb(252, 126, 126)'
const rgb215 = 'rgb(215, 149, 243)'

export const isSmallScreen = Dimensions.get('screen').width < 375

export const MINI_FONT = isSmallScreen ? 10 : 12
export const SMALL_FONT = isSmallScreen ? 14 : 16
export const REGULAR_FONT = isSmallScreen ? 18 : 22
export const LARGE_FONT = isSmallScreen ? 34 : 40
export const GIANT_FONT = isSmallScreen ? 50 : 60

export const SMALL_FONT_LINE_HEIGHT = 25
export const REGULAR_FONT_LINE_HEIGHT = 35

export const PRIMARY_COLOR = nickGreen

export const LIGHT_THEME_BACKGROUND_COLOR = white
export const LIGHT_THEME_ALT_BACKGROUND_COLOR = 'rgb(240, 242, 245)'
export const LIGHT_THEME_BUTTON_COLOR = PRIMARY_COLOR
export const LIGHT_THEME_BUTTON_BORDER_COLOR = PRIMARY_COLOR
export const LIGHT_THEME_TEXT_COLOR = black
export const LIGHT_THEME_ALT_TEXT_COLOR = nickGreen
export const LIGHT_THEME_MUTED_TEXT_COLOR = nickGray
export const LIGHT_THEME_GRAY_TEXT_COLOR = nickDarkerGray
export const LIGHT_THEME_BUTTON_TEXT_COLOR = white

export const DARK_THEME_BACKGROUND_COLOR = PRIMARY_COLOR
export const DARK_THEME_BUTTON_COLOR = white
export const DARK_THEME_BUTTON_BORDER_COLOR = PRIMARY_COLOR
export const DARK_THEME_TEXT_COLOR = white
export const DARK_THEME_BUTTON_TEXT_COLOR = PRIMARY_COLOR
export const TABBAR_BACKGROUND_COLOR = white

export const BORDER_COLOR = lightGray
export const LIGHT_GREEN = lightGreen
export const DARK_RED = darkRed
export const LIGHT_ORANGE = lightOrange
export const LIGHT_GRAY = lightGray
export const LIGHT_WHITE = lightWhite
export const DARK_BLACK = darkBlack
export const GRAY230 = gray230
export const GRAY206 = gray206
export const GRAY85 = gray85
export const GRAY136 = gray136
export const DIET_TOKEN_ORANGE = orange
export const RGB102 = rgb102
export const RGB68 = rgb68
export const RGB252 = rgb252
export const RGB215 = rgb215

export const DigestiveStateLabel = {
  BEFORE_BREAKFAST: '早餐前',
  AFTER_BREAKFAST: '早餐后',
  BEFORE_LUNCH: '午餐前',
  AFTER_LUNCH: '午餐后',
  BEFORE_DINNER: '晚餐前',
  AFTER_DINNER: '晚餐后',
  BEFORE_SLEEP: '睡前',
  MIDNIGHT: '凌晨',
  // BEFORE_BED: '睡前',
}

export const DigestiveStatePairLabel = [
  {
    BEFORE_BREAKFAST: '早餐前',
    AFTER_BREAKFAST: '早餐后',
  },
  {
    BEFORE_LUNCH: '午餐前',
    AFTER_LUNCH: '午餐后',
  },
  {
    BEFORE_DINNER: '晚餐前',
    AFTER_DINNER: '晚餐后',
  },
  {
    BEFORE_SLEEP: '睡前',
    MIDNIGHT: '凌晨',
  },
]
export const DayLabel = {
  monday: '周一',
  tuesday: '周二',
  wednesday: '周三',
  thursday: '周四',
  friday: '周五',
  saturday: '周六',
  sunday: '周日',
}

export const defaultDoctorAvatar = require('./assets/images/icon-doctor.png')

export const defaultUserAvatar = 'https://api.ihealthlabs.com.cn:8443/images/default/Avatar.png'

export const WX_APP_ID = 'wx915efa8b538a4df4'

export const APP_UPGRADE_API = 'https://calm-cicada.ihealthlabs.com.cn/upgrade'

export const ScreenWidth = Dimensions.get('screen').width

export const PAGE_MARGIN = 16
