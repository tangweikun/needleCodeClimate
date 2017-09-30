import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Entypo'
import {
  LIGHT_THEME_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
  GIANT_FONT,
  SMALL_FONT,
  DARK_THEME_TEXT_COLOR,
  DigestiveStateLabel,
  LIGHT_WHITE,
  PRIMARY_COLOR,
} from '../../../constants'
import { KeyBoard, NickButton, PlainCircle, DigestiveStateButtons } from '../../../components'

export const SelectDigestiveState = ({ onPress, selectedDate, handleChangeDate }) => (
  <RootView>
    <View style={{ height: 40, justifyContent: 'center', backgroundColor: PRIMARY_COLOR }}>
      <CustomText fontSize={SMALL_FONT}>请选择测量的时间段</CustomText>
    </View>
    <TopView key="top">
      <DigestiveStateButtons onPress={g => onPress(g)} />
    </TopView>
    <BottomView key="bottom">
      <View style={{ alignItems: 'center', justifyContent: 'center', height: 40 }}>
        <CustomText fontSize={SMALL_FONT}>{moment(selectedDate).format('MM月DD日')}</CustomText>
      </View>
      <DatePicker
        style={{ width: 100 }}
        mode="datetime"
        placeholder="修改日期"
        minDate="1900-01-01"
        maxDate={selectedDate}
        confirmBtnText="确认"
        cancelBtnText="取消"
        showIcon={false}
        androidMode="spinner"
        customStyles={{
          dateInput: { borderColor: 'transparent' },
          placeholderText: {
            color: '#fff',
            fontSize: 16,
          },
        }}
        onDateChange={date => {
          handleChangeDate(date)
        }}
      />
      <Icon style={{ marginLeft: -19 }} name="chevron-small-right" size={40} color="#fff" />
    </BottomView>
  </RootView>
)

export const DateAndDigestiveState = ({ digestiveState, selectedDate }) => (
  <View>
    <CustomText fontSize={SMALL_FONT} color={LIGHT_WHITE}>
      {`${moment(selectedDate).format('MM月DD日 HH:mm')} ${DigestiveStateLabel[digestiveState]}`}
    </CustomText>
  </View>
)

export const SelectBloodGlucoseMeasurement = ({
  inputValue,
  digestiveState,
  handleChange,
  uploadResult,
  selectedDate,
}) => (
  <RootView>
    <TopView>
      <Flex>
        <DateAndDigestiveState digestiveState={digestiveState} selectedDate={selectedDate} />
      </Flex>
      <FlexFour>
        <ManualInputCircle value={inputValue} />
      </FlexFour>
      <Flex>
        <NickButton title="保存" small onPress={() => uploadResult()} />
      </Flex>
    </TopView>
    <BottomView backgroundColor={LIGHT_THEME_BACKGROUND_COLOR}>
      <KeyBoard handleChange={handleChange} />
    </BottomView>
  </RootView>
)

const ManualInputCircle = ({ value }) => (
  <Centered>
    <PlainCircle backgroundColor={DARK_THEME_BACKGROUND_COLOR} borderWidth={2}>
      <ResultText>{value === '' ? '0.0' : value}</ResultText>
      <Unit>mmol/L</Unit>
    </PlainCircle>
  </Centered>
)

const Flex = styled.View`
  flex: 1;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
`
const FlexFour = styled.View`
  flex: 4;
  justify-content: center;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
`
const RootView = styled.View`flex: 1;`
const TopView = styled.View`
  flex: 4;
  justify-content: center;
  background-color: ${p => p.backgroundColor || LIGHT_THEME_BACKGROUND_COLOR};
`
const Centered = styled.View`align-items: center;`
const CustomText = styled.Text`
  color: ${p => p.color || DARK_THEME_TEXT_COLOR};
  font-size: ${p => p.fontSize || GIANT_FONT};
  text-align: center;
`
const Unit = styled.Text`
  color: ${DARK_THEME_TEXT_COLOR};
  font-size: ${SMALL_FONT};
`
const ResultText = styled.Text`
  color: ${DARK_THEME_TEXT_COLOR};
  font-size: ${GIANT_FONT};
  font-weight: bold;
`
const BottomView = styled.View`
  flex: 3;
  justify-content: center;
  flex-direction: row;
  background-color: ${p => p.backgroundColor || DARK_THEME_BACKGROUND_COLOR};
`
