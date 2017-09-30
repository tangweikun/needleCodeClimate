import { gql } from 'react-apollo'

export const saveBloodGlucoseMeasurement = gql`
  mutation saveBloodGlucoseMeasurement(
    $patientId: ID!
    $bloodGlucose: BloodGlucoseInput!
    $digestiveState: DigestiveState!
    $measuredAt: Date!
    $deviceContext: DeviceContextInput!
  ) {
    saveBloodGlucoseMeasurement(
      patientId: $patientId
      bloodGlucose: $bloodGlucose
      digestiveState: $digestiveState
      measurementDeviceModel: BG1
      measuredAt: $measuredAt
      deviceContext: $deviceContext
    )
  }
`

export const bloodGlucoseQuery = gql`
  query bloodGlucoseQuery($patientId: ID!) {
    bloodGlucoseMeasurements(patientId: $patientId) {
      bloodGlucose {
        unit
        value
      }
      measuredAt
      digestiveState
    }
  }
`

export const todaysBloodGlucoseQuery = gql`
  query todaysBloodGlucoseQuery($patientId: ID!, $from: Date, $to: Date) {
    bloodGlucoseMeasurements(patientId: $patientId, from: $from, to: $to) {
      bloodGlucose {
        unit
        value
      }
      measuredAt
      digestiveState
    }
  }
`

export const patientQuery = gql`
  query patient($telephone: String) {
    patient(telephone: $telephone) {
      _id
      nickname
      avatar
    }
  }
`

export const treatmentPlanQuery = gql`
  query treatmentPlan($patientId: ID!) {
    treatmentPlan(patientId: $patientId) {
      testTimes {
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      startAt
      endAt
    }
  }
`

export const messagesQuery = gql`
  query fetchOrCreateNeedleChatRoom($userId: ID!) {
    fetchOrCreateNeedleChatRoom(userId: $userId) {
      _id
      participants {
        nickname
      }
      messages {
        _id
        createdAt
        sender {
          _id
          nickname
          avatar
        }
        ... on NeedleTextMessage {
          text
        }
        ... on NeedleAudioMessage {
          audioUrl
        }
        ... on NeedleImageMessage {
          imageUrl
        }
      }
    }
  }
`

export const sendNeedleTextChatMessage = gql`
  mutation sendNeedleTextChatMessage($userId: String!, $chatRoomId: ID!, $text: String!) {
    sendNeedleTextChatMessage(userId: $userId, chatRoomId: $chatRoomId, text: $text) {
      text
    }
  }
`

export const updateLastSeenAt = gql`
  mutation updateLastSeenAt($userId: String!, $chatRoomId: ID!) {
    updateLastSeenAt(userId: $userId, chatRoomId: $chatRoomId)
  }
`

export const unreadMessagesQuery = gql`
  query unreadMessagesQuery($userId: String!) {
    unreadMessages(userId: $userId)
  }
`

export const bloodGlucosesAndTreatmentPlansQuery = gql`
  query bloodGlucosesAndTreatmentPlansQuery($patientId: ID!) {
    bloodGlucoseMeasurementsAndTreatmentPlans(patientId: $patientId) {
      treatmentPlans {
        testTimes {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
        startAt
        endAt
      }
      bloodGlucoseMeasurements {
        bloodGlucose {
          unit
          value
        }
        measuredAt
        digestiveState
      }
    }
  }
`
