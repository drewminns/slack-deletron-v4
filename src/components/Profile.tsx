import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { rem, size } from 'polished'

import { userDetailsState } from '../state/index'
import { LOCALSTORAGE_TOKEN_NAME } from '../hooks/useLogin'

export const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState)

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setUserDetails({})
    localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
  }

  return (
    <ProfileWrapper>
      <ProfileImage src={userDetails.profile.image} alt={userDetails.profile.real_name} />
      <ProfileDetails>
        <ProfileName>{userDetails.profile.real_name}</ProfileName>
        <ProfileButton onClick={handleLogout} href="#">
          Logout
        </ProfileButton>
      </ProfileDetails>
    </ProfileWrapper>
  )
}

Profile.displayName = 'Profile'

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const ProfileName = styled.p`
  font-weight: 700;
  color: var(--color-darker);
  margin: 0 ${rem(20, 10)} 0;
`
const ProfileImage = styled.img`
  ${size(50)};
  margin-right: ${rem(20, 10)};
  border-radius: var(--br);
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileButton = styled.a`
  color: var(--color-purple);
  font-size: 1.2rem;
  text-decoration: underline;
  border: 0;
  transition: color 0.1s ease-in;

  &:hover {
    text-decoration: none;
    color: var(--color-purple-light);
  }
`
