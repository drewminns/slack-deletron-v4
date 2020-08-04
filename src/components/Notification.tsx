import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'

import { applicationErrorState } from '../state'

export const Notification: React.FC = () => {
  const [applicationError] = useRecoilState(applicationErrorState)
  return (
    <NotificationContainer>
      <NotificationsText>{applicationError.value}</NotificationsText>
    </NotificationContainer>
  )
}

const NotificationContainer = styled.dialog``

const NotificationsText = styled.p``

Notification.displayName = 'Notification'
