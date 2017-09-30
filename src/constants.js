import { Dimensions } from 'react-native'

const white = '#fff'
const black = '#000'
const nickGreen = 'rgb(0, 131, 143)'
const nickOffWhite = 'rgb(244, 244, 242)'
const nickGray = 'rgba(0, 0, 0,.25)'
const lightGray = 'rgb(211, 211, 211)'
const lightGreen = 'rgb(94 ,179, 0)'
const darkRed = 'rgb(215, 31, 75)'
const lightOrange = 'rgb(255, 82, 0)'
const lightWhite = 'rgba(255, 255, 255, .7)'
const nickDarkerGray = 'rgb(83, 83, 83)'

export const isSmallScreen = Dimensions.get('screen').width < 375

export const MINI_FONT = isSmallScreen ? 10 : 12
export const SMALL_FONT = isSmallScreen ? 14 : 16
export const REGULAR_FONT = isSmallScreen ? 22 : 26
export const LARGE_FONT = isSmallScreen ? 34 : 40
export const GIANT_FONT = isSmallScreen ? 50 : 60

export const SMALL_FONT_LINE_HEIGHT = 25
export const REGULAR_FONT_LINE_HEIGHT = 35

export const PRIMARY_COLOR = nickGreen

export const LIGHT_THEME_BACKGROUND_COLOR = white
export const LIGHT_THEME_ALT_BACKGROUND_COLOR = nickOffWhite
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

export const BORDER_COLOR = lightGray
export const LIGHT_GREEN = lightGreen
export const DARK_RED = darkRed
export const LIGHT_ORANGE = lightOrange
export const LIGHT_GRAY = lightGray
export const LIGHT_WHITE = lightWhite

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
export const DayLabel = {
  monday: '周一',
  tuesday: '周二',
  wednesday: '周三',
  thursday: '周四',
  friday: '周五',
  saturday: '周六',
  sunday: '周日',
}

export const defaultAvatar = 'https://api.ihealthlabs.com.cn:8443/images/default/Avatar.png'
