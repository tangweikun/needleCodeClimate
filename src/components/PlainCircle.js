import styled from 'styled-components/native'

export const PlainCircle = styled.View`
  width: 180;
  height: 180;
  border-radius: 90;
  justify-content: center;
  align-items: center;
  border-width: ${p => p.borderWidth || 0};
  border-color: #fff;
  background-color: ${p => p.backgroundColor || '#fff'};
`
