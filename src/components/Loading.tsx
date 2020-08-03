import React, { FC } from 'react'
import styled from 'styled-components'

import { device } from '../styles'

import { Logo } from './common/Logo'

export const Loading: FC = () => (
  <LoadingWrapper>
    <LoadingEl>
      <Logo />
      <LoadingText>Loading</LoadingText>
    </LoadingEl>
  </LoadingWrapper>
)

Loading.displayName = 'Loading'

const LoadingWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const LoadingEl = styled.div`
  margin: auto;
  text-align: center;
`

const LoadingText = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: var(--fs-xl);
  margin: 0;

  ${device.sm`
  letter-spacing: 0.25em;
  `}
`
