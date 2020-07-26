import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { darken, transitions, size, rem, lighten, cssVar } from 'polished'

import { userDetailsState } from '../state'

export const Navigation: FC = () => {
  const [userDetails] = useRecoilState(userDetailsState)

  return (
    <HeaderComponent>
      <HeaderLogo>slack deletron</HeaderLogo>
      {!userDetails.token && <HeaderLink href="/api/auth/login">Login with Slack</HeaderLink>}
    </HeaderComponent>
  )
}

Navigation.displayName = 'Navigation'

const HeaderComponent = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  height: var(--hs);
`

const HeaderLogo = styled.h1`
  font-weight: 700;
  font-size: ${rem(27, 10)};
  color: var(--color-darker);
  position: relative;
  margin: 0;
  letter-spacing: -0.03em;
`

const HeaderLink = styled.a`
  display: inline-block;
  text-decoration: none;
  font-size: 1.7rem;
  background-color: var(--color-purple);
  color: var(--color-white);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  ${transitions(['box-shadow', 'background-color'], '0.1s ease-in')};

  &:hover {
    background-color: ${(props) => darken(0.2, props.theme.light.colors.purple)};
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }
`
