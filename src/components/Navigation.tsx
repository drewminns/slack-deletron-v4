import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { size, rem } from 'polished'

import { device } from '../styles'
import { userDetailsState } from '../state'
import { LOCALSTORAGE_TOKEN_NAME } from '../hooks/useLogin'

import { Logo } from './common/Logo'
import { Button } from './common/Button'

export const Navigation: FC = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState)

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setUserDetails({})
    localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
  }

  return (
    <HeaderComponent>
      <Logo />
      <ProfileWrapper>
        <ProfileDetails>
          <ProfileName>{userDetails.profile.real_name}</ProfileName>
          <ProfileImage src={userDetails.profile.image} alt={userDetails.profile.real_name} />
        </ProfileDetails>
        <Button onClick={handleLogout}>Logout</Button>
      </ProfileWrapper>
    </HeaderComponent>
  )
}

Navigation.displayName = 'Navigation'

const HeaderComponent = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 12px 10px;
  width: 100%;

  ${device.sm`
    flex-direction: row;
    padding: 12px 25px;
  `}
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const ProfileName = styled.p`
  color: var(--color-darker);
  margin: 0 ${rem(20, 10)} 0;
`
const ProfileImage = styled.img`
  ${size(35)};
  margin-right: ${rem(28, 10)};
  border-radius: 5px;

  ${device.md`
    ${size(50)};
  `}
`

const ProfileDetails = styled.div`
  display: flex;
  align-items: center;
`
