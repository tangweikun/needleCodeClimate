import { connect } from 'react-redux'

import { setDigestiveState } from '../../../ducks/actions'
import { DigestiveStateButtons as _DigestiveStateButtons } from '../../../components'

function mapDispatchToProps(dispatch) {
  return {
    onPress: g => dispatch(setDigestiveState(g)),
  }
}

export const DigestiveStateButtons = connect(null, mapDispatchToProps)(_DigestiveStateButtons)
