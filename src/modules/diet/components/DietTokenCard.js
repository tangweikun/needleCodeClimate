import React from 'react'
import styled from 'styled-components/native'
import {
  LARGE_FONT,
  RGB102,
  PAGE_MARGIN,
  LIGHT_THEME_BACKGROUND_COLOR,
  SMALL_FONT,
} from '../../../constants'

export function DietTokenCard({ dietTokenData, onPress }) {
  return (
    <TouchView onPress={onPress}>
      <RootView>
        <SmallText>今日午餐代币</SmallText>
        <DetailView>
          {dietTokenData.map(({ color, name, icon, value }) => (
            <HorizontalView key={name}>
              <TopView>
                <LargeText color={color}>{Math.round(value)}</LargeText>
              </TopView>
              <ImageView source={icon} resizeMode="contain" />
              <SmallText>{name}</SmallText>
            </HorizontalView>
          ))}
        </DetailView>
      </RootView>
    </TouchView>
  )
}

const TouchView = styled.TouchableWithoutFeedback``

const DetailView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const TopView = styled.View`
  width: 60;
  height: 60;
  align-items: center;
  justify-content: center;
`

const RootView = styled.View`
  padding-top: 12;
  padding-bottom: 12;
  margin-top: 30;
  height: 200;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  margin-left: ${PAGE_MARGIN};
  margin-right: ${PAGE_MARGIN};
`

const LargeText = styled.Text`
  text-align: center;
  font-size: ${LARGE_FONT};
  font-weight: bold;
  color: ${p => p.color};
`

const SmallText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${RGB102};
  text-align: ${p => p.textAlign || 'center'};
`

const ImageView = styled.Image`
  width: 40;
  height: 50;
  margin-top: 8;
  margin-bottom: 12;
`

const HorizontalView = styled.View`
  align-items: center;
  width: 60;
`
