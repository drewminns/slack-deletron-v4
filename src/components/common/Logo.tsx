import React, { FC } from 'react'
import styled from 'styled-components'
import LogoUrl from '../../assets/logo.svg'
import { rem } from 'polished'

export const Logo: FC = () => (
  <LogoWrapper>
    <LogoImg src={LogoUrl} alt="Slack Deletron Logo" />
    <LogoText>Slack Deletron</LogoText>
  </LogoWrapper>
)

Logo.displayName = 'Logo'

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`
const LogoText = styled.h1`
  font-size: ${rem(24, 10)};
  margin: 0;
`
const LogoImg = styled.img`
  margin-right: 14px;
`
