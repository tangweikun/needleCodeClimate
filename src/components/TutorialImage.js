import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native'
import {
  ACTION_BG1_SENDCODE_RESULT,
  ACTION_BG1_MEASURE_STRIP_IN,
} from '../modules/measurement/utils/SDK'

const images = {
  INSERT_DEVICE: require('../assets/images/insert_device.jpg'),
  INSERT_TEST_STRIP: require('../assets/images/insert_strip.jpg'),
  DRAW_BLOOD: require('../assets/images/draw_blood.jpg'),
}

export const TutorialImage = ({ latestEvent }) => {
  if (latestEvent === ACTION_BG1_SENDCODE_RESULT) {
    return (
      <ImageView>
        <InsertStrip />
      </ImageView>
    )
  }
  if (latestEvent === ACTION_BG1_MEASURE_STRIP_IN) {
    return (
      <ImageView>
        <DrawBlood />
      </ImageView>
    )
  }
  return (
    <ImageView>
      <InsertDevice />
    </ImageView>
  )
}

const InsertDevice = () => (
  <Image
    source={images.INSERT_DEVICE}
    style={{ flex: 1, width: null, height: null }}
    resizeMode="contain"
  />
)
const InsertStrip = () => (
  <Image
    source={images.INSERT_TEST_STRIP}
    style={{ flex: 1, width: null, height: null }}
    resizeMode="contain"
  />
)
const DrawBlood = () => (
  <Image
    source={images.DRAW_BLOOD}
    style={{ flex: 1, width: null, height: null }}
    resizeMode="contain"
  />
)

const ImageView = styled.View`
  flex: 1;
  flex-direction: row;
`
